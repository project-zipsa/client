<template>
  <div class="bg-[#FFF9E3] w-full">
    <div class="border-red p-4 pb-12 flex flex-col gap-8 justify-center items-center">
      <div class="flex">
        <img src="@/assets/home2.png" alt="" class="w-28 h-28 object-fill" />
        <h1 class="font-bold text-3xl pt-14 pl-6">법률 용어 단어 리스트</h1>
      </div>

      <form action="" class="relative pl-6">
        <input
          class="w-[450px] h-9 placeholder-gray-400 pl-10 placeholder-opacity-75"
          type="text"
          v-model.trim="search"
          placeholder="Search"
        />
        <img
          src="@/assets/_Magnifyingglass.svg"
          alt=""
          class="absolute top-2.5 left-8 text-gray-400 w-5 h-5"
        />
      </form>
    </div>

    <section class="flex flex-col gap-3 justify-content items-center">
      <div v-if="!checkExists">해당 단어는 리스트에 없습니다</div>
      <div
        v-for="(item, index) in showPages"
        :key="index"
        class="w-4/5 font-light bg-[#FFFFF5] group flex shadow-[-4px_-4px_4px_0px_rgba(0,0,0,0.05)_inset,4px_4px_4px_0px_rgba(0,0,0,0.15)] rounded-[15px]"
      >
        <div class="text-center bg-[#FFD43B] p-3 w-1/4 rounded-[15px_0px_0px_15px]">
          {{ item.word }}
        </div>
        <div class="flex flex-col w-full">
          <div class="w-full text-center p-3 cursor-pointer" @click="toggle(currentPage, index)">
            {{ item.meaning }}
          </div>
          <div
            v-if="openStates[currentPage]?.[index]"
            class="relative p-3 bg-[#FFFFF5] rounded-[0px_15px_15px_0px]"
          >
            <img src="@/assets/home1.png" alt="" class="w-16 h-18" />
            <div class="text-center pl-6 absolute top-10 w-full">
              {{ item.detail }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-1 pt-8 pb-10">
        <button
          @click="currentPage = 1"
          class="bg-[white] text-[gray] border border-solid border-[#DFE3E8] p-1 h-8 w-8 rounded"
        >
          <<
        </button>
        <button
          class="bg-[white] rounded text-[gray] border border-solid border-[#DFE3E8] p-1 h-8 w-8"
          @click="currentPage > 2 ? currentPage-- : (currentPage = 1)"
        >
          <
        </button>
        <button
          v-for="(item, index) in visiblePages"
          :key="index"
          @click="currentPage = item"
          class="p-1 bg-[white] border border-solid border-[#DFE3E8] h-8 w-8 rounded"
        >
          {{ item }}
        </button>
        <button
          class="bg-[white] rounded text-[gray] border border-solid border-[#DFE3E8] h-8 w-8"
          @click="currentPage < totalPages ? currentPage++ : (currentPage = totalPages)"
        >
          >
        </button>
        <button
          class="bg-[white] rounded text-[gray] border border-solid border-[#DFE3E8] h-8 w-8"
          @click="currentPage = totalPages"
        >
          >>
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import wordDicts from '@/assets/js/dicts'
import { computed, reactive, ref } from 'vue'
export default {
  name: 'wordDictionary',
  setup() {
    const words = wordDicts

    const openStates = reactive({})

    function toggle(currentPage, index) {
      if (!openStates[currentPage]) {
        openStates[currentPage] = []
      }
      if (typeof openStates[currentPage][index] === 'undefined') {
        openStates[currentPage][index] = false
      }

      openStates[currentPage][index] = !openStates[currentPage][index]
    }

    let search = ref('')
    let filteredWords = computed(() => {
      const keyword = search.value.trim()
      if (keyword) {
        return wordDicts.filter((f) => {
          return f.word.includes(keyword) || f.meaning.includes(keyword)
        })
      } else {
        return wordDicts
      }
    })

    const checkExists = computed(() => {
      return filteredWords.value.length > 0
    })

    let currentPage = ref(1)
    const perPage = 6
    const maxVisible = 4

    const totalPages = computed(() => {
      return Math.ceil(filteredWords.value.length / perPage)
    })

    const visiblePages = computed(() => {
      const start = Math.max(currentPage.value - 1, 0)
      const end = Math.min(start + maxVisible, totalPages.value)

      return Array.from({ length: end - start }, (_, i) => start + i + 1)
    })

    const showPages = computed(() => {
      const start = (currentPage.value - 1) * perPage
      const end = start + perPage
      return filteredWords.value.slice(start, end)
    })

    return {
      words,
      filteredWords,
      search,
      checkExists,
      showPages,
      currentPage,
      totalPages,
      visiblePages,
      openStates,
      toggle,
    }
  },
}
</script>

<style></style>
