import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/(visualization)/2dviz')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(visualization)/2dviz/"!</div>
}
