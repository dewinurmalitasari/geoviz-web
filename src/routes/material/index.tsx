import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/material/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/material/"!</div>
}
