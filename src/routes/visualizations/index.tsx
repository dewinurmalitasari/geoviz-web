import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/visualizations/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/visualization/"!</div>
}
