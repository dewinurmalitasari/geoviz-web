import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/practice/$practiceType')({
    component: RouteComponent,
})

function RouteComponent() {
    const { practiceType } = Route.useParams()

    return <div>Hello "/practice/{practiceType}"!</div>
}
