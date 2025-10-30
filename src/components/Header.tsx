interface HeaderProps {
    username: string | null;
}


export default function Header({ username }: HeaderProps) {
    return (
        <header className="py-4 px-4 md:py-6 md:px-8">
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Logo and Title */}
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-deep-purple-500 to-deep-purple-700 flex items-center justify-center shadow-lg">
                        <img src="favicon.svg" alt="Logo" className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-deep-purple-600 to-deep-purple-800 bg-clip-text text-transparent">
                            GeoViz
                        </h1>
                        <p className="text-gray-600 text-xs md:text-sm truncate hidden lg:block">
                            Aplikasi Pembelajaran Transformasi Geometri
                        </p>
                    </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    <div className="text-right">
                        <p className="text-gray-500 text-xs md:text-sm">Halo,</p>
                        <p className="font-semibold text-deep-purple-700 text-sm md:text-base">
                            {username? username : 'Pengguna'}
                        </p>
                    </div>
                    <div
                        className="hidden sm:block w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-deep-purple-400 to-deep-purple-600 items-center justify-center text-white shadow-md">
                        <i className="fas fa-user text-sm"/>
                    </div>
                </div>
            </div>
        </header>
    );
}
