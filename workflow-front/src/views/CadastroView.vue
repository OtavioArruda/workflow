<template>
    <div>
        <HeaderCadastro :LoginDirect = "LoginDirect"/>
        <FormCadastro :LoginDirect = "LoginDirect"/>
    </div>
</template>

<script setup>
import HeaderCadastro from '@/components/cadastro/HeaderCadastro.vue';
import FormCadastro from '@/components/cadastro/FormCadastro.vue';
import { useRouter } from 'vue-router';

const login_router = useRouter();

const LoginDirect = () => {
  login_router.push('/');
}
</script>