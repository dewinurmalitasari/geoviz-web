import {FileText, User2} from "lucide-react";
import type {MaterialPayload} from "@/type.ts";
import GeoInput from "@/components/geo/geo-input.tsx";
import FormDialog from "@/components/dialog/form-dialog.tsx";

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

    // TODO
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
            <GeoInput
                id="title"
                label="Judul"
                value={values.title ?? ''}
                onChange={(e) => setValues({...values, title: e.target.value})}
                icon={"TODO"}
            />
        </FormDialog>
    );
}