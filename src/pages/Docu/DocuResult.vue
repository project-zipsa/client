<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />
    <h1>내 계약 분석 결과</h1>

    <section class="flex flex-row gap-2">
      <div class="w-1/2">
        <img :src="resultImg" alt="" />
        <div>
          <p>내 계약의 안정성 등급은 안전/주의/높은위험/심각한 위험 중 {{}} 등급이에요</p>
          <p>1개의 위험 요소가 발견되었어요</p>
        </div>
      </div>

      <div class="w-1/2">
        <div class="">
          <h2 class="font-bold text-2xl bg-white">주요 계약 내용 정리</h2>
          <div class="flex flex-col gap-5 font-light bg-[#BDBDBD] p-10">
            <div class="flex flex-row gap-9">
              <p>계약기간</p>
              <p>{{}} ~ {{}}</p>
            </div>
            <div class="flex flex-row gap-9">
              <p>보증금/월세</p>
              <p>{{}}/월세 없음(전세계약)</p>
            </div>
            <div class="flex flex-row gap-9">
              <p>주소</p>
              <p>{{}}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-bold text-2xl bg-white">발견된 위험 요소</h2>
          <div v-for="(item, index) in dangList" :key="index">
            <div v-if="item['답변'] == '예'" class="flex gap-4">
              <img src="@/assets/mortgage_warning.svg" alt="" />
              <div>{{ index }}</div>
              <div>{{ item['경고'] }}</div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-bold text-2xl bg-white">발생 가능한 사기 / 대처법</h2>
          <div v-for="(item, index) in scamList" :key="index">
            <h3 class="bg-white p-2 border-[black] border-[1px]">{{ index }}</h3>
            <p>{{ item['대처 방안'] }}</p>
            <p>{{ item['사기 유형'] }}</p>
          </div>
        </div>
        <div>
          <h2 class="font-bold text-2xl bg-white">위험 항목 기준표</h2>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import { useDocuStore } from '@/stores/docs/result'
import { computed } from 'vue'
import safe from '@/assets/contract_safe.svg'
import caution from '@/assets/contract_caution.svg'
import warning from '@/assets/contract_warning.svg'
import dangerous from '@/assets/contract_dangerous.svg'
import { useContractStore } from '@/stores/docs/contract'
import { useRegisterStore } from '@/stores/docs/register'
import { useAnalysisStore } from '@/stores/docs/analysis'

const contractStore = useContractStore()
const registerStore = useRegisterStore()
const analysisStore = useAnalysisStore()

const contractResult = contractStore.contents?.data || {}
const registerResult = registerStore.contents?.data || {}
const analysisResult = analysisStore.contents?.data || {}

console.log(contractResult, registerResult, analysisResult)

// const resultImg = computed(() => {
//   if (score == 0) {
//     return safe
//   } else if (score > 0 && score < 3) {
//     return caution
//   } else if (score > 2 && score < 11) {
//     return warning
//   } else {
//     return dangerous
//   }
// })
// const grade = computed(() => {
//   if (score == 0) {
//     return '안전'
//   } else if (score > 0 && score < 3) {
//     return '주의'
//   } else if (score > 2 && score < 11) {
//     return '높은 위험'
//   } else {
//     return '심각한 위험'
//   }
// })
</script>
<style></style>
