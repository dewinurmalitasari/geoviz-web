import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/(visualization)/3dviz')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/(visualization)/3dviz/"!</div>
}
