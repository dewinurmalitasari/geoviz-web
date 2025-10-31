import {Dialog, DialogClose, DialogContent, DialogFooter} from '@/components/ui/dialog';
import {Drawer, DrawerClose, DrawerContent, DrawerFooter} from '@/components/ui/drawer';
import {useIsMobile} from '@/hooks/use-mobile';
import GeoButton from "@/components/geo-button.tsx";
import {LogOut, Trash} from "lucide-react";
import GeoDialogHeader from "@/components/geo-dialog-header.tsx";
import GeoDrawerHeader from "@/components/geo-drawer-header.tsx";

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDeleteCLick: () => void;
    isProcessing?: boolean;
    item?: string;
    isLogout?: boolean;
}

export default function DestructiveDialog(
    {
        open,
        onOpenChange,
        onDeleteCLick,
        isProcessing = false,
        item = "",
        isLogout
    }: DeleteDialogProps) {
    const isMobile = useIsMobile();

    const content = (
        <div className="p-4 {isMobile ? 'text-center : ''}">
            <p>
                {isLogout ? 'Apakah Anda yakin ingin keluar dari akun ini?' : `Apakah Anda yakin ingin menghapus ${item} ini?`}
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
                        <DrawerClose asChild>
                            <GeoButton variant="destructive" onClick={onDeleteCLick} isLoading={isProcessing}>
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
                        </DrawerClose>
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
                    <DrawerClose asChild>
                        <GeoButton variant="destructive" onClick={onDeleteCLick} isLoading={isProcessing}
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
                    </DrawerClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}