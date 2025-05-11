import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = 'http://localhost:8080'

export const useDocsStore = defineStore('storeId', {
  state: () => ({
    contents: [],
  }),
  actions: {
    async uploadFile(payload) {
      try {
        const { data } = await axios.post('http://localhost:8080/', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log(payload)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
