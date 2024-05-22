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
            <input type="text" v-model="email" id="email" name="email" required>

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
        <div class="box" style="height: 600px; width: 80%; background: black;"></div>
        <div class="box" style="height: 600px; width: 80%; background: red;"></div>
        <div class="box" style="height: 600px; width: 80%; background: blue;"></div>
      </div>
      
    </section>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';
import { useRouter } from 'vue-router';
import { accessAccount } from '@/ajax/login-requests';

const router = useRouter();


const email = defineModel('email');
const pass = defineModel('pass');

const props = defineProps({
  directsRegistration: Function
});

const acountAccess = () => {

    const login = {
      email: email.value,
      password: pass.value
    }

    accessAccount(login, router)
    
    email.value = "";
    pass.value = "";

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


</script>

<style scoped>
.login {
  display: flex;
  z-index: 0;
  min-height: 100vh;
}

.avatar-trabalho {
  margin-top: 100px;
  width: 100%;
  filter: hue-rotate(120deg);
}

#body {
  background: linear-gradient(to right, #012804, #00800d, #008516);
  background-size: 300% 300%;
  animation: gradients 7.5s ease infinite;
}

span {
  font-size: 35px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bolder;
  color: rgb(0, 102, 25);
}

label {
  color: rgb(0, 102, 25);
  font-weight: bolder;
}

h1 {
  background: linear-gradient(to right, #5ce253, #ffffff);
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
  background-color: white;
  border-bottom-left-radius: 10px;
  box-shadow: -5px 0px 10px #ffffff;
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
  padding: 10px;
  border: 2px solid #00440e;
  border-radius: 5px;
  box-sizing: border-box;
}

label {
  margin-top: 30px;
}

.sessao-form input[type="submit"] {
  font-size: 15px;
  width: 160px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #ffffff;
  color: rgb(0, 102, 25);
  border: solid 3px rgb(0, 104, 26);
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
  margin-top: 30px;
}

.sessao-form input[type="submit"]:hover {
  transform: scale(1.03);
  transition: 0.5s;
}

.about{
  margin-top: 100px;
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