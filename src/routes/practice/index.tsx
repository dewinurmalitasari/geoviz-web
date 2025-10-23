import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/practice/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/practice/"!</div>
}
