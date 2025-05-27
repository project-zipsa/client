<template>
  <div class="bg-[#FAFAFA]">
    <header class="header">
      <router-link to="/">
        <div class="flex">
          <img :src="zipsaIcon" alt="" class="pr-3" />
          <div class="flex pt-2">
            <p class="text-yellow-300 text-3xl font-bold">ZIP</p>
            <p class="text-3xl font-bold">SA</p>
          </div>
        </div>
      </router-link>

      <nav class="nav">
        <div class="auto-links flex gap-5 text-xl">
          <router-link to="/login">LOGIN</router-link>
          <router-link to="/join">JOIN</router-link>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
import zipsaIcon from '@/assets/zipsa.svg'
import { useRoute } from 'vue-router'
export default {
  name: 'HeaderComponent',
  setup() {
    const currentRoute = useRoute()
    return {
      zipsaIcon,
      currentRoute,
    }
  },
}
</script>
<style>
.header {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  border-bottom: 1px solid #ddd;
}
</style>
