import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const useJoinStore = defineStore('joinStore', {
  state: () => ({
    contents: null,
    statusCode: null,
  }),
  actions: {
    async userJoin(payload) {
      try {
        const response = await axios.post(`${baseURL}zipsa/auth/signup`, payload)
        this.contents = response.data
        this.statusCode = response.status
      } catch (err) {
        console.log(err)
      }
    },
  },
})
