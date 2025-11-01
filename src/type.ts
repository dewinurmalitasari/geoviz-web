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
    login: `${API_BASE_URL}/login`,
    users: `${API_BASE_URL}/users`,
    materials: `${API_BASE_URL}/materials`,
    practices: `${API_BASE_URL}/practices`,
    statistics: `${API_BASE_URL}/statistics`,
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

export interface UsersResponse {
    message: string,
    users: User[],
}

export interface UserResponse {
    message: string,
    user: User,
}

export interface UserPayload {
    username: string,
    password: string,
    role: 'student' | 'teacher',
}

// TODO:
//  - data loading with loaders
//  - tracking users sessions, material access, practice attempts
//  - 2d viz with equatrion, 2d and 3d viz with point
//  - security best practices
//  - performance optimizations like preloading routes
//  - animations and transitions between routes
