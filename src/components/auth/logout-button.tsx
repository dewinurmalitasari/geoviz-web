import {useNavigate} from '@tanstack/react-router';
import {clearAuthentication} from "@/util/auth.ts";
import GeoButton from "@/components/geo-button.tsx";
import {LogOut} from "lucide-react";
import {useState} from "react";
import DestructiveDialog from "@/components/destructive-dialog.tsx";

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
            <DestructiveDialog open={open} onOpenChange={setOpen} onDeleteCLick={onLogoutClick} isLogout={true}/>
            
            <GeoButton onClick={() => setOpen(true)} variant="destructive">
                <LogOut/> Keluar
            </GeoButton>
        </div>
    );
}
