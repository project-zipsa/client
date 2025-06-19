import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useContractStore = defineStore('contractStore', {
  state: () => ({
    payload: null,
    contents: null,
  }),
  actions: {
    async uploadContract(payload) {
      try {
        const { data } = await axios.post(`${baseURL}zipsa/clova/lease-contracts`, payload, {
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
