import { clearAuthentication } from "@/util/auth.ts";

export async function handleApiResponse<TData>(response: Response): Promise<TData> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
            clearAuthentication();
            window.location.href = '/login'; // INFO: Can't use navigation in non-react context
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
}
