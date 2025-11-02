import {useState} from "react";
import type {Material} from "@/type.ts";
import {toast} from "sonner";
import {materialService} from "@/services/material-service.ts";
import DestructiveDialog from "@/components/dialog/destructive-dialog.tsx";

interface DeleteMaterialFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    material: Material,
    onSuccess: () => void,
}

export default function DeleteMaterialForm({open, onOpenChange, material, onSuccess}: DeleteMaterialFormProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const onDeleteClick = async () => {

        setIsProcessing(true);
        try {
            await materialService.deleteMaterial(material._id);
            toast.success(`Berhasil menghapus materi "${material.title}"`);
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            toast.error('Gagal menghapus: ' + (error as Error).message);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div>
            <DestructiveDialog
                open={open}
                onOpenChange={onOpenChange}
                onDeleteClick={onDeleteClick}
                isProcessing={isProcessing}
                item={`Materi "${material.title}"`}
            />
        </div>
    );
}