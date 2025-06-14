<template>
  <div>{{ filteredResults }}</div>
</template>
<script setup>
import analysisData from '@/assets/js/Analysis'
import { computed } from 'vue'

const analysisResult = {
  '1번 항목': 'True',
  '2번 항목': 'False',
  '3번 항목': 'True',
  '4번 항목': 'A',
  '5번 항목': '불확실',
  '6번 항목': 'False',
  '7번 항목': 'False',
  '8번 항목': 'False',
  '9번 항목': 'False',
  '10번 항목': 'D',
  '11번 항목': 'False',
  '12번 항목': 'False',
}

const filteredResults = computed(() => {
  const result = []
  for (const key of Object.keys(analysisResult)) {
    const val = analysisResult[key]
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
</script>
<style></style>
