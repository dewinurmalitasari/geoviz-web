import {createFileRoute} from '@tanstack/react-router'
import {useGetUser} from "@/hooks/use-users.ts";

export const Route = createFileRoute('/users/$userId')({
    component: RouteComponent,
})

function RouteComponent() {
    // TODO: Check if the user role is not student, redirect to /users
    // TODO: Fetch user detail on loader or before load, while tables and statistics show skeletons
    // TODO: Make sure to throw 404 if user not found
    const {userId} = Route.useParams()
    const {
        data: user,
        isFetching: isFetching,
        error: error,
    } = useGetUser(userId);

    return (
        <div>
            <h1>User Detail Page</h1>
            {isFetching && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {user && (
                <div>
                    <p>User ID: {user.user._id}</p>
                    <p>Username: {user.user.username}</p>
                    <p>Role: {user.user.role}</p>
                </div>
            )}
        </div>
    )
}
