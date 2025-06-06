<template>
  <div class="container">
    <div class="wrapper">
      <div class="content-box">
        <div class="">
          <div class="image-layer">
            <div class="yellow-background"></div>

            <div class="center-logo">
              <span class="highlight">Zip</span><span class="bold">sa</span>
            </div>

            <div class="login-box">
              <img
                class="login-logo"
                alt="Vector"
                src="https://c.animaapp.com/mabblbwbXQlf04/img/vector.svg"
              />
              <div class="login-logo-text">
                <span class="highlight">Zip</span><span class="bold">sa</span>
              </div>
              <div class="input-box">
                <input class="input" placeholder="아이디" v-model="userData.loginId" />
              </div>
              <div class="input-box" style="top: 428px">
                <input
                  class="input"
                  type="password"
                  placeholder="비밀번호"
                  v-model="userData.password"
                />
              </div>

              <button class="login-button" @click="login" :disabled="!isFilled">로그인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { userLoginStore } from '@/stores/users/login'
import { userInfoStore } from '@/stores/users/user'
import { computed, reactive, ref } from 'vue'

const loginStore = userLoginStore()
const userStore = userInfoStore()
const { userLogin } = loginStore
const { getUser } = userStore

const userData = reactive({
  loginId: '',
  password: '',
})

const isFilled = computed(() => {
  return userData.loginId && userData.password
})

const login = async () => {
  const result = await userLogin({
    loginId: userData.loginId,
    password: userData.password,
  })
  if (loginStore.statusCode == 200) {
    const accessToken = loginStore.contents.accessToken

    await getUser({ loginId: userData.loginId })
    const userId = userStore.contents.data.userId
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userId', userId)

    router.push('/')
    alert('로그인 성공')
  } else {
    alert(loginStore.contents)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: transparent;
}

.wrapper {
  width: 100%;
  height: 100vh;
}

.content-box {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-layer {
  position: absolute;
  width: 100%;
  height: 1001px;
  top: 0;
  left: 14px;
  background-color: #fff9e3;
}

.image-layer {
  position: absolute;
  width: 100%;
  height: 1024px;
  top: -11px;
  left: 0;
  background-color: #fff9e3;
}

.main-rectangle {
  position: absolute;
  width: 100%;
  height: 897px;
  top: 115px;
  left: 0;
}

.topbar {
  position: absolute;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 45px;
  height: 44px;
  margin-left: 96px;
  margin-top: 28px;
}

.logo-text {
  position: absolute;
  top: 44px;
  left: 153px;
  font-family: 'Pretendard', Helvetica, sans-serif;
  font-size: 22px;
}

.auth-text {
  position: absolute;
  top: 39px;
  left: 1249px;
  font-size: 16px;
  color: #666;
}

.yellow-background {
  position: absolute;
  width: 1440px;
  height: 924px;
  top: 100px;
  left: 0;
  background-color: #fff9e3;
}

.center-logo {
  position: absolute;
  top: 314px;
  left: 679px;
  font-family: 'Pretendard', Helvetica, sans-serif;
  font-size: 28px;
}

.login-box {
  position: absolute;
  width: 633px;
  height: 650px;
  top: 30px;
  left: 386px;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: none;
}

.login-logo {
  position: absolute;
  width: 126px;
  height: 122px;
  top: 132px;
  left: 167px;
}

.login-logo-text {
  position: absolute;
  top: 179px;
  left: 317px;
  font-family: 'Pretendard', Helvetica, sans-serif;
  font-size: 32px;
}

.input-box {
  position: absolute;
  width: 433px;
  left: 95px;
  top: 346px;
}

.input {
  height: 48px;
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;
  padding-left: 16px;
  font-size: 16px;
}

.login-button {
  position: absolute;
  width: 40%;
  height: 48px;
  top: 560px;
  left: 180px;
  background-color: #f1c40f;
  color: #333;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.login-button:hover {
  background-color: #d4aa0d;
}
.login-button:disabled {
  background-color: #f9e79f; /* lighter yellow */
  color: #999;
  cursor: not-allowed;
}

.highlight {
  font-weight: bold;
  color: #f1c40f;
}

.bold {
  font-weight: bold;
  color: black;
}
</style>
