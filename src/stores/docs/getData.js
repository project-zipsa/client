import axios from 'axios'
import { defineStore } from 'pinia'

const baseURL = import.meta.env.VITE_API_SERVER

export const useDocsStore = defineStore('storeId', {
  state: () => ({
    contents: [],
  }),
  actions: {
    async uploadData(payload) {
      try {
        const { data } = await axios.post(`${baseURL}/zipsa`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.contents = data
        console.log('Data uploaded successfully:', data)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
