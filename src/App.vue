<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <nav class="">
      <router-view></router-view>
    </nav>
  </div>
</template>

<style scoped></style>
