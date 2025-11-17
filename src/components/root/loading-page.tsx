import GeoCard from "@/components/geo/geo-card.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

export function LoadingPage({ page }: { page: string }) {
    return (
        <div className="flex justify-center mx-4 md:mx-0">
            <div className="max-w-xl w-full">
                <GeoCard
                    icon={<Spinner className="size-8"/>}
                    title={`Memuat halaman ${page}...`}
                />
            </div>
        </div>
    )
}
