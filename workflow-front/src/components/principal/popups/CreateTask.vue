<template>
    <div id="popup">
        <form id="popup-add-task">
            <input type="text" v-model="title" class="title-task" placeholder="Nome da tarefa">

            <input type="text" v-model="description" placeholder="Descrição da Tarefa">

            <input type="date" v-model="start_at">

            <input type="date" v-model="end_at">

            <div class="buttons-task">
                <input type="submit" value="Criar Tarefa">
            </div>
        </form>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';

const store = useGlobalsStore();

</script>

<style scoped>
#popup {
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
    border-radius: 10px;
    background-color: #005b1b;
    z-index: 10000;
}

.active-popup {
    display: block;
}

input {
    width: 300px;
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid #09ff00;
    margin-bottom: 10px;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
}


.participants {
    min-height: 140px;
    background-color: #dcdcdc;
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