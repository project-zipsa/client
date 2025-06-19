<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />
    <h1 class="text-2xl pl-16 pt-10 font-bold">내 계약 분석 결과</h1>

    <section class="flex flex-row gap-20 pr-20 pl-20">
      <div class="w-4/5 flex flex-col items-center text-center">
        <img :src="totalAssessment.img" alt="" class="pt-16 pb-10" />
        <div class="bg-white border-gray-60 border-[1px] rounded p-6">
          <p>내 계약의 안정성 등급은 안전 / 주의 / 높은위험 / 심각한 위험 중</p>
          <p class="font-bold">{{ totalAssessment.grade }} 등급이에요</p>
          <p>{{ parseInt(dangerLists.length) }}개의 위험 요소가 발견되었어요</p>
          <p>{{ totalScore }}점입니다</p>
        </div>
      </div>

      <div class="w-full pt-16">
        <div class="pb-8">
          <!-- 아코디언1 -->
          <div
            class="bg-white flex p-5 border-gray-60 border-[1px] rounded cursor-point"
            @click="toggleMain(0)"
          >
            <img src="@/assets/small-title-docu.svg" alt="" />
            <h2 class="font-semibold text-lg pl-2 pt-[2px]">주요 계약 내용 정리</h2>
            <span class="text-xl pl-2">{{ isOpen[0] ? '▲' : '▼' }}</span>
          </div>
          <div
            class="flex flex-col gap-5 font-light bg-[#D9D9D9] p-10 rounded border-white border-[1px]"
            v-show="isOpen[0]"
          >
            <div class="flex flex-row gap-9">
              <p>계약기간</p>
              <p>
                {{ contractResult.data['임대차 시작일'] }} ~
                {{ contractResult.data['임대차 종료일'] }}
              </p>
            </div>
            <div class="flex flex-row gap-9">
              <p>보증금/월세</p>
              <p>
                {{ parseInt(contractResult.data['총 보증금']).toLocaleString() }}/월세
                없음(전세계약)
              </p>
            </div>
            <div class="flex flex-row gap-9">
              <p>주소</p>
              <p>{{ contractResult.data.전체주소 }}</p>
            </div>
          </div>
        </div>
        <!-- 아코디언1 -->
        <div class="pb-8">
          <div
            class="bg-white flex p-5 border-gray-60 border-[1px] rounded cursor-point"
            @click="toggleMain(1)"
          >
            <img src="@/assets/small-title-docu.svg" alt="" />
            <h2 class="font-semibold text-lg pl-2 pt-[2px]">발견된 위험 요소</h2>
            <span class="text-2xl pl-2">{{ isOpen[1] ? '▲' : '▼' }}</span>
          </div>

          <div v-show="isOpen[1]" class="p-6 bg-[#D9D9D9]">
            <div class="" v-for="(item, index) in dangerLists" :key="index">
              <div class="flex gap-4 p-3">
                <img src="@/assets/mortgage_warning.svg" alt="" />
                <div class="h-16 flex flex-col justify-center">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 아코디언1 -->
        <div class="pb-8">
          <div
            class="bg-white flex p-5 border-gray-60 border-[1px] rounded cursor-point"
            @click="toggleMain(2)"
          >
            <img src="@/assets/small-title-docu.svg" alt="" />
            <h2 class="font-semibold text-lg pl-2 pt-[2px]">발생 가능한 사기 / 대처법</h2>
            <span class="text-2xl pl-2">{{ isOpen[2] ? '▲' : '▼' }}</span>
          </div>

          <div
            v-show="isOpen[2]"
            v-for="(item, index) in preventLists"
            :key="index"
            class="border-gray-60 border-[1px] mb-1"
          >
            <div class="flex bg-white p-2 pl-6">
              <img src="@/assets/mortgage_warning.svg" alt="" class="pr-2 w-7 h-7" />
              <h3 class="font-bold pt-[2px]">
                {{ item['제목'] }}
              </h3>
            </div>
            <div class="bg-[#D9D9D9] px-10 py-4">
              <p>{{ item['대처 방안'] }}</p>
              <p>{{ item['사기 유형'] }}</p>
            </div>
          </div>
        </div>
        <!--아코디언1  -->
        <div class="pb-8">
          <CriterionComponent :open="isOpen[3]" :toggleMain="() => toggleMain(3)" />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import CriterionComponent from '@/components/Docu/CriterionComponent.vue'
import analysisData from '@/assets/js/Analysis'
import { computed, onMounted, reactive, ref } from 'vue'
import safe from '@/assets/contract_safe.svg'
import caution from '@/assets/contract_caution.svg'
import warning from '@/assets/contract_warning.svg'
import dangerous from '@/assets/contract_dangerous.svg'
import { useContractStore } from '@/stores/docs/contract'
import { useAnalysisStore } from '@/stores/docs/analysis'
import axios from 'axios'

const contractStore = useContractStore()
const analysisStore = useAnalysisStore()

const userId = computed(() => {
  return localStorage.getItem('userId')
})
const accessToken = computed(() => {
  return localStorage.getItem('accessToken')
})
const contractResult2 = ref(null)
onMounted(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_SERVER}zipsa/clova/lease-contracts`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
        params: {
          userId: userId.value,
        },
      },
    )
    contractResult2.value = response.data.data
    console.log(contractResult2.value)
  } catch (err) {
    console.error('데이터 가져오기 실패:', err)
  }
})

const contractResult = computed(
  () =>
    contractStore.contents?.data || {
      data: {
        임대인명: '강보라',
        전체주소: '서울특별시 성북구 길음동 1192 비전타운 제2층 201호',
        건물명: '비전타운',
        '임대차 시작일': '2024-04-01',
        '임대차 종료일': '2026-03-31',
        계약일: '2024-03-05',
        전용면적: 29.2,
        '총 보증금': 140000000,
        잔금: 133000000,
        층수: 2,
        건물용도: '다세대주택',
      },
      '계약 위험 분석 결과': {
        '보증금 반환 조건 명시 여부': {
          답변: '예',
          경고: '',
          '근거 조항': '제5조',
        },
        '과도한 위약금 조항 존재 여부': {
          답변: '아니오',
          경고: '',
          '근거 조항': '제6조',
        },
        '일방적인 계약 해지 조건 존재 여부': {
          답변: '예',
          경고: '임차인이 제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지 할 수 있습니다. 이는 일방적인 계약 해지 조건이므로 주의가 필요합니다.',
          '근거 조항': '제4조',
        },
        '원상복구 범위 불명확 조항 존재 여부': {
          답변: '아니오',
          경고: '',
          '근거 조항': '특약사항 4',
        },
        '임대인 정보 불일치 여부': {
          답변: '아니오',
          경고: '',
          '근거 조항': '',
        },
        '계약 만료일 미기재 또는 불명확 여부': {
          답변: '아니오',
          경고: '',
          '근거 조항': '제2조',
        },
        '특약 조항의 모호성 또는 불리한 해석 가능성 여부': {
          답변: '아니오',
          경고: '',
          '근거 조항': '특약사항',
        },
        '기타 불리한 조항 존재 여부 분석': {
          답변: '아니오',
          경고: '',
          '근거 조항': '',
        },
      },
      '위험 요소별 점수': {
        '보증금 반환 조건': 0,
        '과도한 위약금 조항': 0,
        '일방적인 계약 해지 조건': 0,
        '원상복구 범위 불명확 조항': 0,
        '임대인 정보 불일치': 0,
        '계약 만료일 미기재 또는 불명확': 0,
        '특약 조항의 모호성': 0,
        '기타 불리한 조항': 0,
      },
      '전체 위험 요소 수': 1,
      '최고 위험 점수': 2,
      '전체 위험도 점수': 2,
      '사기 유형 및 대처 방안': {
        '일방적인 계약 해지 조건': {
          '사기 유형': '임대인이 일방 해지로 계약 종료를 주장할 수 있습니다',
          '대처 방안': '쌍방 해지 조건으로 명시하거나 임차인 권리 보호 조항 추가합니다',
        },
      },
      '조항별 요약 및 설명': {
        '일방적인 계약 해지 조건':
          '임차인이 제3조를 위반하였을 때 임대인은 즉시 본 계약을 해지 할 수 있습니다. 이는 일방적인 계약 해지 조건이므로 주의가 필요합니다.',
      },
    },
)
const analysisResult = computed(
  () =>
    analysisStore.contents || {
      '1번 항목': 'True',
      '2번 항목': 'True',
      '3번 항목': 'True',
      '4번 항목': '해당없음',
      '5번 항목': 'True',
      '6번 항목': '해당없음',
      '7번 항목': 'False',
      '8번 항목': 'False',
    },
)

// filtered
const filteredResults = computed(() => {
  const result = []

  for (const key of Object.keys(analysisResult.value)) {
    const val = analysisResult.value[key]
    if (val.includes('해당 없음') || val.includes('해당없음')) {
      continue
    } else if (val === '불확실') {
      result.push({ ...analysisData[key], uncertain: true })
    } else if (val === 'True' || val === 'False') {
      if (analysisData[key] && analysisData[key].check === val) {
        result.push(analysisData[key])
      }
    } else {
      for (const k of Object.keys(analysisData[key])) {
        if (k === val) {
          result.push(analysisData[key][k])
        }
      }
    }
  }
  console.log(result)
  return result
})

// 최종 리스트 구성
const dangerLists = computed(() => {
  const result = []
  const dangerData = contractResult.value['계약 위험 분석 결과']
  for (const key in dangerData) {
    const item = dangerData[key]
    if (item['경고'].length > 2) {
      result.push(item['경고'])
    }
  }
  for (const val of filteredResults.value) {
    result.push(val['위험 요소 설명'])
  }

  return result
})

const preventLists = computed(() => {
  const result = []
  const dangerData = contractResult.value['사기 유형 및 대처 방안']
  for (const key in dangerData) {
    const item = dangerData[key]
    result.push({
      제목: key,
      '사기 유형': item['사기 유형'],
      '대처 방안': item['대처 방안'],
    })
  }
  for (const val of filteredResults.value) {
    result.push({
      제목: val['제목'],
      '사기 유형': val['사기 유형'],
      '대처 방안': val['대처 방안'],
    })
  }

  return result
})

// 총 위험도 계산
const totalScore = computed(() => {
  const contractScore = parseInt(contractResult.value['전체 위험도 점수'])
  const analysisScore = filteredResults.value
    .filter((x) => x.uncertain !== true)
    .map((x) => x['점수'])
  console.log(contractScore, analysisScore)
  if (analysisScore.length < 1) {
    return contractScore
  }
  return contractScore + analysisScore.reduce((a, b) => a + b)
})

const totalAssessment = computed(() => {
  if (totalScore.value === 0) {
    return {
      result: '안전',
      img: safe,
      grade: '안전',
    }
  } else if (totalScore.value > 0 && totalScore.value < 6) {
    return {
      result: '경고 / 주의',
      img: caution,
      grade: '주의',
    }
  } else if (totalScore.value >= 6 && totalScore.value < 11) {
    return {
      result: '높은 위험',
      img: warning,
      grade: '높은 위험',
    }
  } else {
    return {
      result: '심각한 위험',
      img: dangerous,
      grade: '심각한 위험',
    }
  }
})

const isOpen = ref([true, false, false, false])
const innerOpen = ref(dangerLists.value.map(() => false))
function toggleMain(index) {
  isOpen.value[index] = !isOpen.value[index]
}
function toggleInner(index) {
  innerOpen.value[index] = !innerOpen.value[index]
}
</script>
<style></style>
