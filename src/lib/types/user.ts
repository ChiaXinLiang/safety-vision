export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "operator" | "viewer";
    permissions: string[];
    lastLogin: Date;
}
