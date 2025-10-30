import {createFileRoute} from '@tanstack/react-router'
import {Login} from "@/components/auth/Login.tsx";
export const Route = createFileRoute('/(auth)/login')({
    component: RouteComponent,
})

function RouteComponent() {
    // TODO: Tanstack Query for login

    // return <Login/>
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Login/>
        </div>
    );
}
