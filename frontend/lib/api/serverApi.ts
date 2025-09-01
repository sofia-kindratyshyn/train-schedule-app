import {  User } from "../../types/user"
import { nextServer } from "./api"
import { cookies } from 'next/headers'

export type userData = {
  username: string;
  email: string;
}


export const getUser = async () => {
  const res = await nextServer.get<User>('/users/me')
  return res.data
}

export const checkSession = async () => {
  const cookieStore = cookies()
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })
  return res
}

export const getCurrUser = async () => { 
  const res = await nextServer.get<userData>('/users/me')
  return res.data
}
