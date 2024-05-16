<template>
    <div id="main-tasks">
        <div class="subheader-tasks">
            <strong v-if="tasksActive.project !== ''"> {{ tasksActive.project }} | {{ tasksActive.folder }}</strong>

            <div class="gears">
                <div></div>
                <i class="fa-solid fa-gear"></i>
            </div>
        </div>
        <hr class="horizontal-rule">

    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { toRefs } from 'vue';

const store = useGlobalsStore();
const { tasksActive } = toRefs(store);

</script>

<style scoped>
#main-tasks {
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 1;
}

.gears{
    position: absolute;
    right: 20px;
}

.subheader-tasks {
    background-color: #1d2125;
    color: rgb(0, 0, 0);
    color: rgb(61, 61, 61);
    font-family: Arial, Verdana, Geneva, Tahoma, sans-serif;
    min-height: 3vh;
    font-weight: bolder;
    padding: 10px 20px;
    margin-left: 320px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: white;
}

.horizontal-rule {
  background-color: #A6C5E229;
  margin: auto;
  width: 80%;
  border: 0;
  height: 1px;
}

</style>