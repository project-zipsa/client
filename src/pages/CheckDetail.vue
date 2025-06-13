<template>
  <div class="bg-[#FFF9E3]">
    <div class="flex bg-[#FFD43B] p-4">
      <router-link
        to="/checklist/1"
        class="flex bg-[#FFF9E3] p-3 w-80 rounded-[30px_0_0_30px] border-[0.5px] border-solid border-[black] shadow hover:shadow-lg transition"
        :class="{ 'border-b-2 border-gray-500': currentCheck == 1 }"
      >
        <img src="@/assets/c-before.svg" alt="" class="pr-4" />
        <button class="font-light">계약 전 체크리스트</button>
      </router-link>
      <router-link
        to="/checklist/2"
        class="flex bg-[#FFF9E3] p-3 w-80 border-[0.5px] border-solid border-[black] shadow hover:shadow-lg transition"
        :class="{ 'border-b-2 border-gray-500': currentCheck == 2 }"
      >
        <img src="@/assets/c-ing.svg" alt="" class="pr-4" />
        <button class="font-light">계약 진행 중 체크리스트</button>
      </router-link>
      <router-link
        to="/checklist/3"
        class="flex bg-[#FFF9E3] p-3 w-80 rounded-[0_30px_30px_0] border-[0.5px] border-solid border-[black] shadow hover:shadow-lg transition"
        :class="{ 'border-b-2 border-gray-500': currentCheck == 3 }"
      >
        <img src="@/assets/c-after.svg" alt="" class="pr-4" />
        <button class="font-light">계약 후 체크리스트</button>
      </router-link>
    </div>

    <div class="px-10 pt-6 pb-0">
      <div class="p-3 py-5 z-0 bg-white rounded">
        <div class="flex justify-between">
          <h2 class="p-2 pb-6 pl-12 text-2xl">전체 진행률</h2>
          <p class="font-light text-3xl pr-116">{{ progressBar[currentRoute.params.id] }}%</p>
        </div>

        <div class="pl-8">
          <div class="h-4 w-[95%] bg-[#E5E7EB33] rounded-[20px] p-1">
            <div
              class="h-4 bg-[#2563EB] rounded-[20px] transition-all duration-500 ease-in-out"
              :style="{ width: progressBar[currentRoute.params.id] + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 p-10 h-[70vh]">
      <section class="bg-white px-4 overflow-y-auto h-full">
        <div
          v-for="(item, index) in checkInfo"
          :key="index"
          class="flex p-8 font-light gap-2 border-b-gray-200 border-b-2"
        >
          <input
            type="checkbox"
            :id="index"
            @change.prevent="toggleCheck(index, $event)"
            :checked="checkStatesById[currentRoute.params.id]?.[index]"
            class=""
          />
          <label class="inline text-base pt-[1px] hover:cursor-pointer" :for="index">
            {{ item.description }}
          </label>
          <span class="relative group cursor-pointer pt-[3px]">
            <img src="@/assets/info.svg" alt="" class="w-5 h-5" />
            <div
              class="absolute top-1/2 left-full ml-3 w-[700px] p-3 pl-7 bg-[#FFF9E3] rounded-lg shadow-md text-sm hidden group-hover:block transform -translate-y-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-50"
            >
              <h2 class="font-bold">어떻게 확인하나요?</h2>
              <div class="pb-4">{{ item.info.how }}</div>

              <h2 class="font-bold">예방 가능한 사기유형</h2>
              <div v-for="(item, index) in item.info.prevent" :key="index">- {{ item }}</div>
            </div>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import checklists from '@/assets/js/checklist-info'
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'detail',
  setup() {
    const currentRoute = useRoute()
    let currentCheck = ref(currentRoute.params.id)

    const checkInfo = computed(() => {
      return checklists[currentRoute.params.id]
    })
    const checkStatesById = ref({})
    const progressBar = ref({})

    function toggleCheck(index, event) {
      const id = currentRoute.params.id
      checkStatesById.value[id][index] = event.target.checked

      const states = checkStatesById.value[id] || []
      const checkedCount = states.filter(Boolean).length
      const total = checklists[id].length
      progressBar.value[id] = parseInt((checkedCount / total) * 100)
    }

    watch(
      () => currentRoute.params.id,
      (newId) => {
        currentCheck.value = newId
        if (!checkStatesById.value[newId]) {
          checkStatesById.value[newId] = Array(checklists[newId].length).fill(false)
          progressBar.value[newId] = 0
        }
      },
      {
        immediate: true,
      },
    )

    return {
      checkInfo,
      checkStatesById,
      toggleCheck,
      progressBar,
      currentRoute,
      currentCheck,
    }
  },
}
</script>
<style></style>
