<template>
  <div class="cb">

    <header>
      <img id="logo" src="../../assets/logo-tipo.png" alt="">

      <div class="direciona-criacao">
        <span>Não possui uma conta?</span>

        <button id="criar-conta" @click="directsRegistration">
          Criar Conta
        </button>
      </div>

    </header>

  </div>
</template>


<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  directsRegistration: Function
})
</script>


<style scoped>
.cb {
  z-index: 1;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  z-index: 1;
  background-color: #1d2125;
  box-shadow: 0px -5px 20px black;
}

#logo {
  width: 70px;
}

.direciona-criacao {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
}

#criar-conta {
  padding: 10px 15px;
  border: none;
  width: 150px;
  font-size: 15px;
  font-weight: bolder;
  border-radius: 5px;
  color: rgb(53, 52, 52);
  box-shadow: 3px 3px 10px black;
  background-color: #57ce8d;
}

#criar-conta:hover {
  transform: scale(1.05);
  transition: 0.5s;
}

span {
  font-weight: bold;
  font-size: 15px;
}
</style>

