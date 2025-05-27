import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useMarketStore = defineStore('marketStore', {
  state: () => ({
    contents: null,
  }),
  actions: {
    async uploadMarket(payload) {
      try {
        const { data } = await axios.post(`${baseURL}zipsa/market-price/analysis`, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log('uploadMarket data', data)
        this.contents = data
      } catch (err) {
        console.log(err)
      }
    },
  },
})
