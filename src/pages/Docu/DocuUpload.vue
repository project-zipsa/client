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
        <h2 class="text-2xl pb-10">주소 입력</h2>
        <input
          type="text"
          id="sample6_postcode"
          placeholder="우편번호"
          class="mb-4 p-2 border-black border-[1px] rounded w-2/6"
        />
        <p class="font-light pb-1">기본 주소</p>
        <div class="flex pb-10">
          <input
            type="text"
            id="sample6_address"
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

        <div class="pb-10">
          <p class="font-light pb-1">상세 주소</p>
          <input
            type="text"
            id="sample6_detailAddress"
            placeholder="상세주소를 입력해주세요"
            class="placeholder-gray-400 placeholder-opacity-75 border-black border-[1px] rounded p-2 w-4/5"
          />
        </div>

        <input
          type="text"
          id="sample6_extraAddress"
          placeholder="참고항목"
          class="mb-4 p-2 border-black border-[1px] rounded w-4/5"
        />
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
                class="border border-black border-l-0 rounded-r px-4 py-2 hover:bg-gray-100 hover:bg-red-100 transition"
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
        @click.prevent="addFileData"
      >
        계약 분석 결과 보러가기
        <span class="text-xl">→</span>
      </button>
      <p class="text-sm text-red-400">*필수 항목 입력 후 진행 가능합니다.</p>
    </div>
  </div>
</template>
<script setup>
import MainHeaderComponent from '@/components/Docu/MainHeaderComponent.vue'
import { useDocsStore } from '@/stores/docs/getData'
import { onMounted, ref } from 'vue'

const store = useDocsStore()
let { uploadFile } = store

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

const addFileData = () => {
  uploadFile(file)
  file = null
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
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = '' // 주소 변수
      var extraAddr = '' // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')'
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById('sample6_extraAddress').value = extraAddr
      } else {
        document.getElementById('sample6_extraAddress').value = ''
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('sample6_postcode').value = data.zonecode
      document.getElementById('sample6_address').value = addr
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('sample6_detailAddress').focus()
    },
  }).open()
}
</script>
<style></style>
