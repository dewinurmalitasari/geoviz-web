import {createRootRouteWithContext, notFound, Outlet, redirect} from '@tanstack/react-router'
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools'
import {TanStackDevtools} from '@tanstack/react-devtools'
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import Background from "@/components/background.tsx";
import {getAuthentication} from "@/util/auth.ts";
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import type {QueryClient} from '@tanstack/react-query'
import {Toaster} from "@/components/ui/sonner.tsx";
import {PUBLIC_ROUTES, ROLE_PROTECTED_ROUTES} from "@/type.ts";
import {NotFound} from "@/components/not-found.tsx";

interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    beforeLoad: ({location}) => {
        const auth = getAuthentication();

        // Define public routes
        const isPublicRoute = PUBLIC_ROUTES.some(route => location.pathname.startsWith(route));

        // Redirect unauthenticated users trying to access protected routes
        if (!auth && !isPublicRoute) {
            throw redirect({to: '/login'});
        }

        // Prevent authenticated users from accessing public routes
        if (auth && isPublicRoute) {
            throw redirect({to: '/'});
        }

        // Role-based access control
        for (const path in ROLE_PROTECTED_ROUTES) {
            if (location.pathname.startsWith(path)) {
                const allowedRoles = ROLE_PROTECTED_ROUTES[path as keyof typeof ROLE_PROTECTED_ROUTES];
                // @ts-ignore TS18047
                if (!allowedRoles.includes(auth.user.role)) {
                    throw notFound({data: {isRoleBased: true}});
                }
            }
        }

        return {auth};
    },
    component: () => {
        const {auth} = Route.useRouteContext();

        return (
            <div className="relative min-h-screen flex flex-col font-sans">
                <Background/>

                {auth &&
                    <Header username={auth.user.username} role={auth.user.role}/>
                }

                <div className="flex-grow h-full flex flex-col justify-center">
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
    },
    notFoundComponent: ({data}) => {
        // @ts-ignore TS2339
        if (data?.data.isRoleBased) {
            // Role-based 404 - render full layout
            const auth = getAuthentication();
            return (
                <div className="relative min-h-screen flex flex-col font-sans">
                    <Background/>

                    {auth &&
                        <Header username={auth.user.username} role={auth.user.role}/>
                    }

                    <div className="flex-grow h-full flex flex-col justify-center">
                        <NotFound/>
                    </div>

                    {auth &&
                        <Footer/>
                    }
                </div>
            );
        }

        // Normal 404 - just the component
        return <NotFound/>;
    },
})
