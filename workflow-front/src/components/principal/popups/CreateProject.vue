<template>
    <v-dialog v-model="store.popupRender">
        <div id="popup-add-project">
            <v-sheet min-width="500" class="popup-project">
                <v-form>
                    <div class="info-task">
                        <v-text-field class="mr-2" v-model="nameProject" label="Nome do Projeto"></v-text-field>
                    </div>

                    <div id="participants-project">
                        <label>
                            Adicione os participantes:
                        </label>
                        <v-text-field 
                            v-model="participantInput" 
                            @keydown.enter="addParticipant"
                            :rules="rules"
                        >
                            <div v-if="email.length > 0" class="participant-tags">
                                <v-chip
                                    v-for="(participant, index) in email"
                                    :key="index"
                                    closable
                                >
                                    {{ participant }}
                                </v-chip>                            
                            </div>
                        </v-text-field>
                    
                      </div>
    
                    <div class="buttons-project">
                        <v-btn 
                            @click="cancelProject"
                            >Cancelar
                        </v-btn>
    
                        <v-btn
                            text="Submit"
                            @click="executeProjectCreated"
                            >Criar Projeto
                        </v-btn>
                    </div>
                </v-form>
            </v-sheet>
        </div>
    </v-dialog>
    <v-alert class="alert-top" v-if="state.successMessage" type="success" color="success" icon="$success">
        Projeto Criado
    </v-alert>
    <v-alert class="alert-top" v-if="state.errorMessage" type="error" color="error" icon="$error">
        Erro ao criar projeto
    </v-alert>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import { useGlobalsStore } from '@/store';
import { ref, reactive, nextTick } from 'vue';
import { createdProject, searchUsers } from '@/ajax/main-requests';

const store = useGlobalsStore();
const nameProject = ref('');
const email = ref([]);
const participantInput = ref("");
const participants = ref([]);
const state = reactive({
    successMessage: false,
    errorMessage: false
});

let rules = [() => true];

const cancelProject = () => {
    store.popupRender = !store.popupRender;
}

const projectCreated = async () => {
    const data = {
        name: nameProject.value,
        participants: participants.value
    };

    try {
        const createdTask = await createdProject(data, store);

        if (createdTask.data) {
            state.successMessage = true;
            state.errorMessage = false;
            setTimeout(() => {
                state.successMessage = false;
            }, 3000);
        } 

    } catch (error) {
        state.successMessage = false;
        state.errorMessage = true;
        setTimeout(() => {
            state.errorMessage = false;
        }, 3000);
    }
}

const executeProjectCreated = async () => {
    await projectCreated();
    await nextTick();
}

const addParticipant = async () => {

    if (participantInput.value.trim() !== '') {
        try {
            const user = await searchUsers(store, participantInput.value);

            if (user !== false) {
                email.value.push(participantInput.value.trim());
                participants.value.push(user);

                participantInput.value = '';
                rules = [() => true];
            } 
            else {
                rules = [() => 'Usuário não encontrado.'];
            }

        } catch (error) {
            console.error(error);
        }
    }
}

</script>


<style scoped>
#popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

#popup-add-project {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    border-radius: 10px;
    z-index: 10000;
}

.popup-project {
    padding: 30px;
    border-radius: 15px;
}

.active-popup {
    display: none;
}


.participants {
    min-height: 140px;
    background-color: #dcdcdc;
    border-radius: 10px;
    margin-bottom: 20px;
}

.buttons-project {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.buttons-project {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.custom-notification {
    margin-top: 20px;
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