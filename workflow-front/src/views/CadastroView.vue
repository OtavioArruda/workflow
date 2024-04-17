<template>
  <div>
    <HeaderCadastro :loginDirect="loginDirect" />
    <FormCadastro :loginDirect="loginDirect" :createdUser="createdUser" />
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

const createdUser = async () => {
    try {
        const response = await axios.post('/users', dados);

        console.log('Usuário criado:', response.data);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};
</script>