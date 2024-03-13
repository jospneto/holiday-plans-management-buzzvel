import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/x.sdconecta.v1+json, application/json',
    'Content-Type': 'application/json',
  },
})
