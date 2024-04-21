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
                    <div style="display: flex;">
                        <i class="fa-solid fa-angle-right expanded-task" style="margin-right: 15px;"
                            @click="toggleExpanded(idx)" :class="{ 'rotate-90': directorys[idx].expanded }"></i>
                        <h4>
                            {{ directory.name }}
                        </h4>
                    </div>
                    <div>
                        <i class="fas fa-plus add-task" @click="createdFolder"></i>
                    </div>
                </div>

                <transition name="slide">
                    <div v-if="directorys[idx].expanded" class="area-subdirectory">
                        <div class="sub-directory" v-for="(subDirectory, id) in directory.folders" :key="id">
                            <div class="about-tasks"
                                @click="activeTasks(subDirectory, directory.name, subDirectory.name)">
                                <i class="fa-solid fa-folder"></i>
                                <span class="name-subdirectory">
                                    {{ subDirectory.name }}
                                </span>
                            </div>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </transition>


            </div>
        </div>
        <CreateProject />
    </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import CreateProject from '@/components/principal/popups/CreateProject.vue'
import { reactive, ref, onMounted } from 'vue';
import { useGlobalsStore } from '@/store';

const store = useGlobalsStore();
const directorys = reactive(store.projects[0].data.projects);

const toggleExpanded = (idx) => {
    directorys[idx].expanded = !directorys[idx].expanded;
}

const popupCreate = () => {
    store.popupRender = !store.popupRender;
}

const activeTasks = (data, directory, folder) => {
    store.updatetasksActive(data.columns, directory, folder);
}
</script>

<style scoped>
#menu {
    width: 320px;
    background-color: #000000;
    min-height: 95vh;
    position: fixed;
    top: 0;
    overflow-x: hidden;
    z-index: 2;
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

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
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

.create-project {
    margin: 0 auto;
    width: 80%;
    padding: 10px 15px;
    box-shadow: 5px 5px 10px #133b08;
    border-radius: 100px;
    color: #000000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: none;
    font-weight: bolder;
    color: rgb(53, 52, 52);
    background-color: #00f128;
}

.create-project:hover {
    transform: scale(1.03);
    transition: 0.5s;
}

.rotate-90 {
    transform: rotate(90deg);
    transition: 0.3s;
}

.render-subdirectory {
    display: none;
}

.add-project {
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
    padding: 10px;
    color: white;
    margin-top: 25px;
    align-items: center;
}

.expanded-task {
    margin-left: 10px;
}

.area-subdirectory {
    margin: 0 auto;
    font-size: 15px;
    color: rgb(228, 215, 215);
}

.sub-directory {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    margin-left: 40px;
    cursor: pointer;
}

.about-tasks {
    width: 100%;
}

.name-subdirectory {
    margin-left: 10px;
}
</style>