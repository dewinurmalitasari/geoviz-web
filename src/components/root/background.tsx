import { DEFAULT_COLOR_SCHEME, type ColorScheme } from "@/lib/color-scheme";

interface BackgroundProps {
    colorScheme?: ColorScheme;
}

export default function Background({ colorScheme = DEFAULT_COLOR_SCHEME }: BackgroundProps) {
    const getColorClasses = (baseColor: '300' | '400' | '500' | '600') => {
        const colorMap = {
            '300': {
                blue: 'bg-blue-300',
                orange: 'bg-orange-300',
                teal: 'bg-teal-300',
                yellow: 'bg-yellow-300',
                maroon: 'bg-rose-300',
                purple: 'bg-purple-300'
            },
            '400': {
                blue: 'bg-blue-400',
                orange: 'bg-orange-400',
                teal: 'bg-teal-400',
                yellow: 'bg-yellow-400',
                maroon: 'bg-rose-400',
                purple: 'bg-purple-400'
            },
            '500': {
                blue: 'bg-blue-500',
                orange: 'bg-orange-500',
                teal: 'bg-teal-500',
                yellow: 'bg-yellow-500',
                maroon: 'bg-rose-500',
                purple: 'bg-purple-500'
            },
            '600': {
                blue: 'bg-blue-600',
                orange: 'bg-orange-600',
                teal: 'bg-teal-600',
                yellow: 'bg-yellow-600',
                maroon: 'bg-rose-600',
                purple: 'bg-purple-600'
            }
        };

        return colorMap[baseColor]?.[colorScheme] || colorMap[baseColor]?.purple || '';
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none -z-10">
            {/* Large screens (lg and up) - Full set */}
            <div className={`hidden lg:block absolute top-[10%] left-[10%] w-64 h-64 ${getColorClasses('500')} rounded-full animate-[float_15s_ease-in-out_infinite]`}></div>
            <div className={`hidden lg:block absolute top-[12%] left-[35%] w-40 h-40 ${getColorClasses('400')} rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]`}></div>
            <div className={`hidden lg:block absolute top-[8%] right-[15%] w-52 h-52 ${getColorClasses('300')} rounded-full animate-[float_18s_ease-in-out_infinite_0.4s]`}></div>
            <div className={`hidden lg:block absolute top-[30%] left-[5%] w-36 h-36 ${getColorClasses('600')} rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]`}></div>
            <div className={`hidden lg:block absolute top-[25%] left-[50%] w-44 h-44 ${getColorClasses('400')} rounded-3xl animate-[float_16s_ease-in-out_infinite_0.6s]`}></div>
            <div className={`hidden lg:block absolute top-[35%] right-[8%] w-28 h-28 ${getColorClasses('500')} rounded-full animate-[float_12s_ease-in-out_infinite_1s]`}></div>
            <div className={`hidden lg:block absolute top-[45%] left-[20%] w-56 h-56 ${getColorClasses('300')} rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]`}></div>
            <div className={`hidden lg:block absolute top-[50%] left-[65%] w-32 h-32 ${getColorClasses('600')} rotate-12 animate-[float-alt_15s_ease-in-out_infinite_0.9s]`}></div>
            <div className={`hidden lg:block absolute top-[65%] left-[10%] w-48 h-48 ${getColorClasses('400')} rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]`}></div>
            <div className={`hidden lg:block absolute top-[60%] left-[45%] w-36 h-36 ${getColorClasses('500')} rounded-2xl animate-[float_13s_ease-in-out_infinite_1.1s]`}></div>
            <div className={`hidden lg:block absolute top-[70%] right-[25%] w-44 h-44 ${getColorClasses('300')} rotate-30 animate-[float-alt_19s_ease-in-out_infinite_0.5s]`}></div>
            <div className={`hidden lg:block absolute bottom-[15%] left-[30%] w-52 h-52 ${getColorClasses('600')} rounded-full animate-[float_16s_ease-in-out_infinite_0.8s]`}></div>
            <div className={`hidden lg:block absolute bottom-[10%] right-[12%] w-40 h-40 ${getColorClasses('400')} rounded-lg animate-[float-alt_14s_ease-in-out_infinite_1.3s]`}></div>
            <div className={`hidden lg:block absolute bottom-[8%] left-[70%] w-28 h-28 ${getColorClasses('500')} rotate-45 animate-[float_11s_ease-in-out_infinite_0.6s]`}></div>

            {/* Medium screens (md) - Reduced set */}
            <div className={`hidden md:block lg:hidden absolute top-[15%] left-[10%] w-48 h-48 ${getColorClasses('500')} rounded-full animate-[float_15s_ease-in-out_infinite]`}></div>
            <div className={`hidden md:block lg:hidden absolute top-[10%] right-[15%] w-36 h-36 ${getColorClasses('400')} rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]`}></div>
            <div className={`hidden md:block lg:hidden absolute top-[35%] left-[20%] w-44 h-44 ${getColorClasses('300')} rounded-full animate-[float_16s_ease-in-out_infinite_0.6s]`}></div>
            <div className={`hidden md:block lg:hidden absolute top-[30%] right-[10%] w-32 h-32 ${getColorClasses('600')} rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]`}></div>
            <div className={`hidden md:block lg:hidden absolute top-[55%] left-[15%] w-40 h-40 ${getColorClasses('400')} rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]`}></div>
            <div className={`hidden md:block lg:hidden absolute top-[50%] right-[20%] w-52 h-52 ${getColorClasses('500')} rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]`}></div>
            <div className={`hidden md:block lg:hidden absolute bottom-[15%] left-[25%] w-36 h-36 ${getColorClasses('300')} rotate-30 animate-[float_13s_ease-in-out_infinite_1.1s]`}></div>
            <div className={`hidden md:block lg:hidden absolute bottom-[10%] right-[15%] w-44 h-44 ${getColorClasses('600')} rounded-full animate-[float_16s_ease-in-out_infinite_0.8s]`}></div>

            {/* Mobile screens (sm and below) - Minimal set */}
            <div className={`md:hidden absolute top-[15%] left-[10%] w-32 h-32 ${getColorClasses('500')} rounded-full animate-[float_15s_ease-in-out_infinite]`}></div>
            <div className={`md:hidden absolute top-[10%] right-[10%] w-24 h-24 ${getColorClasses('400')} rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]`}></div>
            <div className={`md:hidden absolute top-[40%] left-[15%] w-28 h-28 ${getColorClasses('300')} rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]`}></div>
            <div className={`md:hidden absolute top-[35%] right-[15%] w-36 h-36 ${getColorClasses('600')} rounded-full animate-[float_16s_ease-in-out_infinite_0.6s]`}></div>
            <div className={`md:hidden absolute bottom-[25%] left-[20%] w-40 h-40 ${getColorClasses('400')} rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]`}></div>
            <div className={`md:hidden absolute bottom-[20%] right-[20%] w-32 h-32 ${getColorClasses('500')} rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]`}></div>
        </div>
    );
}