import {AlertCircle, ArrowLeft, Home} from 'lucide-react';
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import Background from "@/components/root/background.tsx";
import Header from "@/components/root/header.tsx";
import Footer from "@/components/root/footer.tsx";
import {ROUTES} from "@/type.ts";

interface ErrorPageProps {
    useTemplate?: boolean;
    status: number;
    statusText: string;
    title: string;
    message: string;
}

export function ErrorPage({useTemplate = false, status, statusText, title, message}: ErrorPageProps) {

    const error = (
        <div className="flex justify-center">
            <div className="max-w-xl w-full">
                <GeoCard
                    icon={<AlertCircle className="w-8 h-8 text-deep-purple-600" strokeWidth={2.5}/>}
                    title={`Error ${status} - ${statusText}`}
                    content={
                        <div className="space-y-6">
                            <div className="text-center space-y-3">
                                <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">{message}</p>
                            </div>
                        </div>
                    }
                    footer={
                        <div className="flex flex-row justify-between space-x-4 pt-4">
                            <GeoButton onClick={() => window.history.back()} variant="primary" className="flex-1">
                                <ArrowLeft className="w-5 h-5"/> Kembali
                            </GeoButton>
                            <GeoButton to={ROUTES.home} variant="secondary" className="flex-1">
                                <Home className="w-5 h-5"/> Beranda
                            </GeoButton>
                        </div>
                    }
                />
            </div>
        </div>
    )

    if (useTemplate) {
        const auth = getAuthentication();
        return (
            <div className="relative min-h-screen flex flex-col font-sans">
                <Background/>

                {auth && <Header username={auth.user.username} role={auth.user.role}/>}

                <div className="flex-grow h-full flex flex-col justify-center">
                    {error}
                </div>

                {auth && <Footer/>}
            </div>
        );
    }

    return error;
}
