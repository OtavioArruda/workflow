<template>
    <v-dialog v-model="store.popupTask">
        <div id="popup-add-task">
            <v-sheet min-width="800" class="popup-task">
                <v-form>
                    <div class="form-task">
                        <div class="info-task">
                            <v-text-field class="mr-2" v-model="title" label="Nome da tarefa"></v-text-field>
                            <v-text-field v-model="badge" label="Adicione a badge"></v-text-field>
                        </div>
        
                        <div class="dates-task">
                            <v-text-field class="mr-2" v-model="start_at" type="date" label="Data de Início"></v-text-field>
                            <v-text-field v-model="end_at" type="date" label="Data de Término"></v-text-field>
                        </div>
    
                        <div id="participants-task">
                            <label>
                                Adicione os participantes:
                            </label>
                            <v-text-field 
                                v-model="participantInput" 
                                :rules="rules"
                                @keydown.enter="addParticipant"
                            >
                                <div v-if="participants.length > 0" class="participant-tags">
                                    <v-chip
                                        v-for="(participant, index) in participants"
                                        :key="index"
                                        closable
                                    >
                                        {{ participant }}
                                    </v-chip>                            
                                </div>
                            </v-text-field>
                        
                        </div>
        
                        <div class="badges-task">
                            <v-color-picker hide-inputs width="100%" v-model="badge_color" label="Cor da Badge"></v-color-picker>
                            <v-textarea class="mt-5" v-model="description" label="Descrição da Tarefa"></v-textarea>
                        </div>
                    </div>
    
                    <div class="buttons-task">
                        <v-btn 
                            @click="taskCancel"
                            >Cancelar
                        </v-btn>
    
                        <v-btn
                            text="Submit"
                            @click="executeTaskCreated"
                            >Criar Tarefa
                        </v-btn>
                    </div>
                </v-form>
            </v-sheet>
        </div>
    </v-dialog>
    <v-alert class="alert-top" v-if="state.successMessage" type="success" color="success" icon="$success">
        Tarefa Criada
    </v-alert>
    <v-alert class="alert-top" v-if="state.errorMessage" type="error" color="error" icon="$error">
        Erro ao criar tarefa
    </v-alert>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import { useGlobalsStore } from '@/store';
import { ref, reactive, nextTick } from 'vue';
import { createdTasks, searchUsers } from '@/ajax/main-requests';

const store = useGlobalsStore();

const title = ref("");
const description = ref("");
const start_at = ref(Date.now());
const end_at = ref(Date.now());
const badge = ref("");
const badge_color = ref("");
const participants = ref([]);
const idUser = ref([]);
const participantInput = ref("");
const state = reactive({
    successMessage: false,
    errorMessage: false
});
let rules = [() => true];

const addParticipant = async () => {
    const idProject = store.tasksActive.idProject;
    const projects = store.projects[0].data.projects;

    const user = await searchUsers(store, participantInput.value);

    if (user !== false) {
        for (let id = 0; id < projects.length; id++) {
            if (projects[id]._id == idProject) {
                const listParticipants = projects[id].participants;
                
                for (let idxParticipant = 0; idxParticipant < listParticipants.length; idxParticipant++) {
                    if (user == listParticipants[idxParticipant]) {
                        participants.value.push(participantInput.value.trim());
                        idUser.value.push(user);

                        participantInput.value = '';
                        rules = [() => true];       
                    }
                    
                }
            }
            else{
                rules = [() => 'Usuário não encontrado.'];
            }
        }
    } 
    else {
        rules = [() => 'Usuário não encontrado.'];
    }
}

const taskCancel = (e) => {
    store.popupTask = !store.popupTask;
}

const taskCreated = async() => {
    try {
        const data = {
            title: title.value,
            description: description.value,
            start_at: start_at.value,
            end_at: end_at.value,
            badges: [{
                text: badge.value,
                color: badge_color.value
            }],
            participants: idUser.value,
            columnId: store.idColumn
        }
    
        const created = await createdTasks(data, store, store.tasksActive.idFolder, store.tasksActive.idProject, store.idColumn);
        if (created.data) {
            state.successMessage = true;
            state.errorMessage = false;
            setTimeout(() => {
                state.successMessage = false;
            }, 3000);

            title.value = "";
            description.value = "";
            start_at.value = "";
            end_at.value = "";
            badge.value = "";
            badge_color.value = "";
            idUser.value = "";
            store.idColumn = "";
        } 
        
    } catch (error) {
        state.successMessage = false;
        state.errorMessage = true;
        setTimeout(() => {
            state.errorMessage = false;
        }, 3000);
    }

}

const executeTaskCreated = async () => {
    await taskCreated();
    await nextTick();
}

</script>


<style scoped>
#popup-overlay-task {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.popup-task {
    padding: 30px;
    border-radius: 15px;
}

#popup-add-task {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    border-radius: 10px;
    z-index: 10000;
}

.active-popup {
    display: none;
}

.info-task,
.dates-task {
    display: flex;
    align-items: center;
}

.btn-task {
    width: 200px;
}

.form-task{
    max-height: 80vh;
    padding: 20px;
    overflow-y: scroll;
}

.form-task::-webkit-scrollbar {
    width: 10px;

}

.form-task::-webkit-scrollbar-track {
    margin-top: 65px;
    margin-bottom: 5px;
}

.form-task::-webkit-scrollbar-thumb {
    background-color: #283e37;
    border-radius: 20px;
    border: 3px solid black;
}

.participants {
    min-height: 140px;
    background-color: #dcdcdc;
    border-radius: 10px;
    margin-bottom: 20px;
}

#participants-task {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.buttons-task {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.create-project {
    width: 140px;
    border-radius: 15px;
    border: none;
    padding: 5px 10px;
    background-color: #00ff1e;
    font-weight: bolder;
}

.alert-top {
  position: fixed;
  top: 20px;
  left: 85%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 20%;
}
</style>