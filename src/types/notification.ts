// src/types/notification.ts
export interface Notification {
    id: number;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    createdAt: Date;
}

export type NotificationType = 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';