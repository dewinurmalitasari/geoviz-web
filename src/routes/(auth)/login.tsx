import {createFileRoute} from '@tanstack/react-router'
import {Login} from "@/components/auth/Login.tsx";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {API_BASE_URL} from "@/config.ts";

export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // TODO: Not complete yet
    const loginMutation = useMutation({
        mutationFn: async (loginData: { username: string; password: string }) => {
            const response = await fetch(API_BASE_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            return response.json();
        },
        onSuccess: (data) => {
            console.log('Login successful:', data);
            // Handle successful login (redirect, store token, etc.)
        },
        onError: (error) => {
            console.error('Login error:', error);
            // Handle error (show message, etc.)
        }
    });

    const onLoginClick = () => {
        console.log('Login submitted: ', {username, password});
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
