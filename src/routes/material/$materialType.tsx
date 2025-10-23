import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/material/$materialType')({
    component: RouteComponent,
})

function RouteComponent() {
    const { materialType } = Route.useParams()

    return <div>Hello "/material/{materialType}"!</div>
}
