import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    payload: null,
    contents: null,
  }),
  actions: {
    async uploadRegister(payload) {
      try {
        const { data } = await axios.post(`${baseURL}zipsa/clova/land-titles`, payload, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        this.contents = data
      } catch (err) {
        console.log(err)
      }
    },
    reset() {
      this.contents = null
      this.payload = null
    },
  },
})
