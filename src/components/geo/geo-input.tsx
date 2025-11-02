import {Field, FieldDescription, FieldLabel} from "@/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group.tsx";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

interface GeoInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    isPassword?: boolean;
    description?: string;
}

export default function GeoInput({id, label, value, onChange, icon, isPassword = false, description}: GeoInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Field>
            <FieldLabel htmlFor={id} className="font-bold text-md">{label}</FieldLabel>
            <InputGroup id={id}>
                <InputGroupInput
                    type={showPassword ? 'text' : isPassword ? 'password' : 'text'}
                    placeholder={`${label}...`}
                    value={value}
                    onChange={onChange}
                />
                {icon && (
                    <InputGroupAddon>
                        {icon}
                    </InputGroupAddon>
                )}

                {isPassword && (
                    <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff/> : <Eye/>}
                    </InputGroupButton>
                )}
            </InputGroup>
            {description && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}
        </Field>
    );
}