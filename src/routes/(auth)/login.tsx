import {createFileRoute} from '@tanstack/react-router'
import {Login} from "@/components/auth/login.tsx";
import {useState} from "react";
import {toast} from "sonner";
import {authService} from "@/services/auth-service.ts";
import {setAuthentication} from "@/lib/auth.ts";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";
import he from "he";

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const animatedNavigate = useAnimatedNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onLoginClick = async () => {
        if (!username || !password) {
            toast.error("Username dan password harus terisi!");
            return;
        }

        setIsLoading(true);
        try {
            const data = await authService.login({username, password});

            setAuthentication(
                data.user._id,
                data.user.username,
                data.user.role,
                data.token
            );

            toast.success(`Selamat Datang! ${he.decode(data.user.username)}`);
            animatedNavigate({to: '/'});
        } catch (error) {
            toast.error('Gagal Login: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onLoginClick={onLoginClick}
                isLoading={isLoading}
            />
        </div>
    );
}
