import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    contents: {
      isLogin: false,
    },
    statusCode: null,
  }),
  actions: {
    async userLogin(payload) {
      try {
        console.log(baseURL)
        const response = await axios.post(`${baseURL}zipsa/auth/login`, payload)

        this.contents = response.data.data
        this.statusCode = response.status
      } catch (err) {}
    },
    userLogout() {
      this.contents = {
        isLogin: false,
      }
      this.statusCode = null
    },
  },
  persist: true,
})
