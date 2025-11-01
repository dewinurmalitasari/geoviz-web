import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/materials/$materialId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { materialId } = Route.useParams()

    return <div>Hello "/material/{materialId}"!</div>
}
