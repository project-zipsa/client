<template>
  <div class="bg-[#FFF9E3] px-16 py-16">
    <main class="grid grid-cols-[60%_35%] grid-rows-[40%_40%] gap-12">
      <div
        class="flex items-center justify-between px-6 bg-[#ffffff] rounded-xl shadow-md bg-opacity-60"
      >
        <div class="text-left">
          <div class="flex items-center gap-2 mb-4">
            <img src="@/assets/zipsa.svg" alt="" class="w-28 h-28 pb-6" />
            <h1 class="text-7xl font-bold text-yellow-500 pb-6 pt-4">ZIPSA</h1>
          </div>

          <p class="text-2xl font-bold text-gray-700 pb-3 pl-4">계약이 막막했다면 ?</p>
          <p class="text-2xl font-bold text-gray-700 pl-4">이젠 ZIPSA와 함께!</p>
        </div>
        <img src="@/assets/home1.png" alt="" class="w-48 h-auto" />
      </div>
      <div
        class="flex items-center justify-between px-6 py-10 bg-[#ffffff] rounded-xl shadow-md bg-opacity-60"
      >
        <div>
          <h1 class="text-3xl font-bold mb-2 pb-3">단어사전</h1>
          <p class="text-gray-700 text-xl mb-2">모르는 단어는 바로!</p>
          <router-link to="/dicts">
            <button class="text-500 font-semibold hover:underline">바로가기↗</button>
          </router-link>
        </div>
        <img src="@/assets/home2.png" alt="" class="w-60 h-auto" />
        <!-- component? -->
      </div>
      <div
        class="flex items-center justify-between px-6 py-10 bg-[#ffffff] rounded-xl shadow-md bg-opacity-60"
      >
        <div>
          <h1 class="text-3xl font-bold mb-2 pb-4">나의 계약 분석</h1>
          <p class="text-gray-700 text-xl pb-2">안전한 계약, 그 시작!</p>
          <router-link to="/docu/upload">
            <button class="text-500 font-semibold hover:underline pb-2">바로가기↗</button>
          </router-link>
          <p class="text-gray-700 text-xl pb-2">시세 정보? 여기에 다 있으니까!</p>
          <router-link to="/market/upload">
            <button class="text-500 font-semibold hover:underline">바로가기↗</button>
          </router-link>
        </div>

        <img src="@/assets/home3.png" alt="" class="w-60 h-auto self-start" />
      </div>
      <div
        class="flex items-center justify-between px-6 py-10 bg-[#ffffff] rounded-xl shadow-md bg-opacity-60"
      >
        <div>
          <h1 class="text-3xl font-bold mb-2 pb-2">체크 리스트</h1>
          <p class="text-gray-700 text-xl pb-2">나의 진행상황 꼼꼼하게!</p>
          <router-link to="/check">
            <button class="text-500 font-semibold hover:underline">바로가기↗</button>
          </router-link>
        </div>
        <img src="@/assets/home4.png" alt="" class="w-60 h-auto" />
      </div>
    </main>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const currentRoute = useRoute()
    return { currentRoute }
  },
}
</script>
<style></style>
