<template>
    <div id="main-tasks">
        <div class="subheader-tasks">
            <strong v-if="tasksActive.project !== ''"> {{ tasksActive.project }} | {{ tasksActive.folder }}</strong>

            <div class="gears">
                <div></div>
                <v-btn v-if="tasksActive.project !== ''" icon variant="text" @click="configProject">
                    <v-icon icon="mdi mdi-cog" color="white" size="25"/>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { toRefs } from 'vue';
import { searchParticipants } from '@/ajax/main-requests';

const store = useGlobalsStore();
const { tasksActive } = toRefs(store);

const configProject = async () => {
    try {
        store.popupProject = true;
        let participants = store.projectActive.participants;

        for (let idxUser = 0; idxUser < participants.length; idxUser++) {
            const idUser = participants[idxUser];
            
            const user = await searchParticipants(store, idUser);
            
            if (user !== false) {
                store.participants.push(user.email);
            } 
            else {
                rules = [() => 'Usuário não encontrado.'];
            }
        }

    } 
    catch (error) {
        console.error(error);
    }
}

</script>

<style scoped>
#main-tasks {
    width: 100%;
    position: fixed;
    top: 50px;
    min-height: 5vh;
    z-index: 1;
}

.gears{
    position: absolute;
    right: 20px;
}

.subheader-tasks {
    background-color: #1d2125;
    font-family: Arial, Verdana, Geneva, Tahoma, sans-serif;
    height: 7vh;
    font-weight: bolder;
    padding: 10px 20px;
    margin-left: 100px;
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