import axios from "axios";

export const nextServer = axios.create({
    baseURL: 'process.env.NEXT_PUBLIC_API_URL',
    withCredentials: true,
})


export const postRequestForDeploy = async (url: string, data?: unknown) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data, { withCredentials: true });
    return res;
}