<template>
    <div>
        <HeaderPrincipal />
        <div id="content">
            <MenuLateral />
            <TasksArea />
        </div>
    </div>
</template>

<script setup>
import HeaderPrincipal from '../components/principal/partials/HeaderPrincipal.vue';
import MenuLateral from '../components/principal/main/MenuLateral.vue';
import TasksArea from '../components/principal/main/TasksArea.vue';
import { useGlobalsStore } from '@/store';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const store = useGlobalsStore();

onMounted(() => {
    const searchProjects = async () => {
        try {
            const resProject = await axios.get(
                'http://localhost:3000/projects',
                {
                    headers: { Authorization: `Bearer ${store.token}` }
                }
            );

            let objProject = {};

            let projects = resProject.data;
            for (let idxProject = 0; idxProject < projects.length; idxProject++) {
                let project = projects[idxProject];
                let folders = [ project.folders];

                objProject['id_project'] = project._id;
                objProject['name_project'] = project.name;
                objProject['folders'] = [];
                let folder = {};

                for (let idxArrFolder = 0; idxArrFolder < folders.length; idxArrFolder++) {
                    let folderArr = folders[idxArrFolder];
                    
                    for (let idxFolder = 0; idxFolder < folderArr.length; idxFolder++) {
                        let infosFolder = folderArr[idxFolder];
                        let columnsArr = infosFolder.columns;

                        folder['id_folder'] = infosFolder._id;
                        folder['name_folder'] = infosFolder.name;
                        folder['columns'] = [];
                        let column = {}
                        
                        for (let idx_column = 0; idx_column < columnsArr.length; idx_column++) {
                            let infosColumn = columnsArr[idx_column];
                            let infosTasks = infosColumn.tasks;

                            column['id_column'] = infosColumn._id;
                            column['name_column'] = infosColumn.name;
                            column['tasks'] = [];
                            let task = {};

                            for (let idx_task = 0; idx_task < infosTasks.length; idx_task++) {
                                let infosTask = infosColumn.tasks[idx_task];
                                task["id_task"] = infosTask._id;
                                task["name_task"] = infosTask.title;
                                task["description"] = infosTask.description;
                                column['tasks'].push(task);
                                task = {};
                            }
                            folder['columns'].push(column);
                            column = {};
                        }
                        objProject['folders'].push(folder);
                        folder = {};
                    }
                }
                store.addProject(objProject);
                console.log(objProject);
                objProject = {};
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    searchProjects();

})




</script>

<style>
#content {
    display: flex;
}
</style>