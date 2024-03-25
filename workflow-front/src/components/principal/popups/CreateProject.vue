<template>
    <div id="popup-overlay" :class="{ 'active-popup': store.state.popup_render }">
        <div id="popup-add-project">
            <input type="text" class="name-project" placeholder="Nome do projeto">
            <div class="participants">
                <input type="text" placeholder="Email do participante">
            </div>
            <div class="buttons-project">
                <button class="cancel-project" @click="CancelProject">Cancelar</button>
                <button class="create-project">Criar Projeto</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore()

function CancelProject() {
    store.state.popup_render = !store.state.popup_render
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
    background-color: #25442f;
    z-index: 10000;
}

.active-popup {
    display: none;
}

input {
    width: 300px;
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid rgb(7, 194, 7);
    margin-bottom: 10px;
    background-color: #172b1d;
    color: white;
}


.participants {
    min-height: 140px;
    background-color: #172b1d;
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
    background-color: #00ec23;
}

.cancel-project {
    width: 140px;
    border-radius: 15px;
    border: none;
    padding: 5px 10px;
    background-color: #528160;
}
</style>