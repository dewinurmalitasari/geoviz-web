import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools'
import {TanStackDevtools} from '@tanstack/react-devtools'
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import Background from "@/components/Background.tsx";
import {getAuthentication} from "@/util/auth.ts";
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type {QueryClient} from '@tanstack/react-query'
import {Toaster} from "@/components/ui/sonner.tsx";

interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: () => {
        const auth = getAuthentication();
        return {
            auth
        }
    },
    component: () => {
        const {auth} = Route.useRouteContext();

        return (
            <div className="relative min-h-screen flex flex-col font-sans">
                <Background/>

                {auth &&
                    <Header username={auth.user.username} role={auth.user.role}/>
                }

                <div className="flex-grow">
                    <Outlet/>
                </div>

                {auth &&
                    <Footer/>
                }

                <Toaster
                    position="top-center"
                    toastOptions={{
                        classNames: {
                            error: '!bg-destructive !text-white',
                            success: '!bg-green-500 !text-white dark:!bg-green-600',
                            warning: '!bg-yellow-500 !text-white dark:!bg-yellow-600',
                            info: '!bg-primary !text-primary-foreground',
                        },
                    }}
                />

                {/*TODO: Remove*/}
                <TanStackDevtools
                    config={{
                        position: 'bottom-right',
                    }}
                    plugins={[
                        {
                            name: 'Tanstack Router',
                            render: <TanStackRouterDevtoolsPanel/>,
                        },
                        TanStackQueryDevtools,
                    ]}
                />
            </div>
        );
    }
})
