<template>
  <div>
    <header class="header">
      <div class="home-icon">
        <h1>ZIPSA IMAGE</h1>
      </div>
      <nav class="nav">
        <div class="menu">
          <a href="">MENU1</a>
          <a href="">MENU2</a>
          <a href="">MENU3</a>
        </div>
        <div class="auto-links">
          <a href="">LOGIN</a>
          <a href="">JOIN</a>
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
}
</script>
<style>
.header {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}
</style>
