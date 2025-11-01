import { api } from "@/lib/api-client.ts";
import {API_ENDPOINTS, type DeleteResponse, type UserPayload, type UserResponse, type UsersResponse} from "@/type.ts";

export const userService = {
    getUsers: (role?: 'student' | 'teacher'): Promise<UsersResponse> => {
        const endpoint = role
            ? `${API_ENDPOINTS.users}?role=${role}`
            : API_ENDPOINTS.users;
        return api.get<UsersResponse>(endpoint);
    },

    getUser: (userId: string): Promise<UserResponse> => {
        return api.get<UserResponse>(`${API_ENDPOINTS.users}/${userId}`);
    },

    createUser: (userData: UserPayload): Promise<UserResponse> => {
        return api.post<UserResponse>(API_ENDPOINTS.users, userData);
    },

    updateUser: (userId: string, userData: UserPayload): Promise<UserResponse> => {
        return api.put<UserResponse>(`${API_ENDPOINTS.users}/${userId}`, userData);
    },

    deleteUser: (userId: string): Promise<DeleteResponse> => {
        return api.delete<DeleteResponse>(`${API_ENDPOINTS.users}/${userId}`);
    },
};