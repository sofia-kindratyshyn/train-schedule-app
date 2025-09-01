export type User = {
    username: string,
    password_hash: string,
    email: string
}

export type UpdateUserData = {
    username: string;
    email?: string;
    password_hash?: string;
}