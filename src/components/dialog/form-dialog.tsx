import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from '@/components/ui/dialog.tsx';
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger} from '@/components/ui/drawer.tsx';
import {useIsMobile} from '@/hooks/use-mobile.ts';
import GeoButton from "@/components/geo/geo-button.tsx";
import {Pen, Plus, Trash} from "lucide-react";
import GeoDialogHeader from "@/components/geo/geo-dialog-header.tsx";
import GeoDrawerHeader from "@/components/geo/geo-drawer-header.tsx";

interface FormDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    isProcessing?: boolean;
    isEdit?: boolean;
    title: string;
    icon?: React.ReactNode;
    trigger?: React.ReactNode;
    children: React.ReactNode;
    onSubmit: () => void;
    onDelete?: () => void;
}

export default function FormDialog(
    {
        open,
        onOpenChange,
        isProcessing = false,
        isEdit = false,
        title,
        icon,
        trigger,
        children,
        onSubmit,
        onDelete,
    }: FormDialogProps) {
    const isMobile = useIsMobile();

    const defaultIcon = isEdit ?
        <Pen className="text-deep-purple-600 text-2xl"/> :
        <Plus className="text-deep-purple-600 text-2xl"/>;

    const content = (
        <div className="space-y-4 px-4 md:px-0">
            {children}
        </div>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger asChild>{trigger}</DrawerTrigger>
                <DrawerContent>
                    <GeoDrawerHeader icon={icon ?? defaultIcon} title={title}/>
                    {content}
                    <DrawerFooter className="pt-2 h-fit">
                        <DrawerClose asChild>
                            <GeoButton variant="outline" className="h-fit">Batal</GeoButton>
                        </DrawerClose>
                        {isEdit && onDelete && (
                            <GeoButton variant="destructive" onClick={onDelete} className="h-fit">
                                <Trash/> Hapus
                            </GeoButton>
                        )}
                        <GeoButton variant="primary" onClick={onSubmit} isLoading={isProcessing} className="h-fit">
                            {isEdit ? <><Pen/> Simpan</> : <><Plus/> Tambah</>}
                        </GeoButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="!max-w-2xl">
                <GeoDialogHeader icon={icon ?? defaultIcon} title={title}/>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <GeoButton variant="outline" className="w-full max-w-[25%]">Batal</GeoButton>
                    </DialogClose>
                    {isEdit && onDelete && (
                        <GeoButton variant="destructive" onClick={onDelete} className="w-full max-w-[25%]">
                            <Trash/> Hapus
                        </GeoButton>
                    )}
                    <GeoButton variant="primary" onClick={onSubmit} isLoading={isProcessing}
                               className="w-full max-w-[25%]">
                        {isEdit ? <><Pen/> Simpan</> : <><Plus/> Tambah</>}
                    </GeoButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
