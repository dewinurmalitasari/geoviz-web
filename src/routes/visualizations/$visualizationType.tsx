import { createFileRoute } from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/visualizations/$visualizationType')({

  component: RouteComponent,
})

function RouteComponent() {
    const { visualizationType } = Route.useParams()

    return <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
        <PageHeader title={`Latihan ${visualizationType}`} description="Lakukan latihan soal sesuai instruksi"/>
    </div>
}
