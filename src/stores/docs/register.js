import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useRegisterStore = defineStore('registerStore', {
  state: () => ({
    contents: null,
  }),
  actions: {
    async uploadRegister(payload) {
      try {
        console.log('Uploading land titles...')
        for (let [key, value] of payload.entries()) {
          console.log(`${key}:`, value)
        }
        const { data } = await axios.post(`${baseURL}zipsa/clova/land-titles`, payload, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        this.contents = data
        console.log('Land titles uploaded successfully:', data)
      } catch (err) {
        console.log(err)
      }
    },
    reset() {
      this.contents = null
    },
  },
})
