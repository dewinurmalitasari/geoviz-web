import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/practices/result/$practiceId')({
    component: RouteComponent,
})

function RouteComponent() {
    const {practiceId} = Route.useParams()

    return <div>Hello "/practices/result/{practiceId}"!</div>
}
