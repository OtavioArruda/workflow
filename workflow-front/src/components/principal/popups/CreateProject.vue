<template>
    <div id="popup-overlay" :class="{ 'active-popup': store.popupRender }">
        <div id="popup-add-project">
            <input type="text" v-model="nameProject" class="name-project" placeholder="Nome do projeto">

            <div class="participants">
                <input type="text" v-model="email" placeholder="Email do participante">
            </div>

            <div class="buttons-project">
                <button class="cancel-project" @click="cancelProject">Cancelar</button>
                <button class="create-project" @click="createdProject">Criar Projeto</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref } from 'vue';
import axios from 'axios';

const nameProject = ref('');
const email = ref('');

const store = useGlobalsStore();

const cancelProject = () => {
    store.popupRender = !store.popupRender;
}

const createdProject = async () => {
    try {

        let dados = {
            name: nameProject.value
        };
        
        store.popupRender = !store.popupRender;

        const response = await axios.post(
            'http://localhost:3000/projects',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
    }
    catch (error) {

    }
}
</script>

<style scoped>
#popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

#popup-add-project {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    border-radius: 10px;
    background-color: #283739;
    z-index: 10000;
}

.active-popup {
    display: none;
}

input {
    width: 300px;
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid #a9c52f;
    margin-bottom: 10px;
    background-color: #3d4b4c;
    color: white;
}


.participants {
    min-height: 140px;
    background-color: #3d4b4c;
    border-radius: 10px;
    margin-bottom: 20px;
}

.buttons-project {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

button:hover {
    transform: scale(1.03);
    transition: 0.3s;
}

.create-project {
    width: 140px;
    border-radius: 15px;
    border: none;
    padding: 5px 10px;
    background-color: #a9c52f;
}

.cancel-project {
    width: 140px;
    border-radius: 15px;
    border: none;
    padding: 5px 10px;
    background-color: #2c5d63;
}
</style>