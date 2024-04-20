<template>
    <div>
        <HeaderPrincipal />
        <div id="content">
            <MenuLateral v-if="dataLoaded" />
            <TasksArea v-if="dataLoaded" />
            <div v-else>
                Carregando...
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderPrincipal from '../components/principal/partials/HeaderPrincipal.vue';
import MenuLateral from '../components/principal/main/MenuLateral.vue';
import TasksArea from '../components/principal/main/TasksArea.vue';
import { useGlobalsStore } from '@/store';
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

const store = useGlobalsStore();

const dataLoaded = ref(false);

onBeforeMount(() => {
    const searchProjects = async () => {
        try {
            const resProject = await axios.get(
                'http://localhost:3000/projects',
                {
                    headers: { Authorization: `Bearer ${store.token}` }
                }
            );
            if (resProject.data) {
                let projects = resProject.data;
                store.addProject(projects);
                dataLoaded.value = true;
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