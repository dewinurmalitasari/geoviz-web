export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none -z-10">
            <div className="absolute top-[5%] left-[5%] w-64 h-64 bg-purple-500 rounded-full animate-[float_15s_ease-in-out_infinite]"></div>
            <div className="absolute top-[10%] right-[15%] w-48 h-48 bg-purple-400 rounded-full animate-[float_13s_ease-in-out_infinite_0.5s]"></div>
            <div className="absolute top-[25%] left-[40%] w-36 h-36 bg-purple-400 rotate-12 animate-[float_16s_ease-in-out_infinite_0.3s]"></div>
            <div className="absolute top-[35%] right-[25%] w-32 h-32 bg-purple-600 rotate-45 animate-[float_12s_ease-in-out_infinite_1s]"></div>
            <div className="absolute top-[50%] left-[15%] w-56 h-56 bg-purple-500 rounded-full animate-[float-alt_20s_ease-in-out_infinite]"></div>
            <div className="absolute top-[60%] right-[35%] w-44 h-44 bg-purple-600 rounded-full animate-[float-alt_14s_ease-in-out_infinite]"></div>
            <div className="absolute top-[70%] left-[60%] w-52 h-52 bg-purple-400 rounded-full animate-[float_18s_ease-in-out_infinite_0.7s]"></div>
            <div className="absolute bottom-[10%] left-[10%] w-40 h-40 bg-purple-300 rounded-full animate-[float-alt_17s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[15%] right-[10%] w-28 h-28 bg-purple-500 rotate-30 animate-[float-alt_12s_ease-in-out_infinite]"></div>
            <div className="absolute top-[15%] left-[70%] w-48 h-48 bg-purple-300 rounded-full animate-[float_19s_ease-in-out_infinite_1.2s]"></div>
        </div>
    );
}