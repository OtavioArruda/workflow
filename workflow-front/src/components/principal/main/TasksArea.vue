<template>
    <div id="principal">
        <SubheaderTasks />

        <img id="logo" src="../../../assets/empty-box.png" alt="" v-if="tasksActive.data === ''">
        <div id="tasks">
            <div id="task-area" v-if="tasksActive.data.length > 0" v-for="(column, idx_column) in tasksActive.data" :key="idx_column">
                <div class="info-column">
                    <div
                        :data-value="column.name"
                        style="cursor: pointer;"
                        @dblclick="editName(column)">
                        <span class="name-column" 
                            :class="{ 'editable': column.editing }"
                        >
                            <span v-if="column.editing">
                                <input class="column-edit" v-model="column.name" 
                                    @blur="endEditing(column, column._id, 'blur')"
                                    @keyup.enter="endEditing(column, column._id, 'enter')">
                            </span>
                            <span v-else>
                                {{ column.name }}
                            </span>
                        </span>
                    </div>

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

                            <h5 style="font-size: 15px">
                                {{ task.title }}
                            </h5>

                            <v-btn icon variant="text">
                                <v-icon icon="mdi-dots-vertical mdi" color="black" size="20"/>
                            </v-btn>
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
import { createColumn, deleteColumn, updateColumn } from '@/ajax/main-requests';
import { toRefs, ref } from 'vue';

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

const editName = (column) => {
    column.editing = true;
};

const endEditing = (column, idColumn, eventType) => {
    if (eventType === 'enter'){

        column.editing = ref(false);
        let newColumns = document.querySelector(".column-edit");

        let data = {
            name: newColumns.value
        }
        updateColumn(data, idColumn, store);
    }
};

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
    margin-left: 100px;
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
    align-items: center;
    justify-content: space-between;
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
    min-width: 350px !important;
    margin: 20px 0px 20px 20px;
    background-color: rgb(85 85 85);
    border-radius: 10px;
    height: 77vh;
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
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0px 1px 1px black;
}

.actions-task {
    display: flex;
    align-items: center;
}

.add-task {
    margin-right: 20px;
}

.desc {
    font-size: 15px;
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

.name-column.editable {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 3px;
    color: white;
}

.column-edit{
    color: white;
    border: none;
    max-width: 150px;
}

.column-edit:focus {
    outline: none;
}
</style>