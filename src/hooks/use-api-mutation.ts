import { useMutation } from "@tanstack/react-query";
import { getAuthentication } from "@/util/auth.ts";
import { handleApiResponse } from "@/util/api-response.ts";

// @ts-ignore TS6133
interface ApiMutationOptions<TData, TVariables> {
    endpoint: string;
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
}

export function useApiMutation<TData = any, TVariables = any>(
    options: ApiMutationOptions<TData, TVariables>
) {
    const {
        endpoint,
        method = 'POST',
        onSuccess,
        onError,
    } = options;

    return useMutation({
        mutationFn: async (data: TVariables) => {
            const auth = getAuthentication();
            const token = auth?.token;
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(endpoint, {
                method,
                headers,
                body: JSON.stringify(data),
            });

            return handleApiResponse<TData>(response);
        },
        onSuccess,
        onError,
    });
}
