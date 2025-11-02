import {KeyRound, LogIn, User} from 'lucide-react';
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import GeoInput from "@/components/geo/geo-input.tsx";

interface LoginProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onLoginClick: () => void;
    isLoading: boolean;
}

export function Login({username, setUsername, password, setPassword, onLoginClick, isLoading}: LoginProps) {

    return (
        <div>
            <GeoCard
                icon={<LogIn className="text-deep-purple-600 w-6 h-6"/>}
                title="Masuk ke GeoViz"
                content={
                    <div className="space-y-4">
                        <GeoInput
                            id="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={<User/>}
                        />

                        <GeoInput
                            id="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<KeyRound/>}
                            isPassword={true}
                        />
                    </div>
                }
                footer={
                    <GeoButton onClick={onLoginClick} variant="primary" isLoading={isLoading}>
                        <LogIn/> Masuk
                    </GeoButton>
                }
            />
        </div>
    );
}