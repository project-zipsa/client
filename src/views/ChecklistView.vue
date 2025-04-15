<template>
  <div class="main_body">
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

    <main class="body">
      <h1 class="title">전세 사기 체크리스트</h1>
      <p>계약 전, 진행 중, 후 체크리스트를 통해 안전하게 계약을 진행하세요.</p>

      <div class="checklist-container">
        <section class="checklist-box">
          <span class="icon"><img src="../../public/beforeChecklistIcon.svg" alt="" /></span>

          <h2>계약 전 체크리스트</h2>
          <p>계약 전, 중요한 법적 사항과 집주인 정보 등을 확인해보세요.</p>
          <button>체크리스트 확인 -></button>
        </section>
        <section class="checklist-box">
          <span><img src="../../public/IngChecklistIcon.svg" alt="" /></span>
          <h2>계약 진행 중 체크리스트</h2>
          <p>계약서 서명전, 주의 기펙 체크해야 할 사항들입니다.</p>
          <button>체크리스트 확인 -></button>
        </section>
        <section class="checklist-box">
          <span><img src="../../public/AfterChecklistIcon.svg" alt="" /></span>
          <h2>계약 후 체크리스트</h2>
          <p>계약 후, 중요한 사후 관리 사항을 점검하세요.</p>
          <button>체크리스트 확인 -></button>
        </section>
      </div>

      <section class="help">
        <h3>추가 도움이 필요하신가요?</h3>
        <span>계약서 관련 도움말</span>
        <span>고객센터 문의</span>
      </section>
    </main>
  </div>
</template>
<script>
export default {}
</script>
<style>
body {
  background-color: #fdfde4;
  margin: 0;
  padding: 0;
}
.header {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}
.home-icon h1 {
  color: #f0c000;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 100px;
}
.nav {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
}

.menu a,
.nav {
  text-decoration: none;
  color: #222;
  font-weight: 500;
  margin: 0 0.5rem;
}
.nav > .auto-links {
  position: absolute;
  right: 300px;
}

.body {
  border: 1px solid red;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1rem;
  margin: 0 auto;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.body > p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
}
.checklist-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.checklist-box {
  display: flex;
  flex-direction: column;
  width: 384px;
  height: 282px;
  padding-top: 4px;
  padding-bottom: 15px;
  justify-content: center;
  align-items: center;
  border-top: 4px solid #10b981;
  border-radius: 12px;
  background: var(--Gray-white, #fff);
  transition: transform 0.2s ease;
}
.checklist-box:nth-child(2) {
  border-top: 4px solid #f97316;
}
.checklist-box:nth-child(3) {
  border-top: 4px solid #3b82f6;
}

.checklist-box:hover {
  transform: translateY(-5px);
}
.checklist-box span {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  padding: 20px 18.5px;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  border: 0px solid var(--Gray-white, #fff);
  background: #d1fae5;
}
.checklist-box:nth-child(2) span {
  background: #ffedd5;
}
.checklist-box:nth-child(3) span {
  background: #dbeafe;
}
.checklist-box h2 {
  font-weight: 400;
}
.checklist-box p {
  padding: 0px 30px 30px 30px;
  height: 30px;
  font-weight: 400;
}
.checklist-box button {
  width: 336px;
  padding: 12px 104px 12px 104px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
  background: #10b981;
}
.checklist-box:nth-child(2) button {
  background: #f97316;
}
.checklist-box:nth-child(3) button {
  background: #3b82f6;
}
.checklist-box button:hover {
  opacity: 0.9;
}
.help {
  margin-top: 3rem;
  padding: 2rem 25rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.help h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.help span {
  margin: 0 1rem;
  color: #3498db;
  font-weight: bold;
  cursor: pointer;
}
</style>
