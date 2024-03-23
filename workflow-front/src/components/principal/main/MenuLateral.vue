<template>
    <div id="menu">
        <div class="sub-header-menu">
            <div class="info-emp">
                <span class="empresa">
                    Empresa
                </span>
                <i class="fas fa-plus add-project"></i>
            </div>
            <i class="fa-solid fa-bars menu"></i>
        </div>
        <div v-for="(directory, idx) in directorys" :key="idx" class="raiz-directory">

            <div class="directory" :class="{ 'active-directory': directorys[idx].expanded }">
                <div class="user-symbol">
                    <span class="initial-of-name">
                        {{ directory.inicial }}
                    </span>
                </div>
                <h4>
                    {{ directory.name }}
                </h4>
                <div>
                    <i class="fas fa-plus add-task"></i>
                    <i class="fa-solid fa-angle-right expanded-task" @click="ToggleExpanded(idx)"
                        :class="{ 'rotate-90': directorys[idx].expanded }"></i>
                </div>
            </div>

            <div class="area-subdirectory" :class="{ 'render-subdirectory': !directorys[idx].expanded }">
                <div class="sub-directory" v-for="(sub_dirctory, id) in sub_directorys" :key="id">
                    <i class="fa-regular fa-folder-open" style="color: #FFD43B;"></i>
                    <span class="name-subdirectory">
                        {{ sub_dirctory.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import { reactive } from 'vue';

let directorys = reactive([
    {
        'inicial': "B",
        'name': "PROJETO 1",
        'expanded': false
    },
    {
        'inicial': "B",
        'name': "PROJETO 2",
        'expanded': false
    },
    {
        'inicial': "B",
        'name': "PROJETO 2",
        'expanded': false
    }
]);

let sub_directorys = reactive([
    {
        'name': "FRONT-END"
    },
    {
        'name': "BACK-END"
    },
    {
        'name': "BANCO"
    }

])

function ToggleExpanded(idx) {
    directorys[idx].expanded = !directorys[idx].expanded;
}


</script>

<style>
#menu {
    width: 250px;
    background-color: #bee0c9;
    height: 100vh;
}

.sub-header-menu {
    padding: 80px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.empresa {
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.rotate-90 {
    transform: rotate(90deg);
    transition: 0.3s;
}

.render-subdirectory{
    display: none;
}

.active-directory {
    background-color: #9fd7b1;
}

.add-project,
.menu {
    font-size: 25px;
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
    padding: 5px 10px;
    margin: 5px 0px;
    align-items: center;
}

.expanded-task {
    margin-left: 10px;
}

.area-subdirectory{
    width: 60%;
    margin: 0 auto;
    padding: 5px;
}

.sub-directory{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 10px;
    cursor: pointer;
}
</style>