<template>
    <div>
        <v-card style="z-index: 2;">
            <v-layout>
                <v-navigation-drawer
                    expand-on-hover
                    id="menu"
                    width="320"
                    style="margin-top: 50px; overflow-y: hidden !important;"
                    rail
                >
                
                    <v-list density="compact" nav id="main">
                        <v-list-item class="create-project ml-auto mr-auto mt-4 mb-4" @click="popupCreate" width="200" prepend-icon="mdi-plus" title="Novo Projeto" value="novo-projeto"></v-list-item>
                
                        <v-divider color="white"></v-divider>

                        <v-list-item color="white" v-for="(directory, idx) in directorys" :key="idx">
                            <div style="display: flex; align-items: center; justify-content: space-between;">

                                <div style="display: flex; align-items: center; cursor: pointer; width: 100%;" @click="toggleExpanded(idx)">
                                    
                                    <v-icon 
                                        icon="mdi-chevron-right"
                                        class="toggleRightDown"
                                        :class="{ 'rotate': directorys[idx].expanded }"
                                        size="25"
                                        color="white"
                                    />
        
                                    <v-list-item-title class="custom-title" :title="directory.name">
                                        {{ directory.name }}
                                    </v-list-item-title>
                                </div>
    
                                <v-list-item>
                                    <v-btn icon variant="text" color="white" @click="folderCreated(directory._id)">
                                        <v-icon icon="mdi-plus" color="white" size="25"></v-icon>
                                    </v-btn>
                                </v-list-item>

                            </div>

                            <v-expand-transition>
                                <v-card
                                    v-show="directorys[idx].expanded"
                                    class="mx-auto bg-black"
                                 >
                                    <v-list v-for="(subDirectory, id) in directory.folders" :key="id" density="compact" nav>
                                        <v-list-item
                                            :data-value="subDirectory.name"
                                            @dblclick="editName(subDirectory)"
                                            @click="activeTasks(subDirectory, directory.name, subDirectory.name, directory._id, subDirectory._id)"
                                            class="block-folder"
                                        > 
                                        
                                            <div style="display: flex; justify-content: space-between; align-items: center">
                                                
                                                <v-icon icon="mdi-folder" color="white" size="20"/>

                                                <v-list-item class="name-subdirectory custom-title" :class="{ 'editable': subDirectory.editing }">
                                                    <template v-if="subDirectory.editing">
                                                        <v-text-field width="200" variant="underlined" class="subdirectory-edit ml-5" v-model="subDirectory.name" 
                                                        @blur="endEditing(subDirectory, subDirectory._id, 'blur')"
                                                        @keyup.enter="endEditing(subDirectory, subDirectory._id, 'enter')"/>
                                                    </template>
                                                    <template v-else>
                                                        <v-list-item-title :title="subDirectory.name">
                                                            {{ subDirectory.name }}
                                                        </v-list-item-title>
                                                    </template>
                                                </v-list-item>
                                            
    
                                                <v-list-item style="position: absolute; right: 0;">
                                                    <v-btn v-if="!subDirectory.editing" icon variant="text" @click="folderDelete(directory._id, subDirectory._id)">
                                                        <v-icon icon="mdi-delete" color="white" size="20"></v-icon>
                                                    </v-btn>
                                                </v-list-item>
                                            </div>


                                        </v-list-item>
                                    </v-list>
                                </v-card>
                                  
                            </v-expand-transition>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>        
            </v-layout>
        </v-card>
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

const editName = (subDirectory) => {
    subDirectory.editing = true;
};

const endEditing = (subDirectory, idFolder, eventType) => {
    if (eventType === 'enter'){

        subDirectory.editing = ref(false);
        let newFolder = subDirectory.name;
        let data = {
            name: newFolder,
            folderId: idFolder
        }

        updateFolder(data, idFolder, store);
    }
};
</script>

<style scoped>
#menu {
    box-shadow: 0px 1px 1px gray;
    background-color: #000000;
    overflow-y: hidden !important;
}

.custom-drawer {
    overflow-y: hidden !important;
}

#main::-webkit-scrollbar {
    width: 10px;
}

#main::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}

#main{
    overflow-x: hidden;
    overflow-y: overlay;
    max-height: 90vh;
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

.new-project {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.create-project {
    box-shadow: 5px 5px 10px #000000;
    border-radius: 100px;
    border: none;
    font-weight: bolder;
    color: rgb(53, 52, 52);
    background-color: #57ce8d;
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


.initial-of-name {
    font-weight: bolder;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
}

.directory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0px 10px;
    margin-top: 25px;
    align-items: center;
}

.custom-title{
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 190px;
}

.area-subdirectory {
    margin: 0 auto;
    color: rgb(228, 215, 215);
}

.sub-directory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
}

.about-tasks {
    width: 100%;
    display: flex;
    align-items: center;
}

.name-subdirectory.editable {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 20px;
    color: white;
}

.block-folder{
    display: flex;
    align-items: center;
    flex-direction: row;
}

.subdirectory-edit{
    color: white;
    border: none;
    font-size: 20px;
}

.custom-list-item {
    padding: 10px; 
    font-weight: bold;
    background-color: #57ce8d; 
}

.custom-list-item:hover {
    background-color: #f0f0f0;
}

.subdirectory-edit:focus {
    outline: none;
}
</style>