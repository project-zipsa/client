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

      <p class="pt-12">로딩 애니메이션</p>
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
</script>
<style></style>
