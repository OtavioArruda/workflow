<template>
  <div>
    <HeaderLogin :directsRegistration="directsRegistration"/>
    <FormLogin :directsRegistration="directsRegistration"/>
  </div>
</template>

<script setup>
import FormLogin from '../components/login/FormLogin.vue';
import HeaderLogin from '../components/login/HeaderLogin.vue';
import { useRouter } from 'vue-router';

const registerRouter = useRouter();

const directsRegistration = () => {
  registerRouter.push('/cadastro');
}

</script>