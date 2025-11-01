import {createFileRoute} from '@tanstack/react-router'
import PageHeader from "@/components/root/page-header.tsx";

export const Route = createFileRoute('/materials/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Materi" description="Pelajari konsep-konsep transformasi geometri"/>
        </div>
    );
}
