export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none -z-10">
            {/* Large screens (lg and up) - Full set */}
            <div className="hidden lg:block absolute top-[10%] left-[10%] w-64 h-64 bg-purple-500 rounded-full animate-[float_15s_ease-in-out_infinite]"></div>
            <div className="hidden lg:block absolute top-[12%] left-[35%] w-40 h-40 bg-purple-400 rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]"></div>
            <div className="hidden lg:block absolute top-[8%] right-[15%] w-52 h-52 bg-purple-300 rounded-full animate-[float_18s_ease-in-out_infinite_0.4s]"></div>
            <div className="hidden lg:block absolute top-[30%] left-[5%] w-36 h-36 bg-purple-600 rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]"></div>
            <div className="hidden lg:block absolute top-[25%] left-[50%] w-44 h-44 bg-purple-400 rounded-3xl animate-[float_16s_ease-in-out_infinite_0.6s]"></div>
            <div className="hidden lg:block absolute top-[35%] right-[8%] w-28 h-28 bg-purple-500 rounded-full animate-[float_12s_ease-in-out_infinite_1s]"></div>
            <div className="hidden lg:block absolute top-[45%] left-[20%] w-56 h-56 bg-purple-300 rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]"></div>
            <div className="hidden lg:block absolute top-[50%] left-[65%] w-32 h-32 bg-purple-600 rotate-12 animate-[float-alt_15s_ease-in-out_infinite_0.9s]"></div>
            <div className="hidden lg:block absolute top-[65%] left-[10%] w-48 h-48 bg-purple-400 rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]"></div>
            <div className="hidden lg:block absolute top-[60%] left-[45%] w-36 h-36 bg-purple-500 rounded-2xl animate-[float_13s_ease-in-out_infinite_1.1s]"></div>
            <div className="hidden lg:block absolute top-[70%] right-[25%] w-44 h-44 bg-purple-300 rotate-30 animate-[float-alt_19s_ease-in-out_infinite_0.5s]"></div>
            <div className="hidden lg:block absolute bottom-[15%] left-[30%] w-52 h-52 bg-purple-600 rounded-full animate-[float_16s_ease-in-out_infinite_0.8s]"></div>
            <div className="hidden lg:block absolute bottom-[10%] right-[12%] w-40 h-40 bg-purple-400 rounded-lg animate-[float-alt_14s_ease-in-out_infinite_1.3s]"></div>
            <div className="hidden lg:block absolute bottom-[8%] left-[70%] w-28 h-28 bg-purple-500 rotate-45 animate-[float_11s_ease-in-out_infinite_0.6s]"></div>

            {/* Medium screens (md) - Reduced set */}
            <div className="hidden md:block lg:hidden absolute top-[15%] left-[10%] w-48 h-48 bg-purple-500 rounded-full animate-[float_15s_ease-in-out_infinite]"></div>
            <div className="hidden md:block lg:hidden absolute top-[10%] right-[15%] w-36 h-36 bg-purple-400 rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]"></div>
            <div className="hidden md:block lg:hidden absolute top-[35%] left-[20%] w-44 h-44 bg-purple-300 rounded-full animate-[float_16s_ease-in-out_infinite_0.6s]"></div>
            <div className="hidden md:block lg:hidden absolute top-[30%] right-[10%] w-32 h-32 bg-purple-600 rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]"></div>
            <div className="hidden md:block lg:hidden absolute top-[55%] left-[15%] w-40 h-40 bg-purple-400 rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]"></div>
            <div className="hidden md:block lg:hidden absolute top-[50%] right-[20%] w-52 h-52 bg-purple-500 rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]"></div>
            <div className="hidden md:block lg:hidden absolute bottom-[15%] left-[25%] w-36 h-36 bg-purple-300 rotate-30 animate-[float_13s_ease-in-out_infinite_1.1s]"></div>
            <div className="hidden md:block lg:hidden absolute bottom-[10%] right-[15%] w-44 h-44 bg-purple-600 rounded-full animate-[float_16s_ease-in-out_infinite_0.8s]"></div>

            {/* Mobile screens (sm and below) - Minimal set */}
            <div className="md:hidden absolute top-[15%] left-[10%] w-32 h-32 bg-purple-500 rounded-full animate-[float_15s_ease-in-out_infinite]"></div>
            <div className="md:hidden absolute top-[10%] right-[10%] w-24 h-24 bg-purple-400 rounded-lg animate-[float_13s_ease-in-out_infinite_0.8s]"></div>
            <div className="md:hidden absolute top-[40%] left-[15%] w-28 h-28 bg-purple-300 rotate-45 animate-[float_14s_ease-in-out_infinite_1.2s]"></div>
            <div className="md:hidden absolute top-[35%] right-[15%] w-36 h-36 bg-purple-600 rounded-full animate-[float_16s_ease-in-out_infinite_0.6s]"></div>
            <div className="md:hidden absolute bottom-[25%] left-[20%] w-40 h-40 bg-purple-400 rounded-full animate-[float_17s_ease-in-out_infinite_0.7s]"></div>
            <div className="md:hidden absolute bottom-[20%] right-[20%] w-32 h-32 bg-purple-500 rounded-lg animate-[float-alt_20s_ease-in-out_infinite_0.3s]"></div>
        </div>
    );
}