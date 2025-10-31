import {useApiQuery} from "./use-api-query";
import {API_ENDPOINTS, type GetUsersResponse} from "@/type";

export function useGetUsers(role?: 'student' | 'teacher') {
    const endpoint = role
        ? `${API_ENDPOINTS.users}?role=${role}`
        : API_ENDPOINTS.users;

    return useApiQuery<GetUsersResponse>({
        queryKey: ['users', role],
        endpoint,
        enabled: true,
    });
}