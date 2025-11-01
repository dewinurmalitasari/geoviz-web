import {useNavigate} from '@tanstack/react-router';
import {clearAuthentication} from "@/lib/auth.ts";
import GeoButton from "@/components/geo/geo-button.tsx";
import {LogOut} from "lucide-react";
import {useState} from "react";
import DestructiveDialog from "@/components/dialog/destructive-dialog.tsx";

export default function LogoutButton() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const onLogoutClick = () => {
        clearAuthentication();
        setTimeout(() => {
            navigate({to: '/login'});
        }, 300); // 300ms delay for better UX
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
