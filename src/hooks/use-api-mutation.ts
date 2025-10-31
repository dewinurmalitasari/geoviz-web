import {useMutation} from "@tanstack/react-query";

// @ts-ignore TS6133
interface ApiMutationOptions<TData, TVariables> {
    endpoint: string;
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    token?: string;
}

export function useApiMutation<TData = any, TVariables = any>(
    options: ApiMutationOptions<TData, TVariables>
) {
    const {
        endpoint,
        method = 'POST',
        onSuccess,
        onError,
        token,
    } = options;

    return useMutation({
        mutationFn: async (data: TVariables) => {
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

            const contentType = response.headers.get('content-type');
            const isJson = contentType?.includes('application/json');

            if (!response.ok) {
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
        onSuccess,
        onError,
    });
}
