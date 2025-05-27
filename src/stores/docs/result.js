import { defineStore } from 'pinia'

export const useDocuStore = defineStore('docuStore', {
  state: () => ({
    contractResult: null,
    registerResult: null,
    analysisResult: null,
  }),
})
