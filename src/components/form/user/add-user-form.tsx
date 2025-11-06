import UserDialog from "@/components/dialog/user-dialog.tsx";
import {useState} from "react";
import type {UserPayload} from "@/type.ts";
import {toast} from "sonner";
import {userService} from "@/services/user-service.ts";
import he from "he";

interface AddUserFormProps {
    trigger: React.ReactNode
    role: 'teacher' | 'student'
    onSuccess: () => void
}

export default function AddUserForm({trigger, role, onSuccess}: AddUserFormProps) {
    const [open, setOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState<UserPayload>({
        username: '',
        password: '',
        role: role,
    });

    const onAddClick = async () => {
        if (!values.username || !values.password) {
            toast.error("Username dan password harus terisi!");
            return;
        }

        setIsProcessing(true);
        try {
            const sanitizedValues = {
                ...values,
                username: he.encode(values.username),
            };
            const data = await userService.createUser(sanitizedValues);

            toast.success(`Pengguna "${he.decode(data.user.username)}" berhasil ditambahkan!`);
            setValues({
                username: '',
                password: '',
                role: role,
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
            <UserDialog
                isProcessing={isProcessing}
                values={values}
                setValues={setValues}
                onClick={onAddClick}
                trigger={trigger}
                role={role}
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    );
}