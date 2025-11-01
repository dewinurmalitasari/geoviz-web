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
    users: {
        base: `${API_BASE_URL}/users`,
        withRole: (role: string) => `${API_BASE_URL}/users/?roles=${role}`,
        withId: (_id: string) => `${API_BASE_URL}/users/${_id}`,
    },
    materials: `${API_BASE_URL}/materials`,
    practices: `${API_BASE_URL}/practices`,
    statistics: {
        base: `${API_BASE_URL}/statistics`,
        withId: (_id: string) => `${API_BASE_URL}/statistics/user/${_id}`,
        summaryWithId: (_id: string) => `${API_BASE_URL}/statistics/summary/user/${_id}`,
    }
} as const;

export interface DeleteResponse {
    message: string,
}

// Auth
export interface LoginPayload {
    username: string,
    password: string,
}

export interface LoginResponse {
    message: string,
    token: string,
    user: User,
}

// Users
export interface UsersResponse {
    message: string,
    users: User[],
}

export interface UserResponse {
    message: string,
    user: User,
}

export interface UserPayload {
    username?: string,
    password?: string,
    role?: 'student' | 'teacher',
}

// Statistics
type VisitData = Record<string, never>;

interface MaterialAccessData {
    material: string; // This is ID
}

interface PracticeAttemptData {
    code: string;
}

interface PracticeCompletedData {
    code: string;
    practice: string; // This is ID
}

export type StatisticsPayload =
    | { type: 'visits'; data: VisitData }
    | { type: 'material_access'; data: MaterialAccessData }
    | { type: 'practice_attempt'; data: PracticeAttemptData }
    | { type: 'practice_completed'; data: PracticeCompletedData };

interface BaseStatistic {
    _id: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}

type Statistic =
    | (BaseStatistic & { type: 'visits'; data: VisitData })
    | (BaseStatistic & { type: 'material_access'; data: MaterialAccessData })
    | (BaseStatistic & { type: 'practice_attempt'; data: PracticeAttemptData })
    | (BaseStatistic & { type: 'practice_completed'; data: PracticeCompletedData });

export interface StatisticResponse {
    message: string;
    statistic: Statistic;
}

export interface StatisticsResponse {
    message: string;
    statistics: Statistic[];
}

interface PracticeCount {
    attempted: number;
    completed: number;
}

export interface StatisticsSummaryResponse {
    message: string;
    summary: {
        totalVisits: number;
        totalMaterialsUnique: number;
        totalMaterialsAccessed: number;
        totalPracticesUnique: number;
        totalPracticeAttempts: number;
        totalPracticesCompleted: number;
        materialAccessCount: Record<string, number>;
        practiceCount: Record<string, PracticeCount>;
    };
}


// TODO:
//  - data loading with loaders
//  - tracking users sessions, material access, practice attempts
//  - 2d viz with equatrion, 2d and 3d viz with point
//  - security best practices
//  - performance optimizations like preloading routes
//  - animations and transitions between routes
//  - scrollbar?
