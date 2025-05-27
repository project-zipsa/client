import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const userLoginStore = defineStore('loginStore', {
  state: () => ({
    contents: null,
    statusCode: null,
  }),
  actions: {
    async userLogin(payload) {
      try {
        const response = await axios.post(`${baseURL}/zipsa/auth/login`, payload)
        this.contents = response.data.data
        console.log(this.contents)
        this.statusCode = response.status
      } catch (err) {
        console.log(err)
      }
    },
  },
})
