import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <img src="logo512.png" alt="logo"/>
            Test
        </div>
    )
}
