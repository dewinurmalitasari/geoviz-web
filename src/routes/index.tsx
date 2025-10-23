import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: ({ context }) => {
        // TODO: implement real authentication check
        console.log('Loading the root route', context)

        if (context.user === null) {
            return redirect({ to: '/login' })
        }

        console.log('User is authenticated:', context.user)
    },
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
