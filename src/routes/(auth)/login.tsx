import {createFileRoute} from '@tanstack/react-router'
import {Login} from "@/components/auth/Login.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {API_ENDPOINTS, type LoginPayload, type LoginResponse} from "@/type.ts";
import {useApiMutation} from "@/hooks/useApiMutation.ts";

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // TODO: Maybe make the error better?
    const loginMutation = useApiMutation<LoginResponse, LoginPayload>({
        endpoint: API_ENDPOINTS.auth.login,
        method: 'POST',
        onSuccess: (data) => {
            toast.success(`Welcome! ${data.user.username}`);

            console.log(data); // TODO: Remove this

            // setAuthentication(
            //     data.user._id,
            //     data.user.username,
            //     data.user.role,
            //     data.token
            // );
            // throw redirect({to: '/'})
        },
        onError: (error) => {
            toast.error(`Login failed: ${error.message}`);
        },
    });

    const onLoginClick = () => {
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
