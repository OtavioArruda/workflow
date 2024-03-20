<template>
  <div>
    <HeaderLogin :DirectsRegistration="DirectsRegistration"/>
    <FormLogin :DirectsRegistration="DirectsRegistration"/>
  </div>
</template>

<script setup>
import FormLogin from '../components/login/FormLogin.vue';
import HeaderLogin from '../components/login/HeaderLogin.vue';
import { useRouter } from 'vue-router';

const register_router = useRouter()

function DirectsRegistration(){
  register_router.push('/cadastro')
}

</script>