<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />

    <div class="flex flex-col font-light items-center text-[14px]">
      <h1 class="font-bold text-[28px] leading-8 line p-8 pt-14">주소 입력 및 문서 업로드</h1>

      <p class="">복잡한 내 집 계약, ZIPSA가 대신 분석해드립니다.</p>
      <p class="">주소와 계약서를 업로드하면, 위험 요소를 자동으로 분석해드려요.</p>
      <p class="">
        ※ 업로드된 문서는 서비스 제공을 위한 분석 목적으로만 사용되며, 다른 용도로는 일절 사용되지
        않습니다.
      </p>
      <p class="text-[red]">
        ※ 개인정보 보호를 위해 주민등록번호, 계좌번호 등 민감한 정보는 가린 후 업로드하실 것을
        권장합니다.
      </p>
    </div>

    <section class="flex mt-10">
      <div class="flex flex-col w-1/2 ml-28">
        <div class="bg-white flex flex-col mr-6 mb-3 p-6 border-gray border-[1px] rounded">
          <h2 class="text-[16px] mb-5">계약서 업로드</h2>

          <!-- 컴포넌트화 필요 -->
          <form action="" class="mb-3">
            <div class="flex w-full text-center">
              <input id="contract" type="file" @change="setFile" class="hidden" />

              <label
                v-if="!isUploaded.contract"
                for="contract"
                class="w-full border-dashed border-[1px] border-[black] rounded py-5 flex items-center justify-center"
              >
                <img src="@/assets/laptop.svg" alt="" class="mx-2" />
                내 컴퓨터 찾기
              </label>

              <div v-else class="flex w-full">
                <p class="text-gray-700 flex-1 border border-black border-r-0 rounded-l px-4 py-2">
                  선택된 파일: {{ uploadedFiles.contract?.name }}
                </p>
                <button
                  @click="resetFile"
                  class="border border-black border-l-0 rounded-r px-4 py hover:bg-red-100 transition"
                >
                  X
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="bg-white flex flex-col mr-6 p-6 border-gray border-[1px] rounded">
          <h2 class="text-[16px] mb-5">등기부등본 업로드</h2>
          <form action="" class="mb-3">
            <div class="flex w-full text-center">
              <input id="registerCopy" type="file" @change="setFile" class="hidden" />
              <label
                v-if="!isUploaded.registerCopy"
                for="registerCopy"
                class="w-full border-dashed border-[1px] border-[black] rounded py-5 flex items-center justify-center"
              >
                <img src="@/assets/laptop.svg" alt="" class="mx-2" />
                내 컴퓨터 찾기
              </label>
              <div v-else class="flex w-full">
                <p class="text-gray-700 flex-1 border border-black border-r-0 rounded-l px-4 py-2">
                  선택된 파일: {{ uploadedFiles.registerCopy?.name }}
                </p>
                <button
                  @click="resetFile"
                  class="border border-black border-l-0 rounded-r px-4 py hover:bg-red-100 transition"
                >
                  X
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- 컴포넌트화 -->

        <div class="mt-10 pb-12 text-center font-light flex flex-col gap-2">
          <p class="">내 컴퓨터 찾기를 선택하여 파일을 업로드해 주세요</p>
          <p>※ 업로드 가능한 파일 형식:JPG, JPEG, PNG, PDF, TIF, TIFF</p>
          <p class="text-[red]">
            ※ 주의 파일 형식을 확인해주세요. PDF 형식의 파일 업로드는 불가합니다.
          </p>
        </div>
      </div>

      <form
        action=""
        class="flex flex-col bg-white ml-6 mr-28 w-1/2 h-1/2 p-8 border-gray border-[1px] rounded"
      >
        <h2 class="text-xl pb-8">주소 입력</h2>
        <p class="font-light pb-4 text-[16px]">기본 주소</p>
        <div class="flex pb-10">
          <input
            type="text"
            id="address"
            placeholder="검색 버튼을 눌러주세요"
            class="placeholder-gray-400 pl-2 py-4 placeholder-opacity-75 border-black border-[1px] w-4/5 rounded"
          />
          <button
            type="button"
            @click="execDaumPostcode"
            class="border-black border-[1px] rounded p-2 px-6 ml-6 hover:text-blue-500 hover:border-blue-500"
          >
            검색
          </button>
        </div>
        <div class="font-light text-[16px] flex flex-col items-center gap-1">
          <p class="">검색 버튼을 클릭하여 주소를 입력해주세요</p>
          <p class="text-red-400">※ 주소는 지번주소로 입력해주세요.</p>
          <p class="text-red-400">예) 동대문구 이문동 270-1</p>
        </div>
      </form>
    </section>

    <div class="fixed bottom-0 right-28 flex flex-col items-end gap-2 z-50">
      <button
        class="flex items-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        @click="analysis"
      >
        계약 분석 결과 보러가기
        <span class="text-xl">→</span>
      </button>

      <p class="text-sm text-red-400">*필수 항목 입력 후 진행 가능합니다.</p>
    </div>
  </div>
</template>
<script setup>
import zipsaCodes from '@/assets/js/zipsa-code'
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import { useContractStore } from '@/stores/docs/contract'
import { useRegisterStore } from '@/stores/docs/register'
import { useAnalysisStore } from '@/stores/docs/analysis'
import { useDocuStore } from '@/stores/docs/result'
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

// 파일 업로드 ----
const contractStore = useContractStore()
const registerStore = useRegisterStore()
const analysisStore = useAnalysisStore()
const docuStore = useDocuStore()
let { uploadContract } = contractStore
let { uploadRegister } = registerStore
let { uploadAnalysis } = analysisStore

const uploadedFiles = reactive({ contract: null, registerCopy: null })
const isUploaded = reactive({ contract: false, registerCopy: false })
const userId = localStorage.getItem('userId')

function setFile(event) {
  let file = event.target.files[0]
  console.log(event.target.id)
  if (event.target.id == 'contract') {
    uploadedFiles.contract = file
    isUploaded.contract = true
  } else {
    uploadedFiles.registerCopy = file
    isUploaded.registerCopy = true
  }
  console.log(uploadedFiles)
}

function resetFile(event) {
  if (event.target.id == 'contract') {
    uploadedFiles.contract = null
    isUploaded.contract = false
  } else {
    uploadedFiles.registerCopy = null
    isUploaded.registerCopy = false
  }
}
// ---- 파일 업로드

// 주소 입력

onMounted(() => {
  const script = document.createElement('script')
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  script.defer = true
  document.head.appendChild(script)
})

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ''

      if (data.userSelectedType === 'R') {
        alert('지번 주소를 선택해주세요')
      } else {
        addr = data.jibunAddress
      }

      document.getElementById('address').value = addr
    },
  }).open()
}
// -- 주소 입력

function addressToCode() {
  let addressKey = document.getElementById('address').value
  addressKey = addressKey.split(' ').slice(0, 3).join(' ')
  let addressCode = zipsaCodes[addressKey]

  let sigunguCd = addressCode.toString().slice(0, 5)
  let bjdongCd = addressCode.toString().slice(5, 10)

  return { sigunguCd, bjdongCd }
}

// post
const sendContract = async (file) => {
  const formData = new FormData()
  formData.append('leaseContractFiles', file)
  formData.append('userId', 1)

  return await uploadContract(formData)
}

const sendRegister = async (file) => {
  const formData = new FormData()
  formData.append('landTitles', file)
  formData.append('userId', 1)

  return await uploadRegister(formData)
}

const storeData = async (data) => {
  const { contractRes, registerRes, analysisRes } = data
  docuStore.contractResult = contractRes
  docuStore.registerResult = registerRes
  docuStore.analysisResult = analysisRes
  console.log(docuStore)
}

const analysis = async () => {
  let { sigunguCd, bjdongCd } = addressToCode()
  console.log(sigunguCd, bjdongCd)

  await router.push('/docu/loading')
  await sendContract(uploadedFiles.contract)
  await sendRegister(uploadedFiles.registerCopy)
  await uploadAnalysis({ sigunguCd, bjdongCd })
  await storeData({ contractRes, registerRes, analysisRes })
}

// -- post

const currentRoute = useRoute()
</script>
<style></style>
