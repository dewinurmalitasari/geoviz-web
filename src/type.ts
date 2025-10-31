import {API_BASE_URL} from "@/config.ts";

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
//  - auth and protected routes
//  - make sure that 401 and 403 responses are handled properly in all routes
//  - Add proper token validation? but only on startup?
//  - data loading with loaders
//  - error routes (404, 500, etc)
//  - tracking user sessions, material access, practice attempts
//  - security best practices
//  - performance optimizations
//  - animations and transitions between routes
