import axios from 'axios'

export const serverApi = axios.create({
  baseURL: 'https://train-schedule-app-yxl5.onrender.com/api',
  withCredentials: true,
})