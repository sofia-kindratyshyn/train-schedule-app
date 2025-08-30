import { Train } from "@/app/types/train";
import { nextServer } from "./api";

type LoginData = {
    email: string;
    password: string;
}

type RegisterData = {
    username: string;
    email: string;
    password_hash: string;
}

type GetTrainsResponse = {
    data: Train[];
    message: string;
    status: string;
}

export const login = async (data: LoginData) => {
    const res = await nextServer.post("/auth/login", data);
    return res.data;
}

export const register = async (data: RegisterData) => {
    const res = await nextServer.post("/auth/register", data);
    return res.data;
}

export const getTrains = async () =>{
    const res = await nextServer.get<GetTrainsResponse>("/trains");
    return res.data.data;
 }