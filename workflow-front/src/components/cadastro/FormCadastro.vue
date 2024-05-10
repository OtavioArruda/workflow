<template>
    <div id="main">
        <div class="sessao-form">
            <div class="chamada-login">
                <span>Faça seu cadastro!</span>
            </div>

            <form @submit.prevent="userCreated">
                <div class="inputs-texto">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="name" name="name" required>

                    <label for="email">E-mail:</label>
                    <input type="text" id="email" v-model="email" name="email" required>

                    <label for="password">Senha:</label>
                    <input type="password" id="password" v-model="password" name="password" required>
                </div>

                <div class="direciona-telas">
                    <input type="submit" value="Cadastrar">
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { createdUser } from '@/ajax/login-requests';

let name = ref('');
let email = ref('');
let password = ref('');

const userCreated = () => {    
    let dados = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    createdUser(dados);

    name.value = "";
    email.value = "";
    password.value = "";
}


</script>

<style scoped>
#main {
    width: 100%;
    padding-top: 200px;
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
    font-size: 15px;
}


.chamada-login {
    width: 100%;
    text-align: center;
}

.sessao-form {
    width: 600px;
    border: none;
    border-radius: 10px;
    padding-bottom: 100px;
    background-color: white;
    box-shadow: -20px 10px 10px #ffffff;
    margin: 0 auto;
    padding: 20px 0;
    box-shadow: 0 10px 10px rgb(178, 255, 178);
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

.sessao-form input[type="text"],
.sessao-form input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 2px solid #00440e;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;
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
</style>