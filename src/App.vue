<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div>
    <Header />
    <nav>
      <router-view></router-view>
    </nav>
  </div>
</template>

<style scoped></style>
