import {api} from "@/lib/api-client.ts";
import {API_ENDPOINTS, type LoginPayload, type LoginResponse} from "@/type.ts";

export const authService = {
    login: (loginData: LoginPayload): Promise<LoginResponse> => {
        return api.post<LoginResponse>(API_ENDPOINTS.login, loginData);
    },
};