<template>
  <div id="body">
    <main>

      <div class="sessao-sobre">
        <h1>
          Bem-vindo ao WorkFlow: Seu Gerenciador de Tarefas Eficiente!
        </h1>

        <img class="avatar-trabalho" src="../../assets/home-hero.png" alt="">
      </div>

      <div class="sessao-form">

        <div class="chamada-login">
          <span>Faça seu login!</span>
        </div>

        <form>
          <div class="inputs-texto">
            <label for="username">E-mail:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
          </div>

          <div class="direciona-telas">
            <a href="">
              Esqueceu sua senha?
            </a>

            <input type="submit" value="Entrar">

            <a href="" @click="directsRegistration">
              Ainda não tenho uma conta
            </a>
          </div>
        </form>

      </div>

    </main>
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = defineModel('user');
const pass = defineModel('pass');

const props = defineProps({
  directsRegistration: Function
})

</script>

<style scoped>
main {
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
  background: linear-gradient(to right, #012804, #00800d, #00f128);
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
  width: 70%;
  border: none;
  padding-bottom: 100px;
  background-color: white;
  box-shadow: -20px 10px 10px #ffffff;
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