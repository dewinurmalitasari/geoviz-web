import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from '@/components/ui/dialog.tsx';
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger} from '@/components/ui/drawer.tsx';
import {useIsMobile} from '@/hooks/use-mobile.ts';
import GeoButton from "@/components/geo/geo-button.tsx";
import {KeyRound, Pen, Plus, Trash, User2} from "lucide-react";
import GeoDialogHeader from "@/components/geo/geo-dialog-header.tsx";
import GeoDrawerHeader from "@/components/geo/geo-drawer-header.tsx";
import type {UserPayload} from "@/type.ts";
import GeoInput from "@/components/ui/geo-input.tsx";

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
    const isMobile = useIsMobile();

    const content = (
        <div className="space-y-4 px-4 md:px-0 py-4">
            <GeoInput
                id="username"
                label="Username"
                value={values.username??''}
                onChange={(e) => setValues({...values, username: e.target.value})}
                icon={<User2/>}
            />

            <GeoInput
                id="password"
                label={`${isEdit ? 'Password Baru' : 'Password'}`}
                value={values.password??''}
                onChange={(e) => setValues({...values, password: e.target.value})}
                icon={<KeyRound/>}
                description="Password harus terdiri dari minimal 8 karakter."
            />
        </div>
    )

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger asChild>
                    {trigger}
                </DrawerTrigger>
                <DrawerContent>
                    <GeoDrawerHeader
                        icon={isEdit ? <Pen className="text-deep-purple-600 text-2xl"/> :
                            <Plus className="text-deep-purple-600 text-2xl"/>}
                        title={isEdit ? `Edit ${toEditUsername}` : `Tambah Akun ${role?.translateRole()}`}
                    />
                    {content}
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <GeoButton variant="outline">Batal</GeoButton>
                        </DrawerClose>
                        {isEdit && (
                            <GeoButton variant="destructive" onClick={onDeleteClick}>
                                <Trash/> Hapus
                            </GeoButton>
                        )}
                        <GeoButton variant="primary" onClick={onClick} isLoading={isProcessing}>
                            {isEdit ? (
                                <>
                                    <Pen/> Simpan
                                </>
                            ) : (
                                <>
                                    <Plus/> Tambah
                                </>
                            )}
                        </GeoButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <GeoDialogHeader
                    icon={isEdit ? <Pen className="text-deep-purple-600 text-2xl"/> :
                        <Plus className="text-deep-purple-600 text-2xl"/>}
                    title={isEdit ? `Edit ${toEditUsername}` : `Tambah Akun ${role?.translateRole()}`}/>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <GeoButton variant="outline" className="w-full max-w-[25%]">Batal</GeoButton>
                    </DialogClose>
                    {isEdit && (
                        <GeoButton variant="destructive" onClick={onDeleteClick} className="w-full max-w-[25%]">
                            <Trash/> Hapus
                        </GeoButton>
                    )}
                    <GeoButton variant="primary" onClick={onClick} isLoading={isProcessing}
                               className="w-full max-w-[25%]">
                        {isEdit ? (
                            <>
                                <Pen/> Simpan
                            </>
                        ) : (
                            <>
                                <Plus/> Tambah
                            </>
                        )}
                    </GeoButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}