import {useState} from "react";
import type {User} from "@/type.ts";
import {toast} from "sonner";
import {userService} from "@/services/user-service.ts";
import DestructiveDialog from "@/components/dialog/destructive-dialog.tsx";

interface DeleteUserFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User,
    onSuccess: () => void,
}

export default function DeleteUserForm({open, onOpenChange, user, onSuccess}: DeleteUserFormProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const onDeleteClick = async () => {

        setIsProcessing(true);
        try {
            await userService.deleteUser(user._id);
            toast.success(`Berhasil menghapus pengguna "${user.username}"`);
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
                item={`Pengguna "${user.username}"`}
            />
        </div>
    );
}