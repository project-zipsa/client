<template>
  <div class="min-h-screen bg-[#FFF9E3]">
    <div class="flex bg-[#FFD43B] p-5">
      <router-link
        to="/checklist/1"
        class="flex bg-[#FFF9E3] p-5 w-80 rounded-[30px_0_0_30px] border-[0.5px] border-solid border-[black]"
      >
        <img src="@/assets/c-before.svg" alt="" class="pr-4" />
        <button class="font-light">계약 전 체크리스트</button>
      </router-link>
      <router-link
        to="/checklist/2"
        class="flex bg-[#FFF9E3] p-3 w-80 border-[0.5px] border-solid border-[black]"
      >
        <img src="@/assets/c-ing.svg" alt="" class="pr-4" />
        <button class="font-light">계약 진행 중 체크리스트</button>
      </router-link>
      <router-link
        to="/checklist/3"
        class="flex bg-[#FFF9E3] p-3 w-80 rounded-[0_30px_30px_0] border-[0.5px] border-solid border-[black]"
      >
        <img src="@/assets/c-after.svg" alt="" class="pr-4" />
        <button class="font-light">계약 후 체크리스트</button>
      </router-link>
    </div>

    <form action="">
      <div class="bg-white m-8 p-5">
        <div class="flex justify-between">
          <h2 class="font-light p-3 pb-5 text-2xl">전체 진행률</h2>
          <p class="font-light text-3xl">{{ progressBar[currentRoute.params.id] }}%</p>
        </div>

        <div class="h-4 w-[95%] bg-[#E5E7EB33] rounded-[20px]">
          <div
            class="h-4 bg-[#2563EB] rounded-[20px]"
            :style="{ width: progressBar[currentRoute.params.id] + '%' }"
          ></div>
        </div>
      </div>

      <section class="bg-white m-8">
        <div v-for="(item, index) in checkInfo" :key="index" class="p-10 font-light">
          <input
            type="checkbox"
            :id="index"
            @change.prevent="toggleCheck(index, $event)"
            :checked="checkStatesById[currentRoute.params.id]?.[index]"
          />
          {{ item.description }}
        </div>
      </section>
    </form>
  </div>
</template>
<script>
import checklists from '@/assets/checklist-info'
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'detail',
  setup() {
    const currentRoute = useRoute()

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
      progressBar.value[id] = (checkedCount / total) * 100
    }

    watch(
      () => currentRoute.params.id,
      (newId) => {
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
    }
  },
}
</script>
<style></style>
