// src/types/comment.ts
export interface Comment {
    id: number;
    userId: number;
    user?: User;
    productId: number;
    product?: Product;
    content: string;
    star: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommentDTO {
    userId: number;
    productId: number;
    content: string;
    star: number;
}