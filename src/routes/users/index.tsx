import {createFileRoute} from '@tanstack/react-router'
import {GraduationCap, Users} from "lucide-react";
import GeoCard from "@/components/geo-card.tsx";

export const Route = createFileRoute('/users/')({
    component: RouteComponent,
})

function RouteComponent() {

    // TODO: Back button
    return (
        <div className="flex-grow container mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
            <GeoCard
                icon={<GraduationCap/>}
                title="Akun Siswa"
                content={<p>student table</p>}
            />

            <GeoCard
                icon={<Users/>}
                title="Akun Guru"
                content={<p>teacher table</p>}
            />
        </div>
    );
}
