<template>
    <div id="main-tasks">
        <div class="subheader-tasks">
            <strong v-if="tasksActive.project !== ''"> {{ tasksActive.project }} | {{ tasksActive.folder }}</strong>

            <div class="gears">
                <div></div>
                <i class="fa-solid fa-gear"></i>
            </div>
        </div>

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
    background-color: #00f128;
    color: rgb(0, 0, 0);
    color: rgb(61, 61, 61);
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    min-height: 3vh;
    font-weight: bolder;
    padding: 10px 20px;
    margin-left: 320px;
    display: flex;
    font-size: 20px;
    color: white;
}

@keyframes gradients {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>