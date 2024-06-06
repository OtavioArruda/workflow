<template>
    <div id="main">
        <div class="sessao-form">
            <v-form fast-fail @submit.prevent="executeUserCreated">
                <v-card
                    style="margin-top: 200px;"
                    class="mx-auto pa-12 pb-12 chamada-login"
                    elevation="8"
                    max-width="600"
                    rounded="lg"
                >
                    <div>
                    <span>Faça seu cadastro!</span>
                    </div>
                    
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">E-mail</div>
            
                    <v-text-field
                    density="compact"
                    placeholder="Email"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    required
                    :rules="emailRules"
                    v-model="email"
                    ></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Nome</div>
            
                    <v-text-field
                    density="compact"
                    placeholder="Nome"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    :rules="nameRules"
                    required
                    v-model="name"
                    ></v-text-field>
            
                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Senha
                    </div>
            
                    <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    v-model="password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    required
                    :rules="passRules"
                    @click:append-inner="visible = !visible"
                    ></v-text-field>

                    <v-btn
                    v-btn class="mt-5 cadastrar" 
                    type="submit" 
                    block
                    >
                    Cadastrar
                    </v-btn>
            
                </v-card>
            </v-form>
        </div>
        <v-alert class="alert-top" v-if="state.successMessage" type="success" color="success" icon="$success">
            Usuário Criado
        </v-alert>
        <v-alert class="alert-top" v-if="state.errorMessage" type="error" color="error" icon="$error">
            Erro ao criar Usuário
        </v-alert>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import { createdUser } from '@/ajax/login-requests';
import { useRouter } from 'vue-router';

let visible = ref(false);

const name = ref('');
const email = ref('');
const password = ref('');
const state = reactive({
    successMessage: false,
    errorMessage: false
});
const router = useRouter();


let validates = {
    name: ref(false),
    email: ref(false),
    pass: ref(false)
}

const nameRules = [
    value => {
        if (value) {
            validates.name = true;
            return true;
        }

        validates.name = false;
        return 'Nome requerido.';
    },
];

const passRules = [
    value => {
        if (value) {
            validates.pass = true;
            return true
        }

        validates.pass = false;
        return 'Senha requerida.';
    },
];

const emailRules = [
    value => {
        if (value) {
            validates.email = true;
            return true;
        }

        validates.email = false;
        return 'E-mail requerido.';
    },
    value => {
        if (/.+@.+\..+/.test(value)) {
            validates.email = true;
            return true;
        }

        validates.email = false;
        return 'E-mail inválido.';
    },
];

const userCreated = async () => {  
    const dados = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    try {
        if(validates.name && validates.pass && validates.email) {
            const response = await createdUser(dados);
            if (response.data) {
                state.successMessage = true;
                state.errorMessage = false;
                setTimeout(() => {
                    state.successMessage = false;
                }, 3000);
            }

            name.value = "";
            email.value = "";
            password.value = "";
        }
        
    } catch (error) {
        state.successMessage = false;
        state.errorMessage = true;
        setTimeout(() => {
            state.errorMessage = false;
        }, 3000);
    }  
}

const executeUserCreated = async () => {
    await userCreated();
    await nextTick();
}

</script>

<style scoped>
#main {
    width: 100%;
    background-color: white;
}

span {
    font-size: 35px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bolder;
}

label {
    font-weight: bolder;
    font-size: 15px;
}


.chamada-login {
    width: 100%;
    text-align: center;
}

.sessao-form {
    width: 100%;
    height: 100vh;
    background-color: #57ce8d;
    border-bottom-right-radius: 100%;
}

.cadastrar{
    font-size: 15px;
    display: flex;
    width: 50%;
    justify-content: center;
    padding: 15px 0px;
    border-radius: 24px;
    background-color: #57ce8d;
    color: white;
    border: solid 1px #57ce8d;
    cursor: pointer;
    font-weight: bolder;
    margin: 20px 0;
}

.inputs-texto {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: 80%;
}

form {
    display: flex;
    flex-direction: column;
}


.direciona-telas {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-top: 30px;
}

.alert-top {
  position: fixed;
  top: 20px;
  left: 85%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 20%;
}
</style>
