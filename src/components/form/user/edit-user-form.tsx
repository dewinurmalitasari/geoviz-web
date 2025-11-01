import UserDialog from "@/components/dialog/user-dialog.tsx";
import {useEffect, useState} from "react";
import type {User, UserPayload} from "@/type.ts";
import {toast} from "sonner";
import {userService} from "@/services/user-service.ts";

interface EditUserFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User,
    onSuccess: () => void,
    onDeleteClick: () => void,
}

export default function EditUserForm({open, onOpenChange, user, onSuccess, onDeleteClick}: EditUserFormProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState<UserPayload>({
        username: user.username,
    });

    // Reset form values when user changes
    useEffect(() => {
        setValues({
            username: user.username,
        });
    }, [user]);

    const onEditClick = async () => {
        if (!values.username) {
            toast.error("Username tidak boleh kosong!");
            return;
        }

        setIsProcessing(true);
        try {
            const data = await userService.updateUser(user._id, values);

            toast.success(`Pengguna "${data.user.username}" berhasil diperbarui!`);
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            toast.error('Gagal memperbarui: ' + (error as Error).message);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div>
            <UserDialog
                open={open}
                onOpenChange={onOpenChange}
                isProcessing={isProcessing}
                isEdit={true}
                toEditUsername={user?.username}
                values={values}
                setValues={setValues}
                onClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
        </div>
    );
}