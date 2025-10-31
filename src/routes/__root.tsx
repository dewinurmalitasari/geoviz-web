import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools'
import {TanStackDevtools} from '@tanstack/react-devtools'
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import Background from "@/components/background.tsx";
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
                            error: '!bg-gradient-to-r !from-red-600 !to-red-700 !text-white dark:!from-red-500 dark:!to-red-600',
                            success: '!bg-gradient-to-r !from-deep-purple-500 !to-deep-purple-700 !text-white',
                            warning: '!bg-gradient-to-r !from-geo-purple-400 !to-geo-purple-600 !text-white',
                            info: '!bg-gradient-to-r !from-geo-purple-100 !to-geo-purple-200 !text-deep-purple-700 dark:!from-deep-purple-600 dark:!to-deep-purple-500 dark:!text-geo-purple-50',
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
