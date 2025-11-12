import { cn } from "@/lib/utils";
import { DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface FooterProps {
    colorScheme?: ColorScheme;
}

export default function Footer({ colorScheme = DEFAULT_COLOR_SCHEME }: FooterProps) {
    const getFooterBg = (color: ColorScheme) => {
        switch (color) {
            case 'blue': return 'bg-blue-800';
            case 'orange': return 'bg-orange-800';
            case 'teal': return 'bg-teal-800';
            case 'yellow': return 'bg-yellow-800';
            case 'maroon': return 'bg-rose-800';
            default: return 'bg-deep-purple-800';
        }
    };

    return (
        <footer className={cn(
            "py-4 md:py-6 px-4 md:px-8 text-white mt-8",
            getFooterBg(colorScheme)
        )} data-aos="fade-up" data-aos-offset="0">
            <div className="container mx-auto text-center">
                <p className="text-sm md:text-base">
                    © 2025 GeoViz - Aplikasi Pembelajaran Transformasi Geometri
                </p>
            </div>
        </footer>
    );
}