<template>
  <div class="container">
    <div class="content">
      <div class="inner-container">
        <div class="background"></div>

        <!-- Main signup card -->
        <div class="signup-card">
          <!-- Logo in card -->

          <!-- Sign up heading -->
          <div class="signup-heading">회원가입</div>

          <!-- Form fields -->
          <div class="form-container">
            <div v-for="field in formFields" :key="field.id" class="form-field">
              <div class="label">
                <span class="label-text">{{ field.label }}</span>
                <span class="required">*</span>
              </div>
              <input
                :type="field.type || 'text'"
                class="input-field"
                :placeholder="field.placeholder"
                v-model="formData[field.id]"
              />
              <div v-if="field.errorMessage" class="error-message">
                {{ field.errorMessage }}
              </div>
            </div>

            <!-- Sign up button -->
            <button class="signup-button" @click="onSubmit" :disabled="!isFilled">가입하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useJoinStore } from '@/stores/users/join'
import { computed, reactive, ref } from 'vue'
const joinStore = useJoinStore()
const { userJoin } = joinStore

const formData = reactive({
  userName: '',
  loginId: '',
  password: '',
  confirmPassword: '',
})

const isFilled = computed(() => {
  return formData.userName && formData.loginId && formData.password && formData.confirmPassword
})

const validateInputs = () => {
  if (formData.userName.length < 2) {
    alert('이름은 두 글자 이상이어야 합니다.')
    return false
  }

  const idRegex = /^[a-zA-Z0-9]{5,15}$/
  if (!idRegex.test(formData.loginId)) {
    alert('아이디는 5~15자의 영문 대소문자여야 합니다.')
    return false
  }

  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/
  if (!pwRegex.test(formData.password)) {
    alert('비밀번호는 영문 대소문자, 숫자, 특수문자를 각각 하나 이상 포함한 8~16자여야 합니다.')
    return false
  }

  if (formData.password !== formData.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return false
  }
  return true
}

const onSubmit = async () => {
  if (validateInputs()) {
    await join()
  }
}

const join = async () => {
  const result = await userJoin({
    loginId: formData.loginId,
    password: formData.password,
    userName: formData.userName,
  })
  if (joinStore.statusCode == 201) {
    alert('회원가입이 완료되었습니다')
  }
}

const formFields = [
  {
    id: 'userName',
    label: '이름(닉네임)',
    required: true,
    placeholder: '두 글자 이상 입력해주세요',
    errorMessage: '',
  },
  {
    id: 'loginId',
    label: '아이디',
    required: true,
    placeholder: '5~10자의 영문 대/소문자를 사용해 주세요.',
    errorMessage: '',
  },
  {
    id: 'password',
    label: '비밀번호',
    required: true,
    placeholder: '8~16자 영문 대/소문자, 숫자, 특수문자(~!%&#)를 사용해 주세요.',
    errorMessage:
      '비밀번호는 영문 대/소문자, 숫자, 특수문자를 모두 포함한 8~16자리로 설정해주세요.',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    label: '비밀번호 확인',
    required: true,
    placeholder: '비밀번호와 동일하게 입력하셔야 합니다.',
    errorMessage: '', //입력하신 비밀번호와 일치하지 않습니다.
    type: 'password',
  },
]
</script>

<style scoped>
/* Basic CSS */
.container {
  width: 100%;
  background-color: transparent;
}

.content {
  overflow-x: hidden;
  width: 100%;
  height: 1001px;
}

.inner-container {
  position: relative;
  height: 1024px;
  width: 100%;
}

.background {
  position: absolute;
  width: 100%;
  height: 1024px;
  top: 0;
  left: 0;
  background-color: #fff9e3;
}

.logo {
  position: absolute;
  width: 45px;
  height: 44px;
  margin-left: 96px;
  margin-top: 28px;
}

.brand-name {
  position: absolute;
  top: 44px;
  left: 153px;
  font-family: 'Pretendard', Helvetica, sans-serif;
  font-size: 22px;
}

.brand-part1 {
  font-weight: bold;
  color: #f1c40f;
}

.brand-part2 {
  font-weight: bold;
  color: black;
}

.login-join {
  position: absolute;
  top: 39px;
  left: 1249px;
  font-family: 'Pretendard', Helvetica;
  font-size: 16px;
  color: #b0b0b0;
}

.background-overlay {
  position: absolute;
  width: 100%;
  height: 924px;
  top: 100px;
  left: 0;
  background-color: #fff9e3;
}

.signup-card {
  position: absolute;
  width: 633px;
  height: 670px;
  top: 20px;
  left: 389px;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
}

.card-brand-name {
  text-align: center;
  margin-top: 10px;
  font-family: 'Roboto', Helvetica;
  font-size: 22px;
  color: transparent;
}

.card-part1 {
  font-weight: bold;
  color: #f1c40f;
}

.card-part2 {
  font-weight: bold;
  color: black;
}

.signup-heading {
  height: 32px;
  text-align: center;
  margin-top: 36px;

  font-family: 'Pretendard-Bold', Helvetica;
  font-weight: bold;
  font-size: 28px;
  color: #b0b0b0;
}

.form-container {
  margin-top: 35px;
  margin-left: auto;
  margin-right: auto;
  width: 433px;
}

.form-field {
  margin-bottom: 20px;
}

.label {
  margin-bottom: 10px;
  font-family: 'Pretendard-Bold', Helvetica;
  font-weight: bold;
  font-size: 16px;
  color: #b0b0b0;
}

.label-text {
  color: black;
}

.required {
  color: #4f4f4f;
}

.input-field {
  width: 100%;
  height: 48px;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 0 12px;
}

.error-message {
  height: 18px;
  margin-top: 5px;
  font-family: 'Pretendard-Bold', Helvetica;
  font-weight: bold;
  font-size: 12px;
  color: #ff5252;
}

.signup-button {
  width: 100%;
  height: 48px;
  margin-top: 25px;
  background-color: #ffd43b;
  border-radius: 8px;
  text-align: center;
  font-family: 'Pretendard Variable', Helvetica;
  font-weight: 600;
  font-size: 15px;
  color: white;
}
.signup-button:disabled {
  background-color: #f9e79f; /* lighter yellow */
  color: #999;
  cursor: not-allowed;
}
</style>
