<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />

  <nav>
    <router-view></router-view>
  </nav>
</template>

<style scoped></style>
