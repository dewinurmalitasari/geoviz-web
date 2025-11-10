import {createFileRoute, notFound} from '@tanstack/react-router'
import {getAuthentication} from "@/lib/auth.ts";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {PRACTICE_TYPES, type Reaction} from "@/type.ts";
import IdentifyPractice from "@/components/practice/identify-practice.tsx";
import DeterminePractice from "@/components/practice/determine-practice.tsx";
import {reactionService} from "@/services/reaction-service.ts";
import {ApiError} from "@/lib/api-client.ts";
import {useEffect, useState} from "react";

export const Route = createFileRoute('/practices/$practiceType')({
    beforeLoad: ({params}) => {
        // Check if practiceType is valid by comparing with PRACTICE_TYPES
        const validTypes = Object.values(PRACTICE_TYPES) as string[];
        if (!validTypes.includes(params.practiceType)) {
            throw new Error('Not Found');
        }
    },
    loader: async ({params}) => {
        const auth = getAuthentication();
        if (auth?.user.role !== "student") {
            throw notFound()
        }

        let reaction: Reaction | null = null;
        try {
            const reactionsResponse = await reactionService.getPracticeReaction(params.practiceType);
            reaction = reactionsResponse.reaction;
        } catch (error) {
            if (error instanceof ApiError && error.status === 404) {
                return {reaction: null};
            }
            throw error;
        }

        return {reaction};
    },
    component: RouteComponent,
    notFoundComponent: () => {
        return <ErrorPage
            status={404}
            statusText="Not Found"
            title="Halaman Tidak ditemukan"
            message="Halaman yang Anda cari tidak ditemukan."
        />;
    },
    errorComponent: ({error}) => {
        if (error.message === 'Not Found') {
            return (
                <ErrorPage
                    status={404}
                    statusText="Not Found"
                    title="Halaman Tidak ditemukan"
                    message="Halaman yang Anda cari tidak ditemukan."
                />
            )
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat visualisasi"
                message={error.message || "Gagal memuat visualisasi."}
            />
        );
    },
})

function RouteComponent() {
    const {practiceType} = Route.useParams()
    const {reaction} = Route.useLoaderData();

    const [reactionState, setReactionState] = useState<Reaction | null>(reaction || null);
    const [reactionLoading, setReactionLoading] = useState(false);

    const handleReactionSelect = async (selectedReaction: string) => {
        setReactionLoading(true);
        await reactionService.recordReaction({
            reaction: selectedReaction as 'happy' | 'neutral' | 'sad' | 'confused',
            type: 'practice',
            practiceCode: practiceType,
        }).then(response => {
            setReactionState(response.reaction);
        }).catch(error => {
            console.error("Error recording reaction:", error);
        });
        setReactionLoading(false);
    }

    // Reset all states when practiceType changes
    useEffect(() => {
        setReactionState(reaction || null);
        setReactionLoading(false);
    }, [practiceType, reaction]);

    // TODO: Update to render based on practiceType
    switch (practiceType) {
        case PRACTICE_TYPES.IDENTIFY:
            return <IdentifyPractice
                reactionState={reactionState}
                handleReactionSelect={handleReactionSelect}
                reactionLoading={reactionLoading}
            />
        case PRACTICE_TYPES.DETERMINE_VALUE:
            return <DeterminePractice
                reactionState={reactionState}
                handleReactionSelect={handleReactionSelect}
                reactionLoading={reactionLoading}
            />
        default:
            return null;
    }
}
