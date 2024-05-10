<template>
    <div id="popup-overlay-task" :class="{ 'active-popup': store.popupTask }">
        <form id="popup-add-task" @submit="createdTask">

            <div class="info-task">
                <input type="text" data-type="text" v-model="title" class="title-task" placeholder="Nome da tarefa">
    
                <input type="text" data-type="text" v-model="description" placeholder="Descrição da Tarefa">
            </div>

            <div class="dates-task">
                <input type="date" v-model="start_at">

                <input type="date" v-model="end_at">
            </div>

            <div class="badges-task">
                <input type="text" data-type="text" v-model="badge" placeholder="Adicione a badge">
                <input type="color" v-model="badge_color">
            </div>

            <div id="participants-task">
                <input class="add-participant" v-model="participants" data-list="participants" type="text" placeholder="Adicione o participante">
                <div class="participants"></div>
            </div>

            <div class="buttons-task">
                <button class="btn-task" @click="taskCancel">Cancelar</button>
                <input class="btn-task" type="submit" value="Criar Tarefa">
            </div>
        </form>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref } from 'vue';
import { addTasks } from '@/ajax/main-requests';

let title = ref("");
let description = ref("");
let start_at = ref("");
let end_at = ref("");
let badge = ref("");
let badge_color = ref("");
let participants = ref("");

const store = useGlobalsStore();

const taskCancel = (e) => {
    e.preventDefault();
    store.popupTask = !store.popupTask;
}

const createdTask = (e) => {
    e.preventDefault();

    let data = {
        title: title.value,
        description: description.value,
        start_at: start_at.value,
        end_at: end_at.value,
        badge: [{
            text: badge.value,
            color: badge_color.value
        }],
        participants: [],
        columnId: store.idColumn
    }
        
    addTasks(data, store);
}

</script>

<style scoped>
#popup-overlay-task {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

#popup-add-task {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #005b1b;
    z-index: 10000;
}

.active-popup {
    display: none;
}

input[data-type=text], input[type=date] {
    width: 300px;
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid #09ff00;
    margin-bottom: 10px;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}

input[data-list=participants] {
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid #09ff00;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}

.info-task, .dates-task, .badges-task{
    display: flex;
}

.btn-task{
    width: 200px;
}

.participants {
    min-height: 140px;
    background-color: #dcdcdc;
    border-radius: 10px;
    margin-bottom: 20px;
}

#participants-task {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}

.buttons-task {
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
    background-color: #00ff1e;
    font-weight: bolder;
}

.cancel-project {
    width: 140px;
    border-radius: 15px;
    border: none;
    padding: 5px 10px;
    background-color: #ffffff;
    font-weight: bolder;
}
</style>