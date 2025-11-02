import { api } from "@/lib/api-client.ts";
import {API_ENDPOINTS, type DeleteResponse, type MaterialPayload, type MaterialResponse, type MaterialsResponse} from "@/type.ts";

export const materialService = {
    getMaterials: (noFormulaAndExample: boolean = false): Promise<MaterialsResponse> => {
        return api.get<MaterialsResponse>(API_ENDPOINTS.materials.base(noFormulaAndExample));
    },

    getMaterial: (materialId: string): Promise<MaterialResponse> => {
        return api.get<MaterialResponse>(API_ENDPOINTS.materials.withId(materialId));
    },

    createMaterial: (materialData: MaterialPayload): Promise<MaterialResponse> => {
        return api.post<MaterialResponse>(API_ENDPOINTS.materials.base(), materialData);
    },

    updateMaterial: (materialId: string, materialData: MaterialPayload): Promise<MaterialResponse> => {
        return api.put<MaterialResponse>(API_ENDPOINTS.materials.withId(materialId), materialData);
    },

    deleteMaterial: (materialId: string): Promise<DeleteResponse> => {
        return api.delete<DeleteResponse>(API_ENDPOINTS.materials.withId(materialId));
    },
};