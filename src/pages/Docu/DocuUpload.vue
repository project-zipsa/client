<template>
  <div class="bg-[#FFF9E3] min-h-screen">
    <MainHeaderComponent />

    <div class="flex flex-col items-center">
      <h1 class="font-bold text-4xl p-8 pt-20">주소 입력 및 문서 업로드</h1>
      <p class="font-light">복잡한 내 집 계약, ZIPSA가 대신 분석해드립니다.</p>
      <p class="font-light">주소와 계약서를 업로드하면, 위험 요소를 자동으로 분석해드려요.</p>
    </div>

    <section class="flex">
      <form
        action=""
        class="flex flex-col bg-white m-20 mr-6 w-1/2 p-12 border-gray border-[1px] rounded"
      >
        <h2 class="text-2xl pb-20">주소 입력</h2>
        <p class="font-light text-xl text-red-400 pb-2">지번 주소를 입력해주세요</p>
        <div class="flex pb-10">
          <input
            type="text"
            id="address"
            placeholder="검색 버튼을 눌러주세요"
            class="placeholder-gray-400 pl-2 placeholder-opacity-75 border-black border-[1px] w-4/5 rounded"
          />
          <button
            type="button"
            @click="execDaumPostcode"
            class="border-black border-[1px] rounded p-2 pr-3 pl-3 ml-6"
          >
            검색
          </button>
        </div>
      </form>

      <div class="flex flex-col bg-white m-20 ml-6 w-1/2 p-12 border-gray border-[1px] rounded">
        <h2 class="text-2xl mb-20">계약서 업로드</h2>
        <form action="">
          <div class="flex w-full text-center">
            <input id="upload" type="file" @change="setFile" class="hidden" />
            <label
              v-if="!isUploaded"
              for="upload"
              class="w-full border-dashed border-[1px] border-[black] rounded p-10"
            >
              내 컴퓨터 찾기
            </label>
            <div v-else-if="isUploaded" class="flex w-full">
              <p class="text-gray-700 flex-1 border border-black border-r-0 rounded-l px-4 py-2">
                선택된 파일: {{ fileName }}
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

        <div class="mt-32 text-center flex flex-col gap-2">
          <p class="font-light">버튼 선택 또는 첨부파일을 선택하여 이곳에 드래그&드롭해 주세요.</p>
          <p class="font-light text-[red]">
            * 주의 이미지 스캔본은 사용 불가합니다. 원본 PDF파일의 형태로 업로드 해주세요
          </p>
        </div>
      </div>
    </section>

    <div class="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
      <button
        class="flex items-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        @click.prevent="sendFileData"
      >
        계약 분석 결과 보러가기
        <span class="text-xl">→</span>
      </button>
      <p class="text-sm text-red-400">*필수 항목 입력 후 진행 가능합니다.</p>
    </div>
  </div>
</template>
<script setup>
import zipsaCodes from '@/assets/zipsa-code'
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import { useDocsStore } from '@/stores/docs/getData'
import { onMounted, ref } from 'vue'
// 파일 업로드 ----
const store = useDocsStore()
let { uploadData } = store

let file = ref(null)
let fileName = ref('')
let isUploaded = ref(false)

function setFile(event) {
  file = event.target.files[0]

  fileName.value = file.name
  isUploaded.value = true
}
function resetFile(event) {
  file = null
  isUploaded.value = false
}

const formData = new FormData()
formData.append('file', file.value)

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

  let sigunguCd = Number(addressCode.toString().slice(0, 5))
  let bjdongCd = addressCode

  return { sigunguCd, bjdongCd }
}

// post
const sendFileData = () => {
  let { sigunguCd, bjdongCd } = addressToCode()
  uploadData({ sigunguCd, bjdongCd, file })
  file = null
}

// -- post
</script>
<style></style>
