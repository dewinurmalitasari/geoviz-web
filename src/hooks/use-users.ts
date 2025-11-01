import {useApiQuery} from "./use-api-query";
import {API_ENDPOINTS, type DeleteResponse, type UserPayload, type UserResponse, type UsersResponse} from "@/type";
import {useApiMutation} from "@/hooks/use-api-mutation.ts";
import {toast} from "sonner";

export function useGetUsers(role?: 'student' | 'teacher') {
    const endpoint = role
        ? `${API_ENDPOINTS.users}?role=${role}`
        : API_ENDPOINTS.users;

    return useApiQuery<UsersResponse>({
        queryKey: ['users', role],
        endpoint,
        enabled: true,
    });
}

export function useGetUser(userId: string) {
    return useApiQuery<UserResponse>({
        queryKey: ['user', userId],
        endpoint: `${API_ENDPOINTS.users}/${userId}`,
        enabled: !!userId,
    });
}

export function useCreateUser() {
    return useApiMutation<UserResponse, UserPayload>({
        endpoint: API_ENDPOINTS.users,
        method: 'POST',
        onSuccess: (data) => {
            toast.success(`Pengguna ${data.user.username} berhasil dibuat.`);
        },
        onError: (error) => {
            toast.error(`Gagal membuat pengguna: ${error.message}`);
        },
    });
}

export function useUpdateUser(userId: string) {
    return useApiMutation<UserResponse, Partial<UserPayload>>({
        endpoint: `${API_ENDPOINTS.users}/${userId}`,
        method: 'PUT',
        onSuccess: (data) => {
            toast.success(`Pengguna ${data.user.username} berhasil diperbarui.`);
        },
        onError: (error) => {
            toast.error(`Gagal memperbarui pengguna: ${error.message}`);
        },
    });
}

export function useDeleteUser(userId: string) {
    return useApiMutation<DeleteResponse, void>({
        endpoint: `${API_ENDPOINTS.users}/${userId}`,
        method: 'DELETE',
        onSuccess: () => {
            toast.success(`Pengguna berhasil dihapus.`);
        },
        onError: (error) => {
            toast.error(`Gagal menghapus pengguna: ${error.message}`);
        },
    });
}