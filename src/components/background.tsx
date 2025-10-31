export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none -z-10">
            <div className="absolute top-5 left-10 w-64 h-64 bg-purple-500 rounded-full animate-pulse [animation-delay:0ms]"></div>
            <div className="absolute top-10 left-200 w-64 h-64 bg-purple-500 rounded-full animate-pulse [animation-delay:0ms]"></div>
            <div className="absolute top-10 right-10 w-48 h-48 bg-purple-400 rounded-full animate-pulse [animation-delay:200ms]"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-300 rounded-full animate-pulse [animation-delay:400ms]"></div>
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-600 rotate-45 animate-pulse [animation-delay:600ms]"></div>
            <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-purple-500 rounded-full animate-pulse [animation-delay:800ms]"></div>
            <div className="absolute top-1/4 left-1/3 w-36 h-36 bg-purple-400 rotate-12 animate-pulse [animation-delay:1000ms]"></div>
            <div className="absolute bottom-1/4 right-1/3 w-44 h-44 bg-purple-600 rounded-full animate-pulse [animation-delay:300ms]"></div>
            <div className="absolute top-2/3 left-2/3 w-52 h-52 bg-purple-400 rounded-full animate-pulse [animation-delay:500ms]"></div>
            <div className="absolute top-3/4 left-1/2 w-28 h-28 bg-purple-500 rotate-30 animate-pulse [animation-delay:700ms]"></div>
        </div>
    );
}