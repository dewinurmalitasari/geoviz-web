import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visualizations/$visualizationType')({

  component: RouteComponent,
})

function RouteComponent() {
    const { visualizationType } = Route.useParams()

  return <div>Hello "/visualization/{visualizationType}"!</div>
}
