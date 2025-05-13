<template>
  <div>
    <div class="flex bg-[#FFD43B] p-5">
      <router-link
        to="/docu/upload"
        class="flex bg-[#FFF9E3] p-5 w-80 rounded-[30px_0_0_30px] border-[0.5px] border-solid border-[black]"
      >
        <img src="@/assets/c-before.svg" alt="" class="pr-4" />
        <button class="font-light">내 계약 분석하기</button>
      </router-link>
      <router-link
        to="/"
        class="flex bg-[#FFF9E3] p-3 w-80 rounded-[0_30px_30px_0] border-[0.5px] border-solid border-[black]"
      >
        <img src="@/assets/c-after.svg" alt="" class="pr-4" />
        <button class="font-light">시세 정보 알아보기</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style></style>
