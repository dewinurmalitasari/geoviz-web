import { api } from "@/lib/api-client.ts";
import {API_ENDPOINTS, type DeleteResponse, type UserPayload, type UserResponse, type UsersResponse} from "@/type.ts";

export const userService = { // TODO
    getUsers: (role?: 'student' | 'teacher'): Promise<UsersResponse> => {
        const endpoint = role
            ? API_ENDPOINTS.users.withRole(role)
            : API_ENDPOINTS.users.base;
        return api.get<UsersResponse>(endpoint);
    },

    getUser: (userId: string): Promise<UserResponse> => {
        return api.get<UserResponse>(API_ENDPOINTS.users.withId(userId));
    },

    createUser: (userData: UserPayload): Promise<UserResponse> => {
        return api.post<UserResponse>(API_ENDPOINTS.users.base, userData);
    },

    updateUser: (userId: string, userData: UserPayload): Promise<UserResponse> => {
        return api.put<UserResponse>(API_ENDPOINTS.users.withId(userId), userData);
    },

    deleteUser: (userId: string): Promise<DeleteResponse> => {
        return api.delete<DeleteResponse>(API_ENDPOINTS.users.withId(userId));
    },
};