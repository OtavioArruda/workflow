<template>
  <div class="cb">
    <header>
      <img id="logo" src="../../assets/logo-tipo.png" alt="">
      <div class="direciona-login">
        <span>
          Possui uma conta?
        </span>
        <button @click="LoginDirect" id="entrar-conta">
          Entrar
        </button>
      </div>
    </header>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';


const props = defineProps ({
  LoginDirect: Function
})

</script>


<style scoped>

.cb {
  z-index: 1;
}

header {
  width: 100%;
  display: flex;
  top: 0;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  z-index: 1;
  background-color: white;
  box-shadow: 0px -5px 20px black;
}

#logo {
  width: 80px;
}

.direciona-login {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#entrar-conta {
  padding: 10px 15px;
  border: none;
  width: 150px;
  font-size: 15px;
  border-radius: 5px;
  color: white;
  box-shadow: 3px 3px 10px rgb(0, 145, 92);
  background-color: rgb(0, 102, 25);
}

#entrar-conta:hover {
  transform: scale(1.05);
  transition: 0.5s;
}

span {
  font-weight: bold;
  font-size: 15px;
}
</style>