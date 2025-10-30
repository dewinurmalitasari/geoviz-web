import {useState} from 'react';
import {Eye, EyeOff, KeyRound, LogIn, User} from 'lucide-react';
import GeoCard from "@/components/GeoCard.tsx";
import GeoButton from "@/components/GeoButton.tsx";
import {Field, FieldDescription, FieldLabel,} from "@/components/ui/field"
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput,} from "@/components/ui/input-group"

interface LoginProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onLoginClick: () => void;
    isLoading: boolean;
}

export function Login({username, setUsername, password, setPassword, onLoginClick, isLoading}: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <GeoCard
            icon={<LogIn className="text-deep-purple-600 w-6 h-6"/>}
            title="Masuk ke GeoViz"
            content={
                <div className="space-y-4">
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <InputGroup id="username">
                            <InputGroupInput
                                placeholder="Username..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputGroupAddon>
                                <User/>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldDescription></FieldDescription>
                    </Field>


                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputGroup id="password">
                            <InputGroupInput
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputGroupAddon>
                                <KeyRound/>
                            </InputGroupAddon>
                            <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff/> : <Eye/>}
                            </InputGroupButton>
                        </InputGroup>
                        <FieldDescription>This is for error.</FieldDescription>
                    </Field>
                </div>
            }
            buttons={
                <GeoButton
                    onClick={onLoginClick}
                    icon={<LogIn className="w-5 h-5 mr-2"/>}
                    text="Masuk"
                    variant="primary"
                    isLoading={isLoading}
                />
            }
        />
    );
}