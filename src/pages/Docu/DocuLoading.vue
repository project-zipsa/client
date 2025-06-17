<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />

    <div class="flex flex-col justify-between items-center pt-48">
      <img src="@/assets/documentImg.svg" alt="" class="w-32" />
      <p>계약 분석 중 ...</p>
      <p class="font-light pt-12">
        내 계약의 주요 내용, 위험 요소, 해당할 수 있는 사기 유형을 분석하고 있어요.
      </p>
      <p class="font-light">잠시만 기다려 주세요</p>

      <div
        class="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <img
      src="@/assets/home1.png"
      alt=""
      class="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50 w-64"
    />
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import router from '@/router'
import { useAnalysisStore } from '@/stores/docs/analysis'
import { useContractStore } from '@/stores/docs/contract'
import { useRegisterStore } from '@/stores/docs/register'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const contractStore = useContractStore()
const registerStore = useRegisterStore()
const analysisStore = useAnalysisStore()
const contractPayload = contractStore.payload
const registerPayload = registerStore.payload
const analysisPayload = analysisStore.payload

onMounted(async () => {
  try {
    console.log(contractPayload, registerPayload, analysisPayload)
    await registerStore.uploadRegister(registerPayload)
    await contractStore.uploadContract(contractPayload)
    await analysisStore.uploadAnalysis(analysisPayload)
  } catch (e) {
    console.log(e)
  }
})
watch(
  () => [contractStore.contents, registerStore.contents, analysisStore.contents],
  ([contract, register, analysis]) => {
    console.log('watch:', contract, register, analysis)
    if (contract && register && analysis) {
      const end = performance.now()
      router.push('/docu/result')
    }
  },
)

const currentRoute = useRoute()
</script>
<style></style>
