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
        const { data } = await axios.post(`${baseURL}zipsa/clova/land-titles`, payload, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        this.contents = data
      } catch (err) {
        console.log(err)
      }
    },
    async uploadRegisterTest() {
      try {
        const result = await new Promise((resolve) => {
          setTimeout(() => {
            console.log('등기부등본 업로드 테스트')
            this.contents = true
            resolve(this.contents)
          }, 3000)
        })
        return result
      } catch (err) {
        console.log(err)
      }
    },
  },
})
