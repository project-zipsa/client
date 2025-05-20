<template>
  <div class="bg-[#FFF9E3] w-full">
    <MainHeaderComponent />

    <div class="flex flex-col justify-between items-center pt-48">
      <img src="@/assets/documentImg.svg" alt="" class="w-32" />
      <p class="font-bold text-3xl pt-10">분석 중 ...</p>
      <p class="font-light pt-12 text-xl">시세정보 분석중</p>
      <p class="font-light text-xl">잠시만 기다려 주세요</p>

      <div class="flex justify-center items-center h-32">
        <div
          class="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
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
import { useMarketStore } from '@/stores/markets/market'
import { watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const marketStore = useMarketStore()
console.log('result', marketStore.contents)

watch(
  () => marketStore.contents,
  (val) => {
    if (val && val.data) {
      router.push('/market/result')
    }
  },
  { immediate: true }, // 필요시 바로 실행
)
const currentRoute = useRoute()
</script>
<style></style>
