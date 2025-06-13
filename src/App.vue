<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-[#fff9e3]">
    <Header />
    <nav class="bg-[#fff9e3]">
      <router-view></router-view>
    </nav>
  </div>
</template>

<style scoped></style>
