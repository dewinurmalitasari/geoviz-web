import {api} from "@/lib/api-client.ts";
import {
    API_ENDPOINTS,
    type PracticeResponse,
    type PracticePayload,
    type PracticesResponse,
} from "@/type.ts";

export const practicesService = {
    recordPractice: (practiceData: PracticePayload): Promise<PracticeResponse> => {
        return api.post<PracticeResponse>(API_ENDPOINTS.practices.base, practiceData);
    },

    getPractices: (userId: string, noContent: boolean = false): Promise<PracticesResponse> => {
        return api.get<PracticesResponse>(API_ENDPOINTS.practices.withId(userId, noContent));
    },
};