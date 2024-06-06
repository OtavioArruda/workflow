<template>
  <div id="body">
    <section class="login">

      <div class="sessao-sobre">
        <h1>Bem-vindo ao WorkFlow: Seu Gerenciador de Tarefas Eficiente!</h1>

        <img class="avatar-trabalho" src="../../assets/home-hero.png" alt="">
      </div>

      <div class="sessao-form">
        <v-form fast-fail @submit.prevent="executeProjectLogin">
          <v-card
            class="mx-auto pa-12 pb-12 chamada-login"
            elevation="8"
            max-width="500"
            rounded="lg"
          >
            <div>
              <span>Faça seu login!</span>
            </div>
            
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">E-mail</div>
      
            <v-text-field
              density="compact"
              placeholder="Email address"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="email"
            ></v-text-field>
      
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Senha
            </div>
      
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              v-model="pass"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <v-card-text class="text-center">
              <a
                class="text-blue text-decoration-none"
                href="#"
                rel="noopener noreferrer"
                target="_self"
                @click="directsRegistration"
              >
                Ainda não tenho uma conta <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
      
            <v-btn
              v-btn class="mt-2 log-in" 
              type="submit" 
              block
            >
              Entrar
            </v-btn>
    
          </v-card>
        </v-form>
      </div>

    </section>

    <section class="about">
      <div>

      </div>

      <div id="container">
        <div class="box" style="height: 700px; width: 100%; background: black; margin-bottom: 12px; text-align: center;">
          <h2 style="
            font-size: 56px;
            color: white;
            margin-top: 40px;
            font-family: Arial, Helvetica, sans-serif;">
            Gestão de Projetos
          </h2>
          <p style="
            font-size: 28px;
            color: white;
            padding: 20px;
            margin-top: 4px;">
            Organize suas tarefas em projetos personalizados para uma visão global e organizada de suas atividades.
          </p>
        </div>
        <div class="box" style="height: 700px; width: 100%; background: #1d2125; margin-bottom: 12px; text-align: center;">
          <h2 style="
            font-size: 56px;
            color: white;
            margin-top: 40px;
            font-family: Arial, Helvetica, sans-serif;">
            Colaboração em Equipe
          </h2>
          <p style="
            font-size: 28px;
            color: white;
            padding: 20px;
            margin-top: 4px;">
            Trabalhe em equipe de forma integrada, atribuindo tarefas, compartilhando arquivos e mantendo uma comunicação fluida.
          </p>
        </div>
        <div class="box" style="height: 700px; width: 100%; background: #57ce8d; text-align: center;">
          <h2 style="
            font-size: 56px;
            color: white;
            margin-top: 40px;
            font-family: Arial, Helvetica, sans-serif;">
            Definição de prazos
          </h2>
          <p style="
            font-size: 28px;
            color: white;
            padding: 20px;
            margin-top: 4px;">
            Fique sempre atualizado sobre prazos, status de tarefas e novas atribuições, mantendo-se focado e produtivo.
          </p>
        </div>
      </div>
      
    </section>

    <v-alert class="alert-top" v-if="state.successMessage" type="error" color="error" icon="$error">
        Login ou senha Incorretos
    </v-alert>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';
import { useRouter } from 'vue-router';
import { accessAccount } from '@/ajax/login-requests';
import { ref, reactive, nextTick } from 'vue';
const state = reactive({
    successMessage: false,
});

const router = useRouter();
let visible = ref(false);

const email = defineModel('email');
const pass = defineModel('pass');

let show1 = ref(false);
let password = 'Password'
let rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
  emailMatch: () => (`The email and password you entered don't match`),
};

const props = defineProps({
  directsRegistration: Function
});

const acountAccess = async () => {
  try {
    const login = {
      email: email.value,
      password: pass.value
    }

    const access = await accessAccount(login, router);
    
    if (access.data) {
    email.value = "";
    pass.value = "";
    }
  } 
  catch (error) {
    state.successMessage = true;
      setTimeout(() => {
        state.successMessage = false;
    }, 3000);
    location.reload();
  }
}

window.addEventListener('scroll', function() {
  const boxes = document.querySelectorAll('.box');
  
  boxes.forEach(function(box) {
    const boxTop = box.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (boxTop < windowHeight * 0.8) {
      box.classList.add('slide-in');
    } else {
      box.classList.remove('slide-in');
    }
  });
});


const executeProjectLogin = async () => {
  await acountAccess();
  await nextTick();
}


</script>

<style scoped>
.login {
  display: flex;
  z-index: 0;
  min-height: 100vh;
  background: linear-gradient(to right, #225338, #5eda95, #57ce8d);
  background-size: 300% 300%;
  animation: gradients 7.5s ease infinite;
  border-bottom-right-radius: 100%;
  box-shadow: -5px 0px 10px green;
}

.avatar-trabalho {
  margin-top: 60px;
  width: 100%;
  filter: hue-rotate(120deg);
}

#body {
  background-color: #f4f5f6;
}

span {
  font-size: 35px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bolder;
  color: rgb(64, 64, 64);
}

label {
  color: rgb(82, 89, 96);
  margin-bottom: 4px;
  font-size: 15px;
}

#email::placeholder {
  color: rgb(179, 177, 177);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

h1 {
  background-color: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 40px;
  font-weight: bolder;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-top: 150px;
}

h3 {
  color: white;
}

.chamada-login {
  width: 100%;
  text-align: center;
  margin-top: 200px;
}

.sessao-sobre {
  width: 100%;
  text-align: center;
  max-height: 100%;
  padding: 0px 130px;
  position: relative;
}

.apresentacao {
  display: flex;
  align-items: center;
  margin-top: 100px;
}

.sessao-form {
  width: 90%;
  border: none;
  padding-bottom: 100px;
  border-bottom-left-radius: 10px;
}

.inputs-texto {
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  width: 60%;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 30px;
}

.log-in {
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

.direciona-telas {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.log-in input[type="submit"]:hover {
  transform: scale(1.03);
  transition: 0.5s;
}

.about{
  margin-top: 160px;
  background-color: #f4f5f6;
}

.box {
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-in {
  opacity: 1;
  transform: translateX(0);
}

#container{
  display: flex;
  flex-direction: column;
  align-items: center;
}



@keyframes gradients {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>