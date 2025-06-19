import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER
const accessToken = localStorage.getItem('accessToken')

export const useAnalysisStore = defineStore('analysisStore', {
  state: () => ({
    payload: null,
    contents: null,
  }),
  actions: {
    async uploadAnalysis(payload) {
      try {
        const { data } = await axios.post(`${baseURL}zipsa/contracts/total-analysis`, payload, {
          params: {
            userId: localStorage.getItem('userId'),
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
