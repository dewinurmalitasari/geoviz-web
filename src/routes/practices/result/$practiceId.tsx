import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/practices/result/$practiceId')({
    component: RouteComponent,
})

function RouteComponent() {
    const {practiceId} = Route.useParams()

    return <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
        <PageHeader title={`Hasil Latihan ${practiceId}`} description="Lihat hasil latihan soal yang telah dikerjakan" colorScheme="blue"/>
    </div>
}
