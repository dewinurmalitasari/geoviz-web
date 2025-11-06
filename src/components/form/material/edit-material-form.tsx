import MaterialDialog from "@/components/dialog/material-dialog.tsx";
import {useEffect, useState} from "react";
import type {Material, MaterialPayload} from "@/type.ts";
import {toast} from "sonner";
import {materialService} from "@/services/material-service.ts";
import he from "he";

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
                title: he.encode(values.title),
                description: he.encode(values.description),
                formula: he.encode(values.formula),
                example: he.encode(values.example),
                youtubeLinks: values.youtubeLinks!.map(link => he.encode(link)),
                imageLinks: values.imageLinks!.map(link => he.encode(link)),
            };
            const data = await materialService.updateMaterial(material._id, sanitizedValues);

            toast.success(`Materi "${he.decode(data.material.title)}" berhasil diperbarui!`);
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