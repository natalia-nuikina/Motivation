<script setup>
  import store from '../store.js';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const onFinish = values => {
    router.replace('/');
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
</script>
<template>
  <div class="background">
    <a-card class="card" :bordered="false">
      <h1>Войти</h1>
      <a-form
        class="form"
        :model="store.logInData"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Имя пользователя"
          name="username"
          :rules="[{ required: true, message: 'Заполните имя пользователя' }]"
        >
          <a-input v-model:value="store.logInData.username" />
        </a-form-item>

        <a-form-item
          label="Пароль"
          name="password"
          :rules="[{ required: true, message: 'Заполните пароль' }]"
        >
          <a-input-password v-model:value="store.logInData.password" />
        </a-form-item>

        <a-form-item class="submit">
          <a-button type="primary" html-type="submit">Войти</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<style scoped>
  .card {
    display: flex;
    justify-content: center;
  }
  .form {
    display: flex;
    flex-direction: column;
  }
  /* h1 {
    align-self: center;
  } */
  .background {
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submit {
    align-self: flex-end;

  }
</style>
