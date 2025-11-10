import { api } from "@/lib/api-client.ts";
import {
    API_ENDPOINTS,
    type ReactionResponse,
    type ReactionPayload,
    type ReactionsResponse,
    type DeleteResponse
} from "@/type.ts";

export const reactionService = {
    recordReaction: (reactionData: ReactionPayload): Promise<ReactionResponse> => {
        return api.post<ReactionResponse>(API_ENDPOINTS.reactions.base, reactionData);
    },

    getUserReactions: (userId: string): Promise<ReactionsResponse> => {
        return api.get<ReactionsResponse>(API_ENDPOINTS.reactions.withUserId(userId));
    },

    getMaterialReaction: (materialId: string): Promise<ReactionResponse> => {
        return api.get<ReactionResponse>(API_ENDPOINTS.reactions.withMaterialId(materialId));
    },

    getPracticeReaction: (practiceId: string): Promise<ReactionResponse> => {
        return api.get<ReactionResponse>(API_ENDPOINTS.reactions.withPracticeId(practiceId));
    },

    deleteMaterialReaction: (materialId: string): Promise<DeleteResponse> => {
        return api.delete<DeleteResponse>(API_ENDPOINTS.reactions.withMaterialId(materialId));
    },

    deletePracticeReaction: (practiceId: string): Promise<DeleteResponse> => {
        return api.delete<DeleteResponse>(API_ENDPOINTS.reactions.withPracticeId(practiceId));
    },
};