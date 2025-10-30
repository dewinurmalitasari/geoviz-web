import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools'
import {TanStackDevtools} from '@tanstack/react-devtools'
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import Background from "@/components/Background.tsx";
import {getAuthentication} from "@/util/auth.ts";
import type {Auth} from "@/type.ts";

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type {QueryClient} from '@tanstack/react-query'

interface MyRouterContext {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => {
        const auth: Auth | null = getAuthentication();

        return (
            <div className="relative min-h-screen flex flex-col font-sans">
                <Background/>

                {auth &&
                    <Header username={auth?.user.username}/>
                }

                <div className="flex-grow">
                    <Outlet/>
                </div>

                {auth &&
                    <Footer/>
                }

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
