<template>
  <div class="bg-[#FDFDE4] min-h-screen">
    <main class="flex flex-col items-center text-center py-12 px-12">
      <h1 class="pt-14 pb-6 text-5xl font-light">전세 사기 체크리스트</h1>
      <p class="text-lg text-gray-600 pb-12 font-light">
        계약 전, 진행 중, 후 체크리스트를 통해 안전하게 계약을 진행하세요.
      </p>

      <div class="flex flex-wrap justify-center pb-20">
        <div class="p-3">
          <section
            class="w-[400px] h-[320px] pb-6 flex flex-col justify-center items-center rounded-xl bg-white border-t-4 border-[#91D8EA] hover:-translate-y-1 transition shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)]"
          >
            <span class="w-18 h-18 p-5 flex rounded-full bg-[#91D8EA4D]">
              <img src="@/assets/c-before.svg" alt="" class="w-8 h-8 object-contain"
            /></span>

            <h2 class="font-light text-xl pb-5 pt-3">계약 전 체크리스트</h2>
            <p class="font-light text-gray-700 px-8 pb-8">
              계약 전, 중요한 법적 사항과 집주인 정보 등을 확인해보세요.
            </p>
            <router-link to="/checklist/1">
              <button class="w-80 py-3 rounded-lg bg-[#91D8EA] text-white hover:opacity-90">
                체크리스트 확인 →
              </button>
            </router-link>
          </section>
        </div>
        <div class="p-3">
          <section
            class="w-[400px] h-[320px] pb-6 flex flex-col justify-center items-center rounded-xl bg-white border-t-4 border-[#51ACF6] hover:-translate-y-1 transition shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)]"
          >
            <span class="w-18 h-18 p-5 flex rounded-full bg-[#51ACF64D]"
              ><img src="@/assets/c-ing.svg" alt="" class="w-8 h-8 object-contain"
            /></span>
            <h2 class="font-light text-xl pb-5 pt-3">계약 진행 중 체크리스트</h2>
            <p class="font-light text-gray-700 px-8 pb-8">
              계약서 서명전, 주의 깊게 체크해야 할 사항들입니다.
            </p>
            <router-link to="/checklist/2">
              <button class="w-80 py-3 rounded-lg bg-[#51ACF6] text-white hover:opacity-90">
                체크리스트 확인 →
              </button>
            </router-link>
          </section>
        </div>
        <div class="p-3">
          <section
            class="w-[400px] h-[320px] pb-6 flex flex-col justify-center items-center rounded-xl bg-white border-t-4 border-[#3B82F6] hover:-translate-y-1 transition shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10),0px_10px_15px_0px_rgba(0,0,0,0.10)]"
          >
            <span class="w-18 h-18 p-5 flex rounded-full bg-[#DBEAFE]"
              ><img src="@/assets/c-after.svg" alt="" class="w-8 h-8 object-contain"
            /></span>
            <h2 class="font-light text-xl pb-5 pt-3">계약 후 체크리스트</h2>
            <p class="font-light text-gray-700 px-8 pb-8">
              계약 후, 중요한 사후 관리 사항을 점검하세요.
            </p>
            <router-link to="checklist/3">
              <button class="w-80 py-3 rounded-lg bg-[#3B82F6] text-white hover:opacity-90">
                체크리스트 확인 →
              </button>
            </router-link>
          </section>
        </div>
      </div>

      <section class="px-96 py-8 bg-white rounded-xl shadow-md w-full">
        <h3 class="text-lg pb-8">추가 도움이 필요하신가요?</h3>
        <div class="flex justify-center">
          <div class="flex">
            <img src="@/assets/c-help.svg" alt="" class="w-6 h-6 object-contain pr-2" />
            <span class="text-blue-500 font-light cursor-pointer pr-5"> 계약서 관련 도움말</span>
          </div>
          <div class="flex">
            <img src="@/assets/c-help-2.svg" alt="" class="w-6 h-6 object-contain pr-2" />
            <span class="text-blue-500 font-light cursor-pointer">고객센터 문의 </span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    const currentRoute = useRoute()
    return {
      currentRoute,
    }
  },
}
</script>
<style></style>
