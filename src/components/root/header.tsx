import LogoutButton from "@/components/auth/logout-button.tsx";
import {Link} from "@tanstack/react-router";
import {PRACTICE_TYPES, ROUTES, VISUALIZATION_TYPES} from "@/type.ts";
import he from "he";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import {cn} from "@/lib/utils";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation";
import {colorMap, type ColorScheme, DEFAULT_COLOR_SCHEME} from "@/lib/color-scheme";

interface HeaderProps {
    username?: string;
    role?: string;
    colorScheme?: ColorScheme;
}

// Role-based navigation items configuration
const getNavigationItems = (role?: string) => {
    const baseItems = [
        {
            title: "Beranda",
            href: ROUTES.home,
            roles: ['admin', 'student', 'teacher'], // All roles can access home
        },
        {
            title: "Pengguna",
            href: ROUTES.users.base,
            roles: ['admin', 'teacher'], // Only admin and teacher can access users
        },
        {
            title: "Materi",
            href: ROUTES.materials.base,
            roles: ['admin', 'student', 'teacher'], // All roles can access materials
        },
        {
            title: "Latihan",
            roles: ['student'], // Only students can access practices
            // @ts-ignore TS6133
            items: Object.entries(PRACTICE_TYPES).map(([key, value]) => ({
                title: value.translatePracticeType(),
                href: ROUTES.practices.practiceType(value),
                description: `Latihan ${value.translatePracticeType().toLowerCase()} transformasi geometri`,
            })),
        },
        {
            title: "Visualisasi",
            roles: ['admin', 'student', 'teacher'], // All roles can access visualizations
            // @ts-ignore TS6133
            items: Object.entries(VISUALIZATION_TYPES).map(([key, value]) => ({
                title: value.translateVisualizationType(),
                href: ROUTES.visualizations.visualizationType(value),
                description: `Visualisasi transformasi geometri ${getVisualizationDescription(value)}`,
            })),
        },
    ];

    // Filter items based on user role
    return baseItems.filter(item => item.roles.includes(role || 'student'));
};

// Helper function to get visualization descriptions
function getVisualizationDescription(type: string): string {
    switch (type) {
        case VISUALIZATION_TYPES.SHAPE_2D:
            return "pada bentuk 2 dimensi";
        case VISUALIZATION_TYPES.SHAPE_3D:
            return "pada bentuk 3 dimensi";
        case VISUALIZATION_TYPES.EQUATION:
            return "melalui persamaan";
        default:
            return "";
    }
}

const ListItem = ({title, href, description, colorScheme = DEFAULT_COLOR_SCHEME}: {
    title: string;
    href: string;
    description: string;
    colorScheme?: ColorScheme;
}) => {
    const animatedNavigate = useAnimatedNavigation();
    const colors = colorMap[colorScheme];

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        animatedNavigate({to: href});
    };

    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={`#${href}`}
                    onClick={handleClick}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200",
                        `hover:bg-gradient-to-r hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} hover:${colors.label} hover:shadow-md`,
                        `focus:${colors.cardSelected.split(' ')[2]} focus:${colors.text}`,
                        "border border-transparent hover:border-deep-purple-200",
                        "transform hover:scale-105 origin-center",
                        "cursor-pointer"
                    )}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {description}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
};

export default function Header({
                                   username = "Pengguna",
                                   role = "student",
                                   colorScheme = DEFAULT_COLOR_SCHEME
                               }: HeaderProps) {
    const navigationItems = getNavigationItems(role);
    const animatedNavigate = useAnimatedNavigation();
    const colors = colorMap[colorScheme];

    const handleNavigationClick = (href: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        animatedNavigate({to: href});
    };

    const getGradientFromColor = (color: string) => {
        switch (color) {
            case 'blue':
                return 'from-blue-100 via-white to-blue-100';
            case 'orange':
                return 'from-orange-100 via-white to-orange-100';
            case 'teal':
                return 'from-teal-100 via-white to-teal-100';
            case 'yellow':
                return 'from-yellow-100 via-white to-yellow-100';
            case 'maroon':
                return 'from-rose-100 via-white to-rose-100';
            default:
                return 'from-deep-purple-100 via-white to-deep-purple-100';
        }
    };

    const getTextGradient = (color: string) => {
        switch (color) {
            case 'blue':
                return 'from-blue-600 to-blue-800';
            case 'orange':
                return 'from-orange-600 to-orange-800';
            case 'teal':
                return 'from-teal-600 to-teal-800';
            case 'yellow':
                return 'from-yellow-600 to-yellow-800';
            case 'maroon':
                return 'from-rose-600 to-rose-800';
            default:
                return 'from-deep-purple-600 to-deep-purple-800';
        }
    };

    const getRoleBadgeColor = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'orange':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'teal':
                return 'bg-teal-100 text-teal-800 border-teal-200';
            case 'yellow':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'maroon':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            default:
                return 'bg-deep-purple-100 text-deep-purple-800 border-deep-purple-200';
        }
    };

    return (
        <header
            className={cn(
                "bg-gradient-to-r border-b py-4 px-4 lg:px-8 relative z-50",
                getGradientFromColor(colorScheme),
                colors.border
            )}
            data-aos="fade-down">
            <div className="container mx-auto">
                {/* Desktop Layout (lg and above) */}
                <div className="hidden lg:flex items-center justify-between gap-4">
                    {/* Logo and Title - Keep using regular Link */}
                    <div className="flex items-center gap-8">
                        <Link to={ROUTES.home} className="flex items-center gap-3 min-w-0 flex-shrink-0"
                              onClick={handleNavigationClick(ROUTES.home)}>
                            <div
                                className={cn(
                                    "w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                                    colors.primary.from,
                                    colors.primary.to
                                )}>
                                <img src="favicon.svg" alt="Logo" className="w-6 h-6 md:w-7 md:h-7"/>
                            </div>
                            <div className="min-w-0">
                                <h1 className={cn(
                                    "text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                                    getTextGradient(colorScheme)
                                )}>
                                    GeoViz
                                </h1>
                                <p className="text-gray-600 text-xs md:text-sm truncate lg:block">
                                    Aplikasi Pembelajaran Transformasi Geometri
                                </p>
                            </div>
                        </Link>

                        {/* Navigation Menu - Use animated navigation */}
                        <NavigationMenu className="flex-1 max-w-2xl relative z-50">
                            <NavigationMenuList>
                                {navigationItems.map((item, index) => (
                                    <NavigationMenuItem key={index}>
                                        {item.items ? (
                                            <>
                                                <NavigationMenuTrigger className={cn(
                                                    "bg-transparent font-medium relative z-50",
                                                    colors.text,
                                                    `hover:bg-gradient-to-r hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} hover:${colors.label}`,
                                                    `data-[state=open]:bg-gradient-to-r data-[state=open]:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} data-[state=open]:${colors.label}`,
                                                    "border border-transparent hover:border-deep-purple-200 data-[state=open]:border-deep-purple-200",
                                                    "transition-all duration-200 transform hover:scale-105",
                                                    "shadow-sm hover:shadow-md data-[state=open]:shadow-md cursor-pointer"
                                                )}>
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="relative z-[100]">
                                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] cursor-pointer">
                                                        {item.items.map((subItem, subIndex) => (
                                                            <ListItem
                                                                key={subIndex}
                                                                title={subItem.title}
                                                                href={subItem.href}
                                                                description={subItem.description}
                                                                colorScheme={colorScheme}
                                                            />
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            <a
                                                href={`#${item.href}`}
                                                onClick={handleNavigationClick(item.href!)}
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200",
                                                    `hover:bg-gradient-to-r hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} hover:${colors.label}`,
                                                    `focus:${colors.cardSelected.split(' ')[2]} focus:${colors.text}`,
                                                    colors.text,
                                                    "border border-transparent hover:border-deep-purple-200",
                                                    "transform hover:scale-105",
                                                    "shadow-sm hover:shadow-md",
                                                    "cursor-pointer"
                                                )}
                                            >
                                                {item.title}
                                            </a>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 flex-shrink-0 relative z-50">
                        <div className="text-right">
                            <p className="text-gray-500 text-xs md:text-sm font-medium">Halo,</p>
                            <div className="flex items-center gap-2">
                                <p className={cn(
                                    "font-bold text-sm md:text-base bg-gradient-to-r bg-clip-text text-transparent",
                                    getTextGradient(colorScheme)
                                )}>
                                    {he.decode(username)}
                                </p>
                                <span className={cn(
                                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                                    getRoleBadgeColor(colorScheme)
                                )}>
                                    {role?.translateRole()}
                                </span>
                            </div>
                        </div>
                        <div className="w-24">
                            <LogoutButton/>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout (less than lg) */}
                <div className="lg:hidden flex flex-col gap-4">
                    {/* Top Row - Logo/Title */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Logo and Title - Keep using regular Link */}
                        <Link to={ROUTES.home} className="flex items-center gap-3 min-w-0 flex-1"
                              onClick={handleNavigationClick(ROUTES.home)}>
                            <div
                                className={cn(
                                    "w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                                    colors.primary.from,
                                    colors.primary.to
                                )}>
                                <img src="favicon.svg" alt="Logo" className="w-6 h-6"/>
                            </div>
                            <div className="min-w-0">
                                <h1 className={cn(
                                    "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                                    getTextGradient(colorScheme)
                                )}>
                                    GeoViz
                                </h1>
                                <p className="text-gray-600 text-xs truncate">
                                    Aplikasi Pembelajaran Transformasi Geometri
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Menu for Mobile - Use animated navigation */}
                    <NavigationMenu className="w-full relative z-[60]">
                        <NavigationMenuList className="flex-wrap justify-center gap-1">
                            {navigationItems.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    {item.items ? (
                                        <>
                                            <NavigationMenuTrigger className={cn(
                                                "bg-transparent font-medium text-xs h-8 px-3 relative z-[60]",
                                                colors.text,
                                                `hover:bg-gradient-to-r hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} hover:${colors.label}`,
                                                `data-[state=open]:bg-gradient-to-r data-[state=open]:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} data-[state=open]:${colors.label}`,
                                                "border border-transparent hover:border-deep-purple-200 data-[state=open]:border-deep-purple-200",
                                                "transition-all duration-200 transform hover:scale-105",
                                                "shadow-sm hover:shadow-md data-[state=open]:shadow-md"
                                            )}>
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="relative z-[70]">
                                                <ul className="grid w-[300px] gap-3 p-4">
                                                    {item.items.map((subItem, subIndex) => (
                                                        <ListItem
                                                            key={subIndex}
                                                            title={subItem.title}
                                                            href={subItem.href}
                                                            description={subItem.description}
                                                            colorScheme={colorScheme}
                                                        />
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <a
                                            href={`#${item.href}`}
                                            onClick={handleNavigationClick(item.href!)}
                                            className={cn(
                                                "group inline-flex h-8 items-center justify-center rounded-md bg-transparent px-3 py-2 text-xs font-medium transition-all duration-200",
                                                `hover:bg-gradient-to-r hover:${colors.iconBg.replace('from-', 'from-').replace('to-', 'to-')} hover:${colors.label}`,
                                                `focus:${colors.cardSelected.split(' ')[2]} focus:${colors.text}`,
                                                colors.text,
                                                "border border-transparent hover:border-deep-purple-200",
                                                "transform hover:scale-105",
                                                "shadow-sm hover:shadow-md",
                                                "cursor-pointer"
                                            )}
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Bottom Row - User Details and Logout Button */}
                    <div
                        className={cn(
                            "flex items-center justify-between gap-3 bg-white rounded-xl p-3 border shadow-sm relative z-40",
                            colors.border
                        )}>
                        {/* User Details */}
                        <div className="flex items-center gap-3 flex-1">
                            {/* User Avatar */}
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center shadow-md text-white font-bold text-sm",
                                    colors.primary.from,
                                    colors.primary.to
                                )}>
                                {username.charAt(0).toUpperCase()}
                            </div>

                            {/* User Info */}
                            <div className="min-w-0">
                                <p className="text-gray-500 text-xs font-medium">Halo,</p>
                                <div className="flex items-center gap-2">
                                    <p className={cn(
                                        "font-bold text-sm truncate max-w-[150px]",
                                        colors.text
                                    )}>
                                        {he.decode(username)}
                                    </p>
                                </div>
                                <span className={cn(
                                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shadow-sm mt-1",
                                    getRoleBadgeColor(colorScheme)
                                )}>
                                    {role?.translateRole()}
                                </span>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="w-28">
                            <LogoutButton/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}