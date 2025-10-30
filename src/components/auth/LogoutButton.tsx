import {useNavigate} from '@tanstack/react-router';
import {clearAuthentication} from "@/util/auth.ts";
import GeoButton from "@/components/GeoButton.tsx";
import {LogOut} from "lucide-react";

export default function LogoutButton() {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        clearAuthentication();
        setTimeout(() => {
            navigate({to: '/login'});
        }, 300); // 300ms delay for better UX
    };

    // TODO: Maybe add confirmation dialog?
    return (
        <GeoButton
            onClick={onLogoutClick}
            text="Keluar"
            icon={<LogOut />}
            variant="destructive"
        />
    );
}
