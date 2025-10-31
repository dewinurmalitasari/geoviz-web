import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
    component: RouteComponent,
})

function RouteComponent() {
    // TODO: Check if the user role is not student, redirect to /users
    // TODO: Fetch user detail on loader or before load, while tables and statistics show skeletons
    // TODO: Make sure to throw 404 if user not found
    const {userId} = Route.useParams()

    return <div>Hello "/users/{userId}"!</div>
}
