import type {ReactNode} from "react";

interface GeoCardProps {
    icon: ReactNode;
    title: string;
    content: ReactNode;
    buttons?: ReactNode;
}

export default function GeoCard({icon, title, content, buttons}: GeoCardProps) {
    return (
        <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 w-full max-w-md">
            <div className="h-2 bg-gradient-to-r from-deep-purple-400 to-deep-purple-600"></div>

            <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                    <div
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-deep-purple-100 to-deep-purple-200 flex items-center justify-center mr-4">
                        {icon}
                    </div>
                    <h2 className="text-2xl font-bold text-deep-purple-800">{title}</h2>
                </div>

                {content}

                {buttons && <div className="mt-6">{buttons}</div>}
            </div>
        </div>
    );
}