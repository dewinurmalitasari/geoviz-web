import { useQuery } from "@tanstack/react-query";
import { getAuthentication } from "@/util/auth.ts";
import { handleApiResponse } from "@/util/api-response.ts";

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
            return handleApiResponse<TData>(response);
        },
        enabled,
    });
}
