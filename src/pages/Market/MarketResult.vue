<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />
    <h1 class="text-4xl font-bold p-12">내 전세가율, 평균 시세 비교 결과</h1>

    <div class="p-10">
      <section class="flex bg-white pb-16 pt-10">
        <div class="w-1/2 flex flex-col gap-10 pl-20 pb-16 border-r-2 border-[#848484]">
          <div class="flex">
            <p class="font-bold text-2xl pt-24">나의 전세가율은</p>
            <img src="@/assets/blue_house.svg" alt="" class="pl-40 pt-10" />
          </div>

          <div class="mt-10">
            <p class="text-xl text-gray-400 pb-2 pl-96">(단위: %)</p>
            <div
              class="w-[460px] h-[45px] border-black border-[1px] rounded bg-gradient-to-r from-red-100 to-red-500 relative"
            >
              <img
                :src="jeonseResult.face"
                alt=""
                class="absolute -top-1"
                :style="{ left: percentValue + '%' }"
              />
              <p
                class="font-bold text-xl absolute top-10 pl-2"
                :style="{ left: percentValue + '%' }"
              >
                {{ jeonseRatio }}
              </p>
            </div>
          </div>

          <span class="flex gap-2 pl-2">
            <img :src="jeonseResult.arrow" alt="" />
            <p class="text-xl font-bold pl-1">{{ jeonseResult.title }}</p>
          </span>
          <span class="flex gap-3">
            <img :src="jeonseResult.icon" alt="" />
            <p class="text-xl font-bold pt-1">{{ jeonseResult.description }}</p>
          </span>
        </div>

        <div class="w-1/2 flex flex-col gap-10 items-center justify-center">
          <div class="flex">
            <p class="text-2xl font-bold px-14 pt-6">나의 거래금액 비교 결과는</p>
            <img src="@/assets/chart.svg" alt="" class="pl-20 pb-10" />
          </div>

          <div class="text-xl flex flex-col justify-center items-center gap-2">
            <span class="flex gap-2">
              <img :src="diffResult.icon" alt="" class="" />
              <h2 class="text-3xl pb-5 font-bold">{{ diffResult.title }}</h2>
            </span>

            <p class="pb-3">동일 건물 평균 시세: {{ averagePrice }}원</p>
            <p class="pb-3">입력하신 거래 금액: {{ userPrice }}원</p>
            <p>차이: {{ differentPercent }} %</p>
          </div>

          <div class="text-xl font-bold">
            <span class="flex gap-2">
              <img :src="diffResult.arrow" alt="" />
              <p>{{ diffResult.description }}</p>
            </span>
            <p>{{ diffResult.detail }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import { useMarketStore } from '@/stores/markets/market'
import { computed } from 'vue'
import safeFace from '@/assets/smileyface.svg'
import cautionFace from '@/assets/sweaty_face.png'
import danFace from '@/assets/enraged_face.png'
import safeArrow from '@/assets/g_arrow.svg'
import lcautionArrow from '@/assets/ly_arrow.svg'
import cautionArrow from '@/assets/y_arrow.svg'
import danArrow from '@/assets/r_arrow.svg'
import safeIcon from '@/assets/market_safe.svg'
import lcautionIcon from '@/assets/light_caution_icon.svg'
import cautionIcon from '@/assets/market_warning.svg'
import danIcon from '@/assets/market_siren.svg'

const marketStore = useMarketStore()
console.log(marketStore.contents)

const { averagePrice, userPrice, differentPercent, jeonseRatio } = marketStore.contents?.data || {}
// const { averagePrice, userPrice, differentPercent, jeonseRatio } = {
//   averagePrice: 19500.0,
//   userPrice: 9000.0,
//   differentPercent: -53.846,
//   jeonseRatio: 89.0,
// }
const percentValue = computed(() => {
  return jeonseRatio - 10
})

const jeonseResult = computed(() => {
  if (jeonseRatio <= 70) {
    return {
      title: '안전(70% 이하)',
      description: '이 전세금은 현재 매매 시세에 비해 안정적인 수준입니다.',
      face: safeFace,
      arrow: safeArrow,
      icon: safeIcon,
    }
  } else if (jeonseRatio < 96) {
    return {
      title: '주의(71~95% 미만)',
      description: '전세금이 다소 높은 편입니다. 전세 계약 전 신중한 확인이 필요합니다.',
      face: cautionFace,
      arrow: cautionArrow,
      icon: cautionIcon,
    }
  } else if (jeonseRatio > 94) {
    return {
      title: '고위험(95% 이상)',
      description: '매우 높은 전세가율입니다. 깡통전세 또는 사기 피해 가능성이 있습니다.',
      face: danFace,
      arrow: danArrow,
      icon: danIcon,
    }
  } else {
    return {
      title: '잘못된 값입니다',
      description: '잘못된 값입니다',
      face: '잘못된 값입니다',
      arrow: '잘못된 값입니다',
      icon: '잘못된 값입니다',
    }
  }
})

const diffResult = computed(() => {
  if (Math.abs(differentPercent) <= 10) {
    return {
      title: '안전 (차이: ±10% 이내)',
      description: '평균 시세와 거의 일치하는 적정한 전세금입니다.',
      detail: '→ 전세 시세와 큰 차이가 없어 안정적인 계약으로 판단됩니다.',
      arrow: safeArrow,
      icon: safeIcon,
    }
  } else if (Math.abs(differentPercent) <= 20) {
    return {
      title: '경계 (차이: ±10% ~ 20%)',
      description: '시세보다 약간 높은 전세금입니다',
      detail: '→ 단기 급등 구간일 수 있으니 등기부·시세 비교를 다시 확인해보세요',
      arrow: lcautionArrow,
      icon: lcautionIcon,
    }
  } else if (Math.abs(differentPercent) <= 25) {
    return {
      title: '위험 (차이: ±20% 초과)',
      description: '입력하신 전세금은 이 지역 시세보다 20% 이상 높습니다',
      detail: '→ 깡통전세 또는 허위 시세 위험이 있을 수 있습니다.',
      arrow: cautionArrow,
      icon: cautionIcon,
    }
  } else if (Math.abs(differentPercent) > 25) {
    return {
      title: '고위험 (±25% 이상 또는 극단적 차이)',
      description: '이 전세금은 시세 평균보다 25% 이상 높습니다.',
      detail:
        ' → 깡통전세 사기, 허위 시세 조작 가능성이 매우 큽니다.  반드시 등기부등본, 건축물대장, 확정일자 등을 확인하고 보증금 보호 조치를 취하세요.',
      arrow: danArrow,
      icon: danIcon,
    }
  } else {
    return {
      title: 'false',
      description: 'false',
      arrow: 'false',
      icon: 'false',
    }
  }
})
</script>
<style></style>
