import {AlertCircle, Home} from 'lucide-react';
import GeoCard from "@/components/geo-card.tsx";
import GeoButton from "@/components/geo-button.tsx";
import {useNavigate} from "@tanstack/react-router";
import {getAuthentication} from "@/util/auth.ts";
import Background from "@/components/background.tsx";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";

interface ErrorPageProps {
    useTemplate?: boolean;
    code: number;
    title?: string;
    message: string;
}

export function ErrorPage({useTemplate = false, code, title, message}: ErrorPageProps) {
    const navigate = useNavigate();

    const error = (
        <div className="flex justify-center">
            <div className="max-w-xl w-full">
                <GeoCard
                    icon={<AlertCircle/>}
                    title={code + (title ? ` - ${title}` : '')}
                    content={
                        <p className="text-center py-4 text-gray-600">
                            {message}
                        </p>
                    }
                    footer={
                        <GeoButton onClick={() => navigate({to: '/'})} variant="primary">
                            <Home/> Kembali
                        </GeoButton>
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

                {auth &&
                    <Header username={auth.user.username} role={auth.user.role}/>
                }

                <div className="flex-grow h-full flex flex-col justify-center">
                    {error}
                </div>

                {auth &&
                    <Footer/>
                }
            </div>
        );
    }

    return error;
}
