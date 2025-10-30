export interface Auth {
    user: User,
    token: string,
}

export interface User {
    _id: string,
    username: string,
    role: 'admin' | 'student' | 'teacher',
}