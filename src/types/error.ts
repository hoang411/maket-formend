// src/types/error.ts
export interface ApiError {
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
}

export interface ValidationError {
    field: string;
    message: string;
}