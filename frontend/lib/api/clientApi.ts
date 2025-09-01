import { Train } from "../../types/train";
import { nextServer } from "./api";
import { User } from "../../types/user";
import axios from "axios";

export type LoginData = {
    email: string;
    password: string;
}

type RegisterData = {
    username: string;
    email: string;
    password: string;
}

type GetTrainsResponse = {
    data: Train[];
    message: string;
    status: string;
}

type GetByIdTrainResponse = {
    data: Train;
    message: string;
    status: string;
}

export const login = async (data: LoginData) => {
    try {
        const res = await nextServer.post('/auth/login', data, { withCredentials: true });
        return res.data;
    } catch (err: any) {console.error("Login error:", err.response?.data || err.message);
  throw err; }
}

export const register = async (data: RegisterData) => {
  const res = await nextServer.post('/auth/register', data);
  return res.data;

}

export const getTrains = async () => {
    const res = await nextServer.get<GetTrainsResponse>("/trains");
    return res.data.data;
}
 
export const fetchTrainById = async (trainId: number) => {
    const res = await nextServer.get<GetByIdTrainResponse>(`/trains/${trainId}`);
    return res.data.data;
}

export const deleteTrain = async (trainId: number) => { 
    const res = await nextServer.delete<{ message: string; status: string }>(`/trains/${trainId}`);
    return res.data;
}

export const createTrain = async (payload: Train) => {
    const res = await nextServer.post<{ message: string; status: string, data: Train }>("/trains", payload);
    return res.data;
}

export const updateTrain = async (payload: Train, trainId: number) => { 
    const res = await nextServer.put<{ message: string; status: string, data: Train }>(`/trains/${trainId}`, payload);
    return res.data;
}

export const updateUser = async (username: string, email: string) => {
  const res = await nextServer.patch<{ message: string; status: string, data: User }>('/users', {username, email})
    return res.data.data;
}