<template>
  <div class="bg-[#FFF9E3]">
    <MainHeaderComponent />

    <section class="flex pr-12 pt-6">
      <div class="pt-2 w-full relative">
        <div class="flex flex-col justify-center items-center pt-4 font-light text-[16px]">
          <p class="text-3xl pb-8 font-bold">전세금, 주소, 면적, 계약 시점 입력</p>
          <p class="pb-1">복잡한 시세 관련 문제들, ZIPSA가 함께 분석해드립니다.</p>
          <p>아래의 입력란을 채워주시면, 실거래가 기반의 가격 분석을 통해</p>
          <p>객관적인 진단 결과를 제공해드립니다.</p>
        </div>
        <div class="">
          <img src="@/assets/market.png" alt="" class="h-[500px] pl-10 absolute top-30" />
        </div>
      </div>

      <div class="w-[75%] p-18 pt-12">
        <form action="" class="bg-white p-12 flex flex-col gap-3 border-[white] rounded-lg">
          <div>
            <p class="text-xl pb-2">거래 금액 입력 (단위: 만 원)</p>
            <input
              type="text"
              v-model="price"
              class="placeholder-gray border-[black] border-[1px] rounded p-2 text-xl w-full"
              placeholder="숫자만 입력 예) 120000"
              id="price"
            />
          </div>
          <div>
            <p class="text-xl pb-2">주소 입력</p>
            <p class="text-[red]">검색창을 이용해 지번주소를 입력해주세요.</p>
            <div class="flex">
              <input
                type="text"
                class="placeholder-gray border-[black] border-[1px] rounded p-2 text-xl w-11/12 mr-2"
                readonly
                id="address"
                v-model="address"
                placeholder="예시) 서울 동대문구 이문동 339-4"
              />
              <button
                type="button"
                @click="execDaumPostcode"
                class="border-black border-[1px] rounded px-3 py-2 hover:text-blue-500 hover:border-blue-500 w-1/5 text-xl"
              >
                검색
              </button>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col w-full">
              <p class="text-xl pb-2">층수</p>
              <input
                type="text"
                class="placeholder-gray border-[black] border-[1px] rounded p-2 text-xl"
                placeholder="'층'제외 예) 7"
                id="floor"
                v-model="floor"
              />
            </div>
            <div class="flex flex-col w-full">
              <p class="text-xl pb-2">건축년도</p>
              <input
                type="text"
                class="placeholder-gray border-[black] border-[1px] rounded p-2 text-xl"
                placeholder="'년' 제외 예) 2020"
                id="builtYear"
                v-model="builtYear"
              />
            </div>
          </div>

          <div>
            <p class="text-xl pb-2">전용 면적 입력</p>
            <input
              type="text"
              class="placeholder-gray border-[black] border-[1px] rounded p-2 text-xl w-full"
              placeholder="실수형으로 입력 예). 17.0100"
              id="area"
              v-model="area"
            />
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col w-full">
              <p class="text-xl pb-2">주택유형</p>
              <select
                name=""
                id=""
                v-model="housingType"
                class="w-full p-2 px-16 text-xl border-[black] border-[1px] rounded"
              >
                <option value="다세대">다세대</option>
                <option value="다가구">다가구</option>
                <option value="단독">단독</option>
                <option value="아파트">아파트</option>
                <option value="연립다세대">연립다세대</option>
                <option value="오피스텔">오피스텔</option>
              </select>
            </div>
            <div class="flex flex-col w-full">
              <p class="text-xl pb-2">계약유형</p>
              <select
                name=""
                id=""
                v-model="contractType"
                class="w-full p-2 px-20 text-xl border-[black] border-[1px] rounded"
              >
                <option value="전세">전세</option>
                <option value="매매">매매</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
    <div class="flex flex-col items-end pb-12 pr-10 pt-4">
      <button
        class="flex items-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition disabled:text-gray-400 disabled:cursor-not-allowed duration-200"
        @click="sendInfo"
        :disabled="!isFilled"
      >
        전세가율, 평균 시세 비교 보러가기
        <span class="text-xl">→</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import router from '@/router'
import { useMarketStore } from '@/stores/markets/market'
import { computed, onMounted, ref } from 'vue'
import { POSITION, useToast } from 'vue-toastification'

const marketStore = useMarketStore()
let { uploadMarket } = marketStore

let price = ref()
let address = ref()
let area = ref()
let floor = ref()
let builtYear = ref()
let contractType = ref()
let housingType = ref()

const isFilled = computed(() => {
  return (
    price.value &&
    address.value &&
    area.value &&
    floor.value &&
    builtYear.value &&
    contractType.value &&
    housingType.value
  )
})

const sendInfo = async () => {
  const tokens = address.value.split(' ')
  const result = []

  for (const token of tokens) {
    if (/^(.*?)(동|면|리)(\d*가?)?$/.test(token)) {
      const match = token.match(/^(.*?)(동|면|리)/)
      result.push(match[1] + match[2])
      break
    } else {
      result.push(token)
    }
  }
  address.value = result[0] + '특별시 ' + result[1] + ' ' + result[2]

  try {
    await router.push({ name: 'market-loading' })

    await uploadMarket({
      address: address.value,
      area: parseFloat(area.value),
      floor: parseInt(floor.value),
      builtYear: parseInt(builtYear.value),
      housingType: housingType.value,
      contractType: contractType.value,
      price: parseInt(price.value),
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  script.defer = true
  document.head.appendChild(script)
})

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = '' // 주소 변수
      var extraAddr = '' // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        const toast = useToast()
        toast.error('지번 주소를 입력해주세요', { timeout: 5000 })
        address.value = ''
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress
      }

      address.value = addr
      // 커서를 상세주소 필드로 이동한다.
    },
  }).open()
}
</script>
<style></style>
