<template>
  <div>
    <div
      class="bg-white flex p-5 border-gray-60 border-[1px] rounded cursor-point"
      @click="toggleMain"
    >
      <img src="@/assets/small-title-docu.svg" alt="" />
      <h2 class="font-semibold text-lg pl-2 pt-[2px]">위험 항목 기준표</h2>
      <span class="text-2xl pl-2">{{ open ? '▲' : '▼' }}</span>
    </div>

    <div v-show="open" class="grid grid-cols-2 bg-[#D9D9D9]">
      <div
        class="font-light flex flex-col gap-4 items-center justify-center border-r-2 border-gray-400 pr-16 p-10"
      >
        <p>1. 보증금 반환 조건</p>
        <p>2. 과도한 위약금 조항</p>
        <p>3. 일방적인 계약 해지 조건</p>
        <p>4. 원상복구 범위 불명확</p>
        <p>5. 임대인 정보 불일치</p>
        <p>6. 계약 만료일 미기재 또는 불명확</p>
        <p class="text-center">7. 특약 조항의 모호성 또는 불리한 해석 가능성</p>
        <p>8. 기타 불리한 조항</p>
      </div>
      <div class="py-10">
        <div
          class="flex flex-col gap-4 items-center justify-center pb-10 border-gray-400 border-b-2"
        >
          <h3 class="font-bold">항목별</h3>
          <div class="flex flex-col gap-1 items-center justify-center">
            <p>🟢 정상 => 0점</p>
            <p>🟡 경미한 위험 => 1점</p>
            <p>🟠 주의 필요 => 2점</p>
            <p>🔴 고위험 => 3점</p>
          </div>
        </div>
        <div class="flex flex-col gap-4 items-center justify-center">
          <h3 class="font-bold pt-5">총점수</h3>
          <div class="flex flex-col gap-1 items-center justify-center">
            <p class="flex">
              <img src="@/assets/contract_safe.svg" alt="" class="w-7 h-7 pr-1" />0점 => 안전
            </p>
            <p class="flex">
              <img src="@/assets/contract_caution.svg" alt="" class="w-7 h-7 pr-1" /> 1 ~ 2점 =>
              주의
            </p>
            <p class="flex">
              <img src="@/assets/contract_warning.svg" alt="" class="w-7 h-7 pr-1" /> 3 ~ 10점 =>
              높은 위험
            </p>
            <p class="flex">
              <img src="@/assets/contract_dangerous.svg" alt="" class="w-7 h-7 pr-1" />11점 이상 =>
              심각한 위험
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  open: Boolean,
  toggleMain: Function,
})
</script>
<style></style>
