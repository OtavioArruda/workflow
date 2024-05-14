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
import { searchProjects, searchMe } from '@/ajax/main-requests';
import { useGlobalsStore } from '@/store';
import { ref, onBeforeMount } from 'vue';

const store = useGlobalsStore();

const dataLoaded = ref(false);

onBeforeMount(() => {
    searchProjects(store, dataLoaded);
})
</script>

<style>
#content {
    display: flex;
}
</style>