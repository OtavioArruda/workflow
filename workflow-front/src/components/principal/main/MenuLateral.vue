<template>
    <div>
        <div id="menu">
            <div class="sub-header-menu">
                <button class="create-project" @click="popupCreate">
                    <i class="fas fa-plus add-project"></i>
                    <span class="new-project">
                        Novo Projeto
                    </span>
                </button>
            </div>

            <div v-for="(directory, idx) in directorys" :key="idx" class="raiz-directory">
    
                <div class="directory" :class="{ 'active-directory': directorys[idx].expanded }">
                    <h4>
                        {{ directory.name_project }}
                    </h4>
                    <div>
                        <i class="fas fa-plus add-task" @click="createdFolder"></i>
                        <i class="fa-solid fa-angle-down expanded-task" @click="toggleExpanded(idx)"
                            :class="{ 'rotate-90': directorys[idx].expanded }"></i>
                    </div>
                </div>
    
                <div class="area-subdirectory" :class="{ 'render-subdirectory': !directorys[idx].expanded }">
                    <div class="sub-directory" v-for="(subDirectory, id) in directorys[idx].folders" :key="id">
                        <div class="about-tasks" @click="activeTasks(directory.name_project, subDirectory.name_folder, subDirectory.columns)">
                            <i class="fa-solid fa-folder"></i>
                            <span class="name-subdirectory">
                                {{ subDirectory.name_folder }}
                            </span>
                        </div>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>

            </div>
        </div>
        <CreateProject/>
    </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import CreateProject from '@/components/principal/popups/CreateProject.vue'
import { reactive } from 'vue';
import { useGlobalsStore } from '@/store';

const store = useGlobalsStore();

const directorys = reactive(store.projects);

const toggleExpanded = (idx) => {
    directorys[idx].expanded = !directorys[idx].expanded;
}

const popupCreate = () => {
    store.popupRender = !store.popupRender;
}

const activeTasks = (project, folder, columns) => {
    store.updatetasksActive(project, folder, columns);
}
</script>

<style scoped>
#menu {
    width: 275px;
    background-color: #283739;
    min-height: 95vh;
    position: fixed;
    top: 0;
    overflow-x: hidden;
    padding-bottom: 5vh;
}
#menu::-webkit-scrollbar {
    width: 10px;

}
#menu::-webkit-scrollbar-track {
    margin-top: 65px;
    margin-bottom: 5px;
}
#menu::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}



.sub-header-menu {
    padding: 90px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.new-project {
    font-size: 17.5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.create-project{
    margin: 0 auto;
    width: 100%;
    padding: 10px 15px;
    box-shadow: 5px 5px 10px black;
    border-radius: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    background-color: #a9c52f;
}

.create-project:hover{
    transform: scale(1.03);
    transition: 0.5s;
}

.rotate-90 {
    transform: rotate(180deg);
    transition: 0.3s;
}

.render-subdirectory{
    display: none;
}

.active-directory {
    background-color: #74881c !important;
}

.add-project{
    font-size: 20px;
    margin-right: 25px;
    margin-left: 10px;
}

.menu {
    font-size: 20px;
}

.user-symbol {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #04c837;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.initial-of-name {
    font-weight: bolder;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-size: 20px;
}

.directory {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    margin-top: 15px;
    align-items: center;
    background-color: #a9c52f;
}

.expanded-task {
    margin-left: 10px;
}

.area-subdirectory{
    margin: 0 auto;
    font-size: 15px;
    background-color: #cbdc82;
}

.sub-directory{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: #74881c 1px solid;
    cursor: pointer;
}

.about-tasks{
    width: 100%;
}

.name-subdirectory{
    margin-left: 10px;
}
</style>