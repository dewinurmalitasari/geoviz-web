import {FileText, Type} from "lucide-react";
import type {MaterialPayload} from "@/type.ts";
import GeoInput from "@/components/geo/geo-input.tsx";
import FormDialog from "@/components/dialog/form-dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

interface MaterialDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    isProcessing?: boolean;
    isEdit?: boolean;
    toEditTitle?: string;
    values: MaterialPayload
    setValues: (values: MaterialPayload) => void;
    onClick: () => void;
    onDeleteClick?: () => void;
    trigger?: React.ReactNode;
}

export default function MaterialDialog(
    {
        open,
        onOpenChange,
        isProcessing = false,
        isEdit = false,
        toEditTitle,
        values,
        setValues,
        onClick,
        onDeleteClick,
        trigger,
    }: MaterialDialogProps) {

    return (
        <FormDialog
            open={open}
            onOpenChange={onOpenChange}
            isProcessing={isProcessing}
            isEdit={isEdit}
            title={isEdit ? `Edit ${toEditTitle}` : 'Tambah Materi'}
            icon={<FileText/>}
            onSubmit={onClick}
            onDelete={onDeleteClick}
            trigger={trigger}
        >
            <ScrollArea className="h-[50vh] pr-2">
                <div className="space-y-4 p-1">
                    <GeoInput
                        id="title"
                        label="Judul"
                        value={values.title ?? ''}
                        onChange={(e) => setValues({...values, title: e.target.value})}
                        icon={<Type/>}
                    />

                    <GeoInput
                        id="description"
                        label="Deskripsi"
                        value={values.description ?? ''}
                        onChange={(e) => setValues({...values, description: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />

                    <GeoInput
                        id="formula"
                        label="Rumus"
                        value={values.formula ?? ''}
                        onChange={(e) => setValues({...values, formula: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />

                    <GeoInput
                        id="example"
                        label="Contoh"
                        value={values.example ?? ''}
                        onChange={(e) => setValues({...values, example: e.target.value})}
                        multiline
                        minRows={3}
                        maxRows={15}
                    />
                </div>
            </ScrollArea>
        </FormDialog>
    );
}