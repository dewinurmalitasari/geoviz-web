import {useEffect, useState} from "react";
import type {Material, MaterialPayload} from "@/type.ts";
import {toast} from "sonner";
import {materialService} from "@/services/material-service.ts";
import MaterialDialog from "@/components/dialog/material-dialog.tsx";

interface EditMaterialFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    material: Material;
    onSuccess: () => void;
    onDeleteClick: () => void;
}

export default function EditMaterialForm({open, setOpen, material, onSuccess, onDeleteClick}: EditMaterialFormProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState<MaterialPayload>({
        title: material.title,
        description: material.description,
        formula: material.formula,
        example: material.example,
        youtubeLinks: material.youtubeLinks,
        imageLinks: material.imageLinks,
    });

    // Reset form values when material changes
    useEffect(() => {
        setValues({
            title: material.title,
            description: material.description,
            formula: material.formula,
            example: material.example,
            youtubeLinks: material.youtubeLinks,
            imageLinks: material.imageLinks,
        });
    }, [material]);

    const onEditClick = async () => {
        if (!values.title || !values.description || !values.formula || !values.example) {
            toast.error("Semua field harus diisi!");
            return;
        }

        setIsProcessing(true);
        try {
            const sanitizedValues = {
                ...values,
                title: values.title,
                description: values.description,
                formula: values.formula,
                example: values.example,
                youtubeLinks: values.youtubeLinks!.map(link => link),
                imageLinks: values.imageLinks!.map(link => link),
            };
            const data = await materialService.updateMaterial(material._id, sanitizedValues);

            toast.success(`Materi "${data.material.title}" berhasil diperbarui!`);
            onSuccess();
            setOpen(false);
        } catch (error) {
            toast.error('Gagal memperbarui: ' + (error as Error).message);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div>
            <MaterialDialog
                isProcessing={isProcessing}
                values={values}
                setValues={setValues}
                onClick={onEditClick}
                open={open}
                onOpenChange={setOpen}
                isEdit={true}
                toEditTitle={material.title}
                onDeleteClick={onDeleteClick}
            />
        </div>
    );
}