<template>
  <div class="bg-[#FAFAFA]">
    <header class="header">
      <router-link to="/">
        <div class="flex">
          <img :src="zipsaIcon" alt="" class="pr-3 w-[100%] h-[80%]" />
          <div class="flex pt-2">
            <p class="text-yellow-300 text-2xl font-bold">ZIP</p>
            <p class="text-2xl font-bold">SA</p>
          </div>
        </div>
      </router-link>

      <nav class="nav">
        <div class="auto-links flex gap-5 text-xl">
          <div v-if="!isLogin">
            <router-link to="/login" class="pr-4">LOGIN</router-link>
            <router-link to="/join" class="pr-4">JOIN</router-link>
          </div>

          <div v-else>
            <span> {{ nickname }}님, 환영합니다. </span>
            <span>
              <router-link to="/mypage">My Account / </router-link>
              <button>logout</button>
            </span>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<script setup>
import zipsaIcon from '@/assets/zipsa.svg'
import { useLoginStore } from '@/stores/users/login'
import { useInfoStore } from '@/stores/users/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
const userStore = useInfoStore()
const loginStore = useLoginStore()

const isLogin = computed(() => loginStore.contents?.isLogin)
const nickname = computed(() => userStore.contents?.username)
</script>
<style>
.header {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  border-bottom: 1px solid #ddd;
}
</style>
