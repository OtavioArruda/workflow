<template>
    <div id="principal">
        <SubheaderTasks />

        <div id="tasks">
            <div id="task-area" v-if="tasksActive.column.length > 0" v-for="(column, idx_column) in tasksActive.column" :key="idx_column">
                <div class="info-column">
                    <h4>
                        {{ column.name_column }}
                    </h4>
                    <div class="actions-task">
                        <i class="fas fa-plus add-task"></i>
                        <i class="fa-solid fa-trash remove-task"></i>
                    </div>
                </div>
                
                <div class="tasks-list">
                    <div class="about-task" v-for="(task, idx_task) in column.tasks" :key="idx_task">
                        <span class="flag">
                            {{ task.name_task }}
                        </span>
                        <div class="desc">
                            <p>
                                {{ task.description }}
                            </p>
                        </div>
                        <span class="term">
                            {{  }}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <button class="create-task" @click="PopupCreate">
                    <i class="fas fa-plus add-task"></i>
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

const store = useGlobalsStore();
const { tasksActive, projects } = toRefs(store);

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

#tasks {
    margin-left: 275px;
    display: flex;
    overflow-y: hidden;
    padding-bottom: 5px;
    min-height: 80vh;
}

#tasks::-webkit-scrollbar {
    width: 5px;
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
    min-width: 250px !important;
    margin: 20px 0px 0px 20px;
    background-color: #a9afb0;
    border-radius: 5px;
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
    justify-content: flex-start;
    align-items: center;
    border: none;
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