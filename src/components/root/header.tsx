import LogoutButton from "@/components/auth/logout-button.tsx";
import {Link} from "@tanstack/react-router";

interface HeaderProps {
    username?: string;
    role?: string;
}

export default function Header({ username = "Pengguna", role = "Student" }: HeaderProps) {
    return (
        <header className="bg-gradient-to-r from-geo-purple-100 via-white to-geo-purple-100 border-b border-deep-purple-400 py-4 px-4 md:px-8">
            <div className="container mx-auto">
                {/* Desktop Layout (md and above) */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    {/* Logo and Title */}
                    <Link to="/" className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-deep-purple-500 to-deep-purple-700 flex items-center justify-center shadow-lg">
                            <img src="favicon.svg" alt="Logo" className="w-6 h-6 md:w-7 md:h-7"/>
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-deep-purple-600 to-deep-purple-800 bg-clip-text text-transparent">
                                GeoViz
                            </h1>
                            <p className="text-gray-600 text-xs md:text-sm truncate lg:block">
                                Aplikasi Pembelajaran Transformasi Geometri
                            </p>
                        </div>
                    </Link>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Halo,</p>
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-deep-purple-700 text-sm md:text-base bg-gradient-to-r from-deep-purple-600 to-purple-600 bg-clip-text text-transparent">
                                    {username}
                                </p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-deep-purple-100 text-deep-purple-800 border border-deep-purple-200">
                                    {role?.translateRole()}
                                </span>
                            </div>
                        </div>
                        <div className="w-24">
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout (less than md) */}
                <div className="md:hidden flex flex-col gap-4">
                    {/* Top Row - Logo/Title */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Logo and Title */}
                        <Link to="/" className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-deep-purple-500 to-deep-purple-700 flex items-center justify-center shadow-lg">
                                <img src="favicon.svg" alt="Logo" className="w-6 h-6"/>
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-deep-purple-600 to-deep-purple-800 bg-clip-text text-transparent">
                                    GeoViz
                                </h1>
                                <p className="text-gray-600 text-xs truncate">
                                    Aplikasi Pembelajaran Transformasi Geometri
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom Row - User Details and Logout Button */}
                    <div className="flex items-center justify-between gap-3 bg-white rounded-xl p-3 border border-deep-purple-100 shadow-sm">
                        {/* User Details */}
                        <div className="flex items-center gap-3 flex-1">
                            {/* User Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-sm">
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>

                            {/* User Info */}
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs font-medium">Halo,</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-deep-purple-700 text-sm truncate max-w-[150px]">
                                        {username}
                                    </p>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-deep-purple-50 text-deep-purple-700 border border-deep-purple-200 shadow-sm mt-1">
                                    {role?.translateRole()}
                                </span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="w-28">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}