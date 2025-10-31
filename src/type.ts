import {API_BASE_URL} from "@/config.ts";

// Route Protection\
export const PUBLIC_ROUTES = [
    '/login',
];

export const ROLE_PROTECTED_ROUTES = {
    '/users': ['admin', 'teacher'],
    '/practices': ['student'],
}

// Auth Types
export interface Auth {
    user: User,
    token: string,
}

export interface User {
    _id: string,
    username: string,
    role: 'admin' | 'student' | 'teacher',
}

// API Types and Endpoints
export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/login`,
    },
    // TODO : Add as needed
} as const;

export interface DeleteResponse {
    message: string,
}

export interface LoginPayload {
    username: string,
    password: string,
}

export interface LoginResponse {
    message: string,
    token: string,
    user: User,
}

// TODO:
//  - make sure that 401 and 403 responses are handled properly in all routes
//  - data loading with loaders
//  - tracking users sessions, material access, practice attempts
//  - 2d viz with equatrion, 2d and 3d viz with point
//  - security best practices
//  - performance optimizations
//  - animations and transitions between routes
