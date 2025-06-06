import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const userInfoStore = defineStore('userInfoStore', {
  state: () => ({
    contents: null,
    statusCode: null,
  }),
  actions: {
    async getUser(payload) {
      try {
        const response = await axios.get(`${baseURL}zipsa/auth`, {
          params: {
            loginId: payload.loginId,
          },
        })

        this.contents = response.data
      } catch (err) {
        console.log(err)
      }
    },
  },
})
