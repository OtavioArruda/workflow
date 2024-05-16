<template>
  <div id="body">
    <section class="login">

      <div class="sessao-sobre">
        <h1>Bem-vindo ao WorkFlow: Seu Gerenciador de Tarefas Eficiente!</h1>

        <img class="avatar-trabalho" src="../../assets/home-hero.png" alt="">
      </div>

      <div class="sessao-form">
        <div class="chamada-login">
          <span>Faça seu login!</span>
        </div>

        <form @submit.prevent="acountAccess">
          <div class="inputs-texto">
            <label for="email">E-mail:</label>
            <input type="text" v-model="email" id="email" name="email" required placeholder="Exemplo: wf@workflow.com.br">

            <label for="password">Senha:</label>
            <input type="password" v-model="pass" id="password" name="password" required>
          </div>

          <div class="direciona-telas">
            <a href="">Esqueceu sua senha?</a>

            <input type="submit" value="Entrar">

            <a href="" @click="directsRegistration">Ainda não tenho uma conta</a>
          </div>
        </form>
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
            Notificações e Lembretes
          </h2>
          <p style="
            font-size: 28px;
            color: white;
            padding: 20px;
            margin-top: 4px;">
            Fique sempre atualizado com notificações automáticas sobre prazos, status de tarefas e novas atribuições, mantendo-se focado e produtivo.
          </p>
        </div>
      </div>
      
    </section>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';
import { useRouter } from 'vue-router';
import { accessAccount } from '@/ajax/login-requests';

const router = useRouter();


let email = defineModel('email');
let pass = defineModel('pass');

const props = defineProps({
  directsRegistration: Function
});

const acountAccess = () => {

    let login = {
      email: email.value,
      password: pass.value
    }

    accessAccount(login, router)
    
    email.value = "";
    pass.value = "";

}

window.addEventListener('scroll', function() {
  let boxes = document.querySelectorAll('.box');
  
  boxes.forEach(function(box) {
    let boxTop = box.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    
    if (boxTop < windowHeight * 0.8) {
      box.classList.add('slide-in');
    } else {
      box.classList.remove('slide-in');
    }
  });
});


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
  margin-top: 100px;
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
  margin-top: 150px;
}

.sessao-sobre {
  width: 100%;
  text-align: center;
  max-height: 100%;
  padding: 0px 150px;
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
  background-color: #f4f5f6;
  border-bottom-left-radius: 10px;
  box-shadow: -5px 0px 10px #f4f5f6;
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

.sessao-form input[type="text"],
.sessao-form input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #bbbcbd;
  border-radius: 8px;
  box-sizing: border-box;
}

label {
  margin-top: 30px;
}

.sessao-form input[type="submit"] {
  font-size: 15px;
  display: flex;
  width: 60%;
  justify-content: center;
  padding: 10px;
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

.sessao-form input[type="submit"]:hover {
  transform: scale(1.03);
  transition: 0.5s;
}

.about{
  margin-top: 200px;
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