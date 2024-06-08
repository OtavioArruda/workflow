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
                            <span v-else :title="column.name">
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
                    <draggable
                        :list="column.tasks"
                        group="tasks"
                        item-key="id"
                        animation="200"
                        :move="onMove"
                    >
                        <template #item="{ element }">
                            <div>
                                <div class="about-task">

                                    <div class="header-task" :key="element._id">
                                        <span class="flag" :title="element.badges[0].text" :style="{ 'background-color': element.badges[0].color }" >
                                            {{ element.badges[0].text }}
                                        </span>

                                        <h5 class="title" :title="element.title">
                                            {{ element.title }}
                                        </h5>

                                        <v-menu>
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon="mdi-dots-vertical mdi" v-bind="props"></v-btn>
                                            </template>

                                            <v-list>
                                            <v-list-item>
                                                <v-list-item style="cursor: pointer;" @click="taskUpdate(column._id, element._id)">Editar</v-list-item>
                                                <v-list-item style="cursor: pointer;" @click="taskDelete(element._id, column._id)">Excluir</v-list-item>
                                            </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </div>

                                    <div class="desc">
                                        <textarea style="resize: none; width: 100%;" rows="2" disabled class="disabled-textarea">{{ element.description }}</textarea>
                                    </div>

                                    <div style="display: flex; justify-content: space-between;">
                                        <div class="dates">
                                            <span>{{ formatDate(element.start_at) }} a {{ formatDate(element.end_at) }}</span>
                                        </div>
                                        <v-icon v-if="element.participants.includes(store.idUser)" icon="mdi-information" color="green"></v-icon>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>

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
        <ConfigProject />
        <UpdateTask />
    </div>
</template>

<script setup>
import SubheaderTasks from '../partials/SubheaderTasks.vue';
import CreateTask from '../popups/CreateTask.vue';
import UpdateTask from '../popups/UpdateTask.vue';
import { useGlobalsStore } from '@/store';
import { createColumn, deleteColumn, updateColumn, deleteTask, searchParticipants, updateProject, updateFolder } from '@/ajax/main-requests';
import { toRefs, ref, onMounted } from 'vue';
import ConfigProject from '../popups/ConfigProject.vue';
import draggable from 'vuedraggable';

const store = useGlobalsStore();
const { tasksActive } = toRefs(store);

// onMounted(() => {
//   store.$subscribe((mutation, state) => {
//     console.log(mutation);
//     console.log(state);
//   });
// })

const columnCreated = () => {
    const dados = {
        name: 'Nova Coluna',
        folderId: tasksActive.value.idFolder
    };

    createColumn(dados, store, tasksActive.value.idProject, tasksActive.value.idFolder);
}

const taskCreated = (columnId) => {
    store.popupTask = !store.popupTask;

    store.idColumn = columnId;
}

const columnDelete = (idColumn) => {
    const idProject = tasksActive.value.idProject;
    const idFolder = tasksActive.value.idFolder;

    deleteColumn(idProject, idFolder, idColumn, store);
}

const taskUpdate = async (idColumn, idTask) => {
    try {
        const columns = tasksActive.value.data;
        for(let idxCol = 0; idxCol < columns.length; idxCol++) {
            if(idColumn == columns[idxCol]._id) {
                const tasks = columns[idxCol].tasks;

                for(let idxTask = 0; idxTask < tasks.length; idxTask++) {
                    if(idTask == tasks[idxTask]._id) {
                        store.task = tasks[idxTask];
                    }
                }
            }

        }

        const participantsTask = store.task.participants;
        const stateParticipants = [];

        for(let idxParticipant = 0; idxParticipant < participantsTask.length; idxParticipant++) {
            const idUser = participantsTask[idxParticipant];
            const user = await searchParticipants(store, idUser);

            console.log(user);

            if(user !== false) {
                stateParticipants.push(user.email);
            }
            else {
                // ???????????????
                // rules = [() => 'Usuário não encontrado.'];
            }
        }

        store.participantsTask = stateParticipants;
        store.idTask = idTask
        store.popupTaskUpdate = true;
    }
    catch(error) {
        console.log(error);
    }
}

const formatDate = (dateString) => {
    const date = new Date(dateString);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if(day < 10) {
        day = `0${  day}`;
    }
    if(month < 10) {
        month = `0${  month}`;
    }

    return `${day  }/${  month  }/${  year}`;
}

const editName = (column) => {
    column.editing = true;
};

const endEditing = (column, idColumn, eventType) => {
    if(eventType === 'enter') {
        column.editing = ref(false);

        const newColumns = column.name;

        const data = {
            name: newColumns
        }

        updateColumn(data, idColumn, store);
    }
};

const taskDelete = (idTask, idColumn) => {
    deleteTask(tasksActive.value.idProject, tasksActive.value.idFolder, idColumn, idTask, store);
}

const onMove = async () => {
    console.log(store.projectActive.folders[0]._id);

    for(const column of store.projectActive.folders[0].columns) {
        console.log(column);

        await updateColumn(column, column._id, store);

        // if(res && res.status == 200) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    }
}

</script>

<style scoped>
#principal {
    max-width: 100%;
    margin-top: 120px;
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
    background-color: #353535;
    border-radius: 5px;
    border: 3px solid #383838;
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

.title,
.flag {
    font-size: 20px;
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.desc {
    font-size: 15px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
}

.disabled-textarea::-webkit-scrollbar {
    width: 10px;
}

.disabled-textarea::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.disabled-textarea::-webkit-scrollbar-thumb {
    background: #888;
}

.disabled-textarea::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>