// src/services/comment.service.ts
import type { Comment, CommentDTO, CommentResponse } from '@/types';

export const commentService = {
    async createComment(data: CommentDTO): Promise<CommentResponse> {
        return api.post('/comments', data);
    },

    async updateComment(id: number, data: CommentDTO): Promise<CommentResponse> {
        return api.put(`/comments/${id}`, data);
    },

    async deleteComment(id: number): Promise<void> {
        return api.delete(`/comments/${id}`);
    }
};