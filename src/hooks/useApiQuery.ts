import { useQuery } from "@tanstack/react-query";

interface ApiQueryOptions {
    queryKey: unknown[];
    endpoint: string;
    enabled?: boolean;
    token?: string;
}
// TODO: Check use
export function useApiQuery<TData = any>(options: ApiQueryOptions) {
    const { queryKey, endpoint, enabled = true, token } = options;

    return useQuery({
        queryKey,
        queryFn: async () => {
            const headers: Record<string, string> = {};

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(endpoint, { headers });

            const contentType = response.headers.get('content-type');
            const isJson = contentType?.includes('application/json');

            if (!response.ok) {
                let errorMessage = 'Request failed';

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
                    throw new Error('Failed to parse JSON response');
                }
            }

            return {} as TData;
        },
        enabled,
    });
}
