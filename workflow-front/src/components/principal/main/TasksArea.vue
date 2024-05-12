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
                        <v-btn icon variant="text" @click="taskCreated(column._id)">
                            <v-icon icon="mdi-plus" color="white" size="25"/>
                        </v-btn>
                        <v-btn icon variant="text" @click="columnDelete(column._id)">
                            <v-icon icon="mdi-delete" color="white" size="20"/>
                        </v-btn>
                    </div>
                </div>
                
                <div class="tasks-list">
                    <div class="about-task" v-for="(task, idx_task) in column.tasks" :key="idx_task">
                        <div class="header-task">
                            <span class="flag" :style="{ 'background-color': task.badges[0].color }" >
                                {{ task.badges[0].text }}
                            </span>

                            <h5 style="margin-left: 50px; font-size: 20px">
                                {{ task.title }}
                            </h5>
                        </div>

                        <div class="desc">
                            <p>
                                {{ task.description }}
                            </p>
                        </div>

                        <div class="dates">
                            <span>{{ formatDate(task.start_at) }} a {{ formatDate(task.end_at) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="tasksActive.project !== ''">
                <button class="create-task" @click="columnCreated">
                    <span class="new-task">
                        Nova Coluna
                    </span>
                </button>
            </div>

        </div>
        <CreateTask />
    </div>
</template>

<script setup>
import SubheaderTasks from '../partials/SubheaderTasks.vue';
import CreateTask from '../popups/CreateTask.vue';
import { useGlobalsStore } from '@/store';
import { createColumn, deleteColumn } from '@/ajax/main-requests';
import { toRefs } from 'vue';

const store = useGlobalsStore();
const { tasksActive } = toRefs(store);

const columnCreated = () => {
    let dados = {
        name: "Nova Coluna",
        folderId: tasksActive.value.idFolder
    };

    createColumn(dados, store, tasksActive.value.idProject, tasksActive.value.idFolder);
}

const taskCreated = (columnId) => {
    store.popupTask = !store.popupTask;

    store.idColumn = columnId;
}

const columnDelete = (idColumn) => {
    let idProject = tasksActive.value.idProject;
    let idFolder = tasksActive.value.idFolder;

    deleteColumn(idProject, idFolder, idColumn, store);
}

const formatDate = (dateString) => {
    let date = new Date(dateString);
    
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    
    return day + '/' + month + '/' + year;
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

.header-task {
    width: 100%; 
    display: flex; 
    align-items: center
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
    min-width: 400px !important;
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
    align-items: center;
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
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.actions-task {
    display: flex;
    align-items: center;
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
    font-size: 15px !important; 
    color: white;
    width: 30% !important;
    text-align: center;
    border-radius: 10px;
}

.dates{
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