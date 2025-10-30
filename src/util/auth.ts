import type {Auth, User} from "@/type.ts";

export function setAuthentication(_id: string, username: string, role: string, token: string): void {
    const user: User = {
        _id,
        username,
        role: role as 'admin' | 'student' | 'teacher',
    };
    const auth: Auth = {
        user,
        token,
    };
    localStorage.setItem('auth', JSON.stringify(auth));
}

export function getAuthentication(): Auth | null {
    const auth = localStorage.getItem('auth');
    if (auth) {
        return JSON.parse(auth) as Auth;
    }
    return null;
}

export function clearAuthentication(): void {
    localStorage.removeItem('auth');
}