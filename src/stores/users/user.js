import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const useInfoStore = defineStore('userInfoStore', {
  state: () => ({
    contents: null,
    statusCode: null,
  }),
  actions: {
    async getUser(payload) {
      try {
        const { data } = await axios.get(`${baseURL}zipsa/auth`, {
          params: {
            loginId: payload.loginId,
          },
        })

        this.contents = data.data
      } catch (err) {
        console.log(err)
      }
    },
    resetUser() {
      this.contents = null
      this.statusCode = null
    },
  },
  persist: true,
})
