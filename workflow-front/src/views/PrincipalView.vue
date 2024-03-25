<template>
    <div>
        <HeaderPrincipal/>
        <div id="content">
            <MenuLateral/>
            <TasksArea/>
        </div>
    </div>
</template>

<script setup>
import HeaderPrincipal from '../components/principal/partials/HeaderPrincipal.vue';
import MenuLateral from '../components/principal/main/MenuLateral.vue';
import TasksArea from '../components/principal/main/TasksArea.vue'
</script>

<style>
#content{
    display: flex;
}

</style>