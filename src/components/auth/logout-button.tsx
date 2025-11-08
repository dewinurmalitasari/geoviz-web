import {clearAuthentication} from "@/lib/auth.ts";
import GeoButton from "@/components/geo/geo-button.tsx";
import {LogOut} from "lucide-react";
import {useState} from "react";
import DestructiveDialog from "@/components/dialog/destructive-dialog.tsx";
import {useAnimatedNavigation} from "@/hooks/use-animated-navigation.ts";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);
    const animatedNavigate = useAnimatedNavigation();

    const onLogoutClick = () => {
        clearAuthentication();
        sessionStorage.removeItem('visit-recorded'); // TODO: Remove this if want to track only tab
        animatedNavigate({to: '/login'}, false);
    };

    return (
        <div>
            <DestructiveDialog open={open} onOpenChange={setOpen} onDeleteClick={onLogoutClick} isLogout={true}/>

            <GeoButton onClick={() => setOpen(true)} variant="destructive">
                <LogOut/> Keluar
            </GeoButton>
        </div>
    );
}
