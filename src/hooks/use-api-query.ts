import { useQuery } from "@tanstack/react-query";
import {clearAuthentication, getAuthentication} from "@/util/auth.ts";

interface ApiQueryOptions {
    queryKey: unknown[];
    endpoint: string;
    enabled?: boolean;
}

export function useApiQuery<TData = any>(options: ApiQueryOptions) {
    const { queryKey, endpoint, enabled = true } = options;

    return useQuery({
        queryKey,
        queryFn: async () => {
            const auth = getAuthentication();
            const token = auth?.token;
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(endpoint, { headers });

            const contentType = response.headers.get('content-type');
            const isJson = contentType?.includes('application/json');

            if (!response.ok) {
                // Handle 401 Unauthorized TODO: Test this
                if (response.status === 401) {
                    clearAuthentication();
                    window.location.href = '/login';
                    throw new Error('Sesi habis');
                }

                let errorMessage = 'Request gagal';

                if (isJson) {
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                        // Ignore JSON parse errors for error responses
                    }
                }

                throw new Error(errorMessage);
            }

            if (isJson) {
                try {
                    return await response.json() as TData;
                } catch (error) {
                    throw new Error('Gagal mengurai respons JSON');
                }
            }

            return {} as TData;
        },
        enabled,
    });
}
