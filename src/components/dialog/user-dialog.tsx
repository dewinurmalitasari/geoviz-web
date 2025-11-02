import {KeyRound, User2} from "lucide-react";
import type {UserPayload} from "@/type.ts";
import GeoInput from "@/components/geo/geo-input.tsx";
import FormDialog from "@/components/dialog/form-dialog.tsx";

interface UserDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    isProcessing?: boolean;
    isEdit?: boolean;
    toEditUsername?: string;
    values: UserPayload
    setValues: (values: UserPayload) => void;
    onClick: () => void;
    onDeleteClick?: () => void;
    trigger?: React.ReactNode;
    role?: 'teacher' | 'student';
}

export default function UserDialog(
    {
        open,
        onOpenChange,
        isProcessing = false,
        isEdit = false,
        toEditUsername,
        values,
        setValues,
        onClick,
        onDeleteClick,
        trigger,
        role
    }: UserDialogProps) {

    return (
        <FormDialog
            open={open}
            onOpenChange={onOpenChange}
            isProcessing={isProcessing}
            isEdit={isEdit}
            title={isEdit ? `Edit ${toEditUsername}` : `Tambah Akun ${role === 'teacher' ? 'Guru' : 'Siswa'}`}
            icon={<User2/>}
            onSubmit={onClick}
            onDelete={onDeleteClick}
            trigger={trigger}
        >
            <GeoInput
                id="username"
                label="Username"
                value={values.username??''}
                onChange={(e) => setValues({...values, username: e.target.value})}
                icon={<User2/>}
                description="Username harus unik dan terdiri dari minimal 3 karakter."
            />
            <GeoInput
                id="password"
                label="Password"
                value={values.password??''}
                onChange={(e) => setValues({...values, password: e.target.value})}
                icon={<KeyRound/>}
                description={isEdit ? "Kosongkan jika tidak ingin mengubah password." : "Password harus terdiri dari minimal 8 karakter."}
            />
        </FormDialog>
    );
}