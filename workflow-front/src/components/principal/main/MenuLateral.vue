<template>
    <div>
        <transition name="slide">
            <div id="menu" :class="{ 'menu-open': isMenuOpen }">
                <div class="sub-header-menu">
                    <button class="create-project" @click="popupCreate">
                        <span class="new-project">
                            Novo Projeto
                        </span>
                    </button>

                    <v-icon icon="mdi-menu" color="white" size="40" @click="toggleMenu"/>
                </div>
    
                <main>
                    <div v-for="(directory, idx) in directorys" :key="idx" class="raiz-directory">
                        <div class="directory" :class="{ 'active-directory': directorys[idx].expanded }">
                            <div style="display: flex; align-items: center;">
                                    <v-icon 
                                        icon="mdi-chevron-right"
                                        class="toggleRightDown"
                                        :class="{ 'rotate': directorys[idx].expanded }"
                                        color="white"
                                        size="30"
                                        @click="toggleExpanded(idx)"
                                    />
                                <h4>
                                    {{ directory.name }}
                                </h4>
                            </div>
                            <div>
                                <v-btn icon variant="text" @click="folderCreated(directory._id)">
                                    <v-icon icon="mdi-plus" color="white" size="25"/>
                                </v-btn>
                            </div>
                        </div>
        
                        <transition name="slide">
                            <div v-if="directorys[idx].expanded" class="area-subdirectory">
                                <div class="sub-directory" v-for="(subDirectory, id) in directory.folders" :key="id">
                                    <div class="about-tasks"
                                        :data-value="subDirectory.name"
                                        @dblclick="editName(subDirectory)"
                                        @click="activeTasks(subDirectory, directory.name, subDirectory.name, directory._id, subDirectory._id)">
                                        <i class="fa-solid fa-folder"></i>
                                        <span class="name-subdirectory" 
                                            :class="{ 'editable': subDirectory.editing }"
                                        >
                                            <span v-if="subDirectory.editing">
                                                <input class="subdirectory-edit" v-model="subDirectory.name" 
                                                    @blur="endEditing(subDirectory, subDirectory._id, 'blur')"
                                                    @keyup.enter="endEditing(subDirectory, subDirectory._id, 'enter')">
                                            </span>
                                            <span v-else>
                                                {{ subDirectory.name }}
                                            </span>
                                        </span>
                                    </div>

                                    <v-btn v-if="!subDirectory.editing" icon variant="text" @click="folderDelete(directory._id, subDirectory._id)">
                                        <v-icon icon="mdi-delete" color="white" size="20"/>
                                    </v-btn>
                                </div>
                            </div>
                        </transition>
                    </div>
                </main>
            </div>
        </transition>
        <CreateProject />
    </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import CreateProject from '@/components/principal/popups/CreateProject.vue';
import { useGlobalsStore } from '@/store';
import { createdFolder, deleteFolder, updateFolder } from '@/ajax/main-requests';
import { reactive, ref } from 'vue';

const store = useGlobalsStore();
let isMenuOpen = ref(false);
let directorys = reactive(store.projects[0].data.projects);


const toggleExpanded = (idx) => {
    directorys[idx].expanded = !directorys[idx].expanded;
}

const popupCreate = () => {
    store.popupRender = !store.popupRender;
}

const activeTasks = (data, directory, folder, idProject, idFolder) => {
    store.updatetasksActive(data.columns, directory, folder, idProject, idFolder);
}

const folderCreated = (idProject) => {
    let dados = {
        name: "NOVA PASTA",
        projectId: idProject
    }
    createdFolder(dados, store, idProject)
}

const folderDelete = (idProject, idFolder) => {
    deleteFolder(idProject, idFolder, store);
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

const editName = (subDirectory) => {
    subDirectory.editing = true;
};

const endEditing = (subDirectory, idFolder, eventType) => {
    if (eventType === 'enter'){

        subDirectory.editing = ref(false);
        let newFolder = document.querySelector(".subdirectory-edit");
        let data = {
            name: newFolder.value,
            folderId: idFolder
        }

        updateFolder(data, idFolder, store);
    }
};
</script>

<style scoped>
#menu {
    width: 320px;
    background-color: #000000;
    min-height: 100vh;
    position: fixed;
    top: 0;
    overflow-x: hidden;
    z-index: 2;
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
main::-webkit-scrollbar {
    width: 10px;

}

main::-webkit-scrollbar-track {
    margin-bottom: 10vh;
}

main::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}

main{
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 80vh;
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

.menu-open {
    transform: translateX(0);
}

.sub-header-menu {
    padding: 90px 20px 20px;
    height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.expand-enter-active {
    transition: max-height 0.3s ease-out;
}

.expand-enter,
.expand-leave-active {
    max-height: 0;
    overflow: hidden;
}

.expand-enter-to {
    max-height: auto;
}

.expand-leave-active {
    transition: max-height 0.3s ease-in;
}

.expand-leave-to {
    max-height: 0;
}

.new-project {
    font-size: 17.5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.create-project {
    margin: 0 auto;
    width: 70%;
    padding: 10px 15px;
    box-shadow: 5px 5px 10px #133b08;
    border-radius: 100px;
    color: #000000;
    display: flex;
    justify-content: center;
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

.toggleRightDown {
    transition: transform .2s ease-in-out !important;  
}

.toggleRightDown.rotate {
    transform: rotate(90deg);
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
    align-items: center;
    padding: 0px 10px;
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
    align-items: center;
    padding: 10px 15px;
    margin-left: 40px;
    cursor: pointer;
}

.about-tasks {
    width: 100%;
    display: flex;
    align-items: center;
}

.name-subdirectory {
    margin-left: 10px;
}

.name-subdirectory.editable {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 3px;
    color: white;
}

.subdirectory-edit{
    color: white;
    border: none;
}

.subdirectory-edit:focus {
    outline: none;
}
</style>