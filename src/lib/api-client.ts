import {clearAuthentication, getAuthentication} from "@/lib/auth.ts";

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

class ApiClient {
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const auth = getAuthentication();
        const token = auth?.token;

        const headers = new Headers(options.headers);

        if (!headers.has('Content-Type') && options.body) {
            headers.set('Content-Type', 'application/json');
        }

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        const response = await fetch(endpoint, {
            ...options,
            headers,
        });

        // For 204 No Content responses
        if (response.status === 204) {
            return {} as T;
        }

        // For 401 Unauthorized, clear authentication and redirect to login
        if (response.status === 401) {
            clearAuthentication();

            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/geoviz/#/login';
            }
        }

        let responseData;
        try {
            responseData = await response.json();
        } catch {
            responseData = null;
        }

        if (!response.ok) {
            const errorMessage = responseData?.message || response.statusText || `HTTP ${response.status}`;
            throw new ApiError(
                errorMessage,
                response.status,
                response.statusText,
                responseData
            );
        }

        return responseData as T;
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint);
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiClient();