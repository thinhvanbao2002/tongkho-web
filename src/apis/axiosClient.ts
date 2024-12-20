/* eslint-disable no-console */
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import LocalStorage from './localStorage'
const API_URL = import.meta.env.VITE_API_URL

export const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

AxiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = LocalStorage.getToken()

  const newConfig = { ...config }
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
    // config.headers.token = `${token}`;
  }

  if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig

  if (config.params) {
    newConfig.params = config.params
  }
  if (config.data) {
    newConfig.data = config.data
  }

  return newConfig
})

AxiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
