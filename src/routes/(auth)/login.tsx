import {createFileRoute} from '@tanstack/react-router'
import {Login} from "@/components/auth/login.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {useLogin} from "@/hooks/use-login.ts";

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useLogin();

    const onLoginClick = () => {
        if (!username || !password) {
            toast.error("Username dan password harus terisi!");
            return;
        }

        loginMutation.mutate({ username, password });
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
