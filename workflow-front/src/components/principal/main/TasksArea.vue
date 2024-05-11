<template>
    <div id="principal">
        <SubheaderTasks />

        <img id="logo" src="../../../assets/empty-box.png" alt="" v-if="tasksActive.data === ''">
        <div id="tasks">
            <div id="task-area" v-if="tasksActive.data.length > 0" v-for="(column, idx_column) in tasksActive.data" :key="idx_column">
                <div class="info-column">
                    <h4>
                        {{ column.name }}
                    </h4>
                    <div class="actions-task">
                        <i class="fas fa-plus add-task" @click="taskCreated(column._id)"></i>
                        <i class="fa-solid fa-trash remove-task" @click="columnDelete(column._id)"></i>
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
import { createColumn, addTasks, deleteColumn } from '@/ajax/main-requests';
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

// const taskCreated = (idColumn) => {
//     let dados = {
//         title: "Bug cadastro",
//         description: "Corrigir bug na tela de cadastro",
//         columnId: idColumn
//     };

//     addTasks(dados, store);
// }

const taskCreated = (columnId) => {
    store.popupTask = !store.popupTask;

    store.idColumn = columnId;
}

const columnDelete = (idColumn) => {
    let idProject = tasksActive.value.idProject;
    let idFolder = tasksActive.value.idFolder;

    deleteColumn(idProject, idFolder, idColumn, store);
}

</script>

<script>
export default {
    methods: {
        dragStart(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
        },

        dragOver(event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        },

        onDrop(event) {
            event.preventDefault();
            var data = event.dataTransfer.getData("text/plain");
            event.target.appendChild(document.getElementById(data));
        }
    }
}

</script>

<style scoped>
#principal {
    max-width: 100%;
    margin-top: 100px;
}

#logo {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
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
    background-color: #a9afb0;
    border-radius: 5px;
    border: 3px solid #a9afb0;
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
    color: #283e37;
    padding: 8px;
    font-size: 17px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.about-task {
    background-color: white;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0px 1px 1px black;
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
    background-color: #57ce8d;
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