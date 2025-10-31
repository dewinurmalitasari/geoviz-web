// hooks/use-login.ts
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { API_ENDPOINTS, type LoginPayload, type LoginResponse } from "@/type.ts";
import { useApiMutation } from "./use-api-mutation.ts";
import { setAuthentication } from "@/util/auth.ts";

export function useLogin() {
    const navigate = useNavigate();

    return useApiMutation<LoginResponse, LoginPayload>({
        endpoint: API_ENDPOINTS.login,
        method: 'POST',
        onSuccess: (data) => {
            toast.success(`Selamat Datang! ${data.user.username}`);

            setAuthentication(
                data.user._id,
                data.user.username,
                data.user.role,
                data.token
            );
            navigate({ to: '/' });

            // TODO: Send visit tracking event
        },
        onError: (error) => {
            toast.error(`Gagal Masuk: ${error.message}`);
        },
    });
}