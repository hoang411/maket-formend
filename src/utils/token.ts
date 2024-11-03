import { jwtDecode } from 'jwt-decode';
import type { User } from '@/types/user.types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

interface JwtPayload {
    sub: string;
    exp: number;
    iat: number;
    user: User;
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function isTokenValid(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch {
        return false;
    }
}

export function getUserFromToken(): User | null {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.user;
    } catch {
        return null;
    }
}

export function getTokenExpirationDate(token: string): Date | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    } catch {
        return null;
    }
}

export function isTokenExpired(): boolean {
    const token = getToken();
    if (!token) return true;

    return !isTokenValid(token);
}

export function getTokenRemainingTime(): number {
    const token = getToken();
    if (!token) return 0;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Date.now() / 1000;

        return Math.max(0, decoded.exp - currentTime);
    } catch {
        return 0;
    }
}