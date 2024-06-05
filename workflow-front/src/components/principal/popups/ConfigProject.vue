<template>
    <div class="text-center pa-4">
        <v-dialog
        v-model="store.popupProject"
        transition="dialog-bottom-transition"
        fullscreen
        >

            <v-card>
                <v-toolbar>
                <v-btn
                    icon="mdi-close"
                    @click="store.popupProject = false"
                ></v-btn>

                <v-toolbar-title>Configurações</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <v-btn
                    text="Salvar"
                    variant="text"
                    @click="editProject"
                    ></v-btn>
                </v-toolbar-items>
                </v-toolbar>

                <v-list
                lines="two"
                subheader
                >
                <v-list-subheader class="ml-2">Configurações do Projeto</v-list-subheader>

                <v-form style="max-width: 80%; margin-left: 20px;">
                    <v-text-field 
                    label="Nome do Projeto"
                    v-model="store.projectActive.name"
                    ></v-text-field>

                    <label>
                        Participantes:
                    </label>
                    <v-text-field 
                        disabled
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
                </v-form>

                <v-divider></v-divider>

                <v-list-subheader class="ml-2">Suas tarefas</v-list-subheader>

                <v-list>
                    
                </v-list>
                </v-list>
            </v-card>
        </v-dialog>

        <v-alert class="alert-top" v-if="state.successMessage" type="success" color="success" icon="$success">
            Projeto Alterado
        </v-alert>
        <v-alert class="alert-top" v-if="state.errorMessage" type="error" color="error" icon="$error">
            Erro ao alterar projeto
        </v-alert>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref, reactive, nextTick } from 'vue';
import { searchUsers, updateProject } from '@/ajax/main-requests';

const participantInput = ref("");
const participants = ref([]);
const store = useGlobalsStore();
const email = ref(store.participants);
const state = reactive({
    successMessage: false,
    errorMessage: false
});


let rules = [() => true];

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

const editProject = async () => {
    try {
        const idProject = store.projectActive._id;

        const data = {
            name: store.projectActive.name
        }
        store.popupProject = false
        const edit = await updateProject(data, idProject, store);
        if (edit.data) {
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


</script>

<style>
.alert-top {
  position: fixed;
  top: 20px;
  left: 85%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 20%;
}
</style>