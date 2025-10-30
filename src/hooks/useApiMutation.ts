import {useMutation} from "@tanstack/react-query";

// @ts-ignore TS6133
interface ApiMutationOptions<TData, TVariables> {
    endpoint: string;
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
}
// TODO: Handle jwt authentication headers here?
export function useApiMutation<TData = unknown, TVariables = unknown>(
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
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                let errorMessage = 'Request failed';

                if (contentType?.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorMessage;
                    } catch {
                        errorMessage = `Request failed with status ${response.status}`;
                    }
                }

                throw new Error(errorMessage);
            }

            if (contentType?.includes('application/json')) {
                return response.json() as Promise<TData>;
            }

            throw new Error('Response is not JSON');
        },
        onSuccess: (data) => {
            onSuccess?.(data);
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });
}
