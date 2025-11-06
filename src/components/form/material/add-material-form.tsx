import MaterialDialog from "@/components/dialog/material-dialog.tsx";
import {useState} from "react";
import type {MaterialPayload} from "@/type.ts";
import {toast} from "sonner";
import {materialService} from "@/services/material-service.ts";
import he from "he";

interface AddMaterialFormProps {
    trigger: React.ReactNode;
    onSuccess: () => void;
}

export default function AddMaterialForm({trigger, onSuccess}: AddMaterialFormProps) {
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState<MaterialPayload>({
        title: '',
        description: '',
        formula: '',
        example: '',
        youtubeLinks: [],
        imageLinks: [],
    });

    const onAddClick = async () => {
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
            const data = await materialService.createMaterial(sanitizedValues);

            toast.success(`Materi "${he.decode(data.material.title)}" berhasil ditambahkan!`);
            setValues({
                title: '',
                description: '',
                formula: '',
                example: '',
                youtubeLinks: [],
                imageLinks: [],
            });
            onSuccess();
            setOpen(false);
        } catch (error) {
            toast.error('Gagal menambahkan: ' + (error as Error).message);
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
                onClick={onAddClick}
                trigger={trigger}
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    );
}