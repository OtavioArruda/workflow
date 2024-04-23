<template>
    <div id="principal">
        <SubheaderTasks />

        <div id="tasks">
            <div id="task-area" v-if="tasksActive.data.length > 0" v-for="(column, idx_column) in tasksActive.data" :key="idx_column">
                <div class="info-column">
                    <h4>
                        {{ column.name }}
                    </h4>
                    <div class="actions-task">
                        <i class="fas fa-plus add-task" @click="addTasks(column._id)"></i>
                        <i class="fa-solid fa-trash remove-task" @click="deleteColumn(column._id)"></i>
                    </div>
                </div>
                
                <div class="tasks-list">
                    <div class="about-task" v-for="(task, idx_task) in column.tasks" :key="idx_task">
                        <span class="flag">
                            {{ task.title }}
                        </span>
                        <div class="desc">
                            <p>
                                {{ task.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="tasksActive.project !== ''">
                <button class="create-task" @click="createColumn">
                    <span class="new-task">
                        Nova Coluna
                    </span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import SubheaderTasks from '../partials/SubheaderTasks.vue';
import { useGlobalsStore } from '@/store';
import { toRefs } from 'vue';
import axios from 'axios';

const store = useGlobalsStore();
const { tasksActive, projects } = toRefs(store);

const createColumn = async () => {
    try {
        let dados = {
            name: "Nova Coluna",
            folderId: tasksActive.value.id_folder
        }

        const response = await axios.post(
            'http://localhost:3000/columns',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

const addTasks = async (id_coluna) => {
    try {
        let dados = {
            title: "Bug cadastro",
            description: "Corrigir bug na tela de cadastro",
            columnId: id_coluna
        }

        const response = await axios.post(
            'http://localhost:3000/tasks',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

const deleteColumn = async (id_column) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/columns/${id_column}`,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
#principal {
    max-width: 100%;
    margin-top: 100px;
}

#tasks {
    margin-left: 320px;
    display: flex;
    padding-bottom: 5px;
    min-height: 85vh;
    overflow-y: hidden;
    overflow-x: scroll;
    position: relative;
}

#tasks::-webkit-scrollbar {
    height: 10px;
}

#tasks::-webkit-scrollbar-track {
    margin-left: 20px;
    margin-right: 20px;
    background-color: transparent;
}

#tasks::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}

#task-area {
    min-width: 300px !important;
    margin: 20px 0px 50px 20px;
    background-color: rgb(1, 41, 0);
    border-radius: 10px;
    max-height: 60%;
}

.tasks-list {
    height: 80%;
    overflow-x: hidden;
}

.tasks-list::-webkit-scrollbar {
    width: 10px;

}

.tasks-list::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}

.info-column {
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 20px;
    font-size: 17px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.about-task {
    background-color: white;
    padding: 5px 10px;
    margin: 10px;
    border-radius: 15px;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.actions-task {
    display: flex;
}

.add-task {
    margin-right: 20px;
}

.desc {
    font-size: 18px;
    height: 50px;
    display: flex;
    align-items: center;
}

.term {
    font-size: 12px;
    position: relative;
}

.flag {
    font-size: 12px;
}

.create-task {
    margin: 0 auto;
    width: 250px;
    padding: 10px 15px;
    box-shadow: 5px 5px 5px black;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-weight: bolder;
    color: rgb(53, 52, 52);
    background-color: #00f128;
    margin: 20px 20px 0px 20px;
}

.create-task:hover {
    transform: scale(1.03);
    transition: 0.5s;
}

.add-task {
    font-size: 20px;
    margin-right: 35px;
    margin-left: 10px;
}

.new-task {
    font-size: 17.5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>