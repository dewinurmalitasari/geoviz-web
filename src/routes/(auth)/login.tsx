import {createFileRoute, redirect, useNavigate} from '@tanstack/react-router'
import {Login} from "@/components/auth/login.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {API_ENDPOINTS, type LoginPayload, type LoginResponse} from "@/type.ts";
import {useApiMutation} from "@/hooks/use-api-mutation.ts";
import {getAuthentication, setAuthentication} from "@/util/auth.ts";

export const Route = createFileRoute('/(auth)/login')({
    beforeLoad: () => {
        // If already authenticated, redirect to home
        if (getAuthentication() !== null) {
            throw redirect({to: '/'})
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useApiMutation<LoginResponse, LoginPayload>({
        endpoint: API_ENDPOINTS.auth.login,
        method: 'POST',
        onSuccess: (data) => {
            toast.success(`Selamat Datang! ${data.user.username}`);

            setAuthentication(
                data.user._id,
                data.user.username,
                data.user.role,
                data.token
            );
            navigate({to: '/'});

            // TODO: Send visit tracking event
        },
        onError: (error) => {
            toast.error(`Gagal Masuk: ${error.message}`);
        },
    });

    const onLoginClick = () => {
        if (!username || !password) {
            toast.error("Username dan password harus terisi!");
            return;
        }

        loginMutation.mutate({username, password});
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onLoginClick={onLoginClick}
                isLoading={loginMutation.isPending}
            />
        </div>
    );
}
