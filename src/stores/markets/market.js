import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useMarketStore = defineStore('marketStore', {
  state: () => ({
    contents: null,
    statusCode: null,
  }),
  actions: {
    async uploadMarket(payload) {
      try {
        const { data, status } = await axios.post(
          `${baseURL}zipsa/market-price/analysis`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        this.contents = data
        this.statusCode = status
      } catch (err) {
        console.log(err)
      }
    },
    reset() {
      this.contents = null
      this.statusCode = null
    },
  },
})
