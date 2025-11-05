import {API_BASE_URL} from "@/config.ts";

// Route Paths
export const ROUTES = {
    home: '/',
    auth: {
        login: '/login',
    },
    users: {
        base: '/users',
        userDetail: (userId: string) => `/users/${userId}`,
    },
    materials: {
        base: '/materials',
        materialDetail: (materialId: string) => `/materials/${materialId}`,
    },
    practices: {
        base: '/practices',
        practiceType: (practiceType: string) => `/practices/${practiceType}`,
        practiceResult: (practiceId: string) => `/practices/result/${practiceId}`,
    },
    visualizations: {
        base: '/visualizations',
        visualizationType: (visualizationType: string) => `/visualizations/${visualizationType}`,
    }
} as const;

// Route Protection
export const PUBLIC_ROUTES = [
    '/login',
];

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

// Visualization Types
export const VISUALIZATION_TYPES = {
    SHAPE_2D: 'shape2d',
    SHAPE_3D: 'shape3d',
    EQUATION: 'equation',
} as const;

export const TRANSFORMATION_TYPES = {
    TRANSLATION: 'translation',
    DILATATION: 'dilatation',
    ROTATION: 'rotation',
    REFLECTION: 'reflection',
} as const;

export interface TranslationValue {
    translateX: number;
    translateY: number;
    translateZ?: number; // Optional for 2D
}

export interface DilatationValue {
    scaleFactor: number;
}

export interface RotationValue {
    angle: number; // in degrees
    axis?: 'radio_x_axis' | 'radio_y_axis' | 'radio_z_axis'; // used for 3D rotation
}

export interface ReflectionValue {
    axis: 'origin' | 'x-axis' | 'y-axis' | 'line-y-x' | 'line-y-neg-x' | 'line-y-k' | 'line-x-k' | 'radio-xy-plane' | 'radio-yz-plane' | 'radio-xz-plane';
    k?: number; // used when axis is 'line-y-k' or 'line-x-k'
}

export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D extends Point2D {
    z: number;
}

export type Point = Point2D | Point3D;

// API Endpoints
export const API_ENDPOINTS = {
    auth: {
        login: `${API_BASE_URL}/login`,
    },
    users: {
        base: (role?: string) => `${API_BASE_URL}/users${role ? `?role=${role}` : ''}`,
        withId: (_id: string) => `${API_BASE_URL}/users/${_id}`,
    },
    materials: {
        base: `${API_BASE_URL}/materials`,
        // base: (noFormulaAndExample: boolean = false) => `${API_BASE_URL}/materials${noFormulaAndExample ? '?noFormulaAndExample=true' : ''}`,
        withId: (_id: string) => `${API_BASE_URL}/materials/${_id}`,
    },
    practices: {
        base: `${API_BASE_URL}/practices`,
        withId: (_id: string, noContent: boolean = false) => `${API_BASE_URL}/practices/user/${_id}${noContent ? '?noContent=true' : ''}`,
    },
    statistics: {
        base: `${API_BASE_URL}/statistics`,
        withId: (_id: string) => `${API_BASE_URL}/statistics/user/${_id}`,
        summaryWithId: (_id: string) => `${API_BASE_URL}/statistics/summary/user/${_id}`,
        progressWithId: (_id: string) => `${API_BASE_URL}/statistics/progress/user/${_id}`,
    }
} as const;

export interface DeleteResponse {
    message: string,
}

// Auth Types
export interface LoginPayload {
    username: string,
    password: string,
}

export interface LoginResponse {
    message: string,
    token: string,
    user: User,
}

// User Types
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

// Statistics Types
type VisitData = Record<string, never>; // No additional data needed for visits

interface MaterialAccessData {
    title: string;
    material: string; // This is ID
}

interface PracticeAttemptData {
    code: string;
}

interface PracticeCompletedData {
    code: string;
    practice: string; // This is ID
}

export type StatisticPayload =
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

export interface StatisticsProgress {
    totalMaterialsAvailable: number;
    totalMaterialsAccessed: number;
    totalPracticesAvailable: number
    totalPracticesCompleted: number;
    completionRateMaterials: number;
    completionRatePractices: number;
}

export interface StatisticProgressResponse {
    message: string;
    progress: StatisticsProgress;
}

export interface SummaryStatistics extends StatisticsProgress {
    totalVisits: number;
    totalPracticeAttempts: number;
    materialAccessCount: Record<string, number>;
    practiceCount: Record<string, PracticeCount>;
}

export interface StatisticsSummaryResponse {
    message: string;
    summary: SummaryStatistics;
}

// Practice Types
export interface PracticePayload {
    code: string,
    score: {
        correct: number,
        total: number,
    },
    content: any, // TODO: Define this later
}

export interface Practice {
    _id: string,
    code: string,
    score: {
        correct: number,
        total: number,
    },
    content?: any, // TODO: Define this later
    user: string, // This is user ID
    createdAt: string,
    updatedAt: string,
}

export interface PracticeResponse {
    message: string,
    practice: Practice,
}

export interface PracticesResponse {
    message: string,
    practices: Practice[],
}

// Material Types
export interface Material {
    _id: string,
    title: string,
    description: string,
    formula?: string,
    example?: string,
    createdAt: string,
    updatedAt: string,
}

export interface MaterialResponse {
    message: string,
    material: Material,
}

export interface MaterialsResponse {
    message: string,
    materials: Material[],
}

export interface MaterialPayload {
    title?: string,
    description?: string,
    formula?: string,
    example?: string,
}

// TODO:
//  - tracking users sessions, material access, practice attempts
//  - plotly performance tracking displayed below the plot and detailed
//  - security best practices
//  - performance optimizations like preloading routes
//  - table resize problem
