import {Dialog, DialogClose, DialogContent, DialogFooter} from '@/components/ui/dialog.tsx';
import {Drawer, DrawerClose, DrawerContent, DrawerFooter} from '@/components/ui/drawer.tsx';
import {useIsMobile} from '@/hooks/use-mobile.ts';
import GeoButton from "@/components/geo/geo-button.tsx";
import {LogOut, Trash} from "lucide-react";
import GeoDialogHeader from "@/components/geo/geo-dialog-header.tsx";
import GeoDrawerHeader from "@/components/geo/geo-drawer-header.tsx";

interface DestructiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleteClick: () => void;
    isProcessing?: boolean;
    item?: string;
    isLogout?: boolean;
}

export default function DestructiveDialog(
    {
        open,
        onOpenChange,
        onDeleteClick,
        isProcessing = false,
        item = "",
        isLogout
    }: DestructiveDialogProps) {
    const isMobile = useIsMobile();

    const content = (
        <div className="text-center px-4 text-lg">
            <p>
                {isLogout ? 'Apakah Anda yakin ingin keluar dari akun ini?' : `Apakah Anda yakin ingin menghapus`}
                <br/>
                {item && <span className="font-semibold"> {item}? </span>}
            </p>
            {!isLogout &&
                <p className="mt-2 text-sm text-gray-500">
                    Tindakan ini tidak dapat dibatalkan.
                </p>
            }
        </div>
    )

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <GeoDrawerHeader
                        icon={isLogout ? <LogOut className="text-deep-purple-600 text-2xl"/> :
                            <Trash className="text-deep-purple-600 text-2xl"/>}
                        title={isLogout ? 'Keluar dari Akun' : 'Hapus Item'}
                    />
                    {content}
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <GeoButton variant="outline">Batal</GeoButton>
                        </DrawerClose>
                        <GeoButton variant="destructive" onClick={() => {
                            onDeleteClick()
                            if (isLogout) onOpenChange(false)
                        }} isLoading={isProcessing}>
                            {isLogout ? (
                                <>
                                    <LogOut/> Keluar
                                </>
                            ) : (
                                <>
                                    <Trash/> Hapus
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
            <DialogContent>
                <GeoDialogHeader
                    icon={isLogout ? <LogOut className="text-deep-purple-600 text-2xl"/> :
                        <Trash className="text-deep-purple-600 text-2xl"/>}
                    title={isLogout ? 'Keluar dari Akun' : 'Hapus Item'}/>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <GeoButton variant="outline" className="w-full max-w-[20%]">Batal</GeoButton>
                    </DialogClose>
                    <GeoButton variant="destructive" onClick={() => {
                        onDeleteClick()
                        if (isLogout) onOpenChange(false)
                    }} isLoading={isProcessing}
                               className="w-full max-w-[20%]">
                        {isLogout ? (
                            <>
                                <LogOut/> Keluar
                            </>
                        ) : (
                            <>
                                <Trash/> Hapus
                            </>
                        )}
                    </GeoButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}