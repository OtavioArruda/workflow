<template>
  <div>
    <HeaderCadastro :loginDirect="loginDirect" />
    <FormCadastro :loginDirect="loginDirect" />
  </div>
</template>

<script setup>
import HeaderCadastro from '@/components/cadastro/HeaderCadastro.vue';
import FormCadastro from '@/components/cadastro/FormCadastro.vue';
import { useRouter } from 'vue-router';

const loginRouter = useRouter();

const loginDirect = () => {
  loginRouter.push('/');
}
</script>