import {AlertCircle, Home} from 'lucide-react';
import GeoCard from "@/components/geo-card.tsx";
import GeoButton from "@/components/geo-button.tsx";
import {useNavigate} from "@tanstack/react-router";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <div className="max-w-xl w-full">
                <GeoCard
                    icon={<AlertCircle/>}
                    title="404 - Halaman Tidak Ditemukan"
                    content={
                        <div className="text-center space-y-2">
                            <p className="text-gray-600">
                                Halaman yang Anda cari tidak dapat ditemukan.
                            </p>
                            <p className="text-gray-500 text-sm">
                                Silakan periksa URL atau kembali ke halaman utama.
                            </p>
                        </div>
                    }
                    footer={
                        <GeoButton onClick={() => navigate({to: '/'})} variant="primary">
                            <Home/> Kembali ke Beranda
                        </GeoButton>
                    }
                />
            </div>
        </div>
    );
}
