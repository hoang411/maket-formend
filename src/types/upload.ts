// src/types/upload.ts
export interface UploadResponse {
    url: string;
    filename: string;
}

export interface FileUpload {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'success' | 'error';
    error?: string;
}