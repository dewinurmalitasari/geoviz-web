import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/practices/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/practice/"!</div>
}
