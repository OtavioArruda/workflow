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
                        @click="store.popupProject = false;"
                    ></v-btn>

                    <v-toolbar-title>Configurações</v-toolbar-title>

                    <v-spacer></v-spacer>

                </v-toolbar>

                <v-list
                lines="two"
                subheader
                >
                <v-list-subheader class="ml-2">Configurações do Projeto</v-list-subheader>

                <v-form>
                    <v-text-field 
                    label="Nome do Projeto"
                    v-model="store.projectActive.name"
                    ></v-text-field>

                    <label class="ml-3">
                        Participantes:
                    </label>
                    <v-text-field 
                        v-model="participantInput" 
                        @keydown.enter="addParticipant"
                        :rules="rules"
                    >
                        <div v-if="store.participants.length > 0" class="participant-tags">
                            <v-chip
                                v-for="(participant, index) in store.participants"
                                :key="index"
                            >
                                {{ participant }}
                                <v-icon class="m-2 ml-1" @click="removeParticipant(index)">mdi-close-circle</v-icon>
                            </v-chip>                            
                        </div>
                    </v-text-field>


                    <v-list style="display: flex; justify-content: space-around">
                        <v-btn
                        text="Salvar"
                        color="green"
                        variant="text"
                        @click="executeProjectCreated"
                        ></v-btn>

                        <v-btn
                        text="Excluir"
                        color="red"
                        variant="text"
                        @click="projectDelete"
                        ></v-btn>
                    </v-list>
                </v-form>

                <v-divider></v-divider>

                </v-list>
            </v-card>
        </v-dialog>

        <v-alert class="alert-top" v-if="state.successMessage" type="success" color="success" icon="$success">
            Projeto Alterado com sucesso.
        </v-alert>
        <v-alert class="alert-top" v-if="state.errorMessage" type="error" color="error" icon="$error">
            Erro ao alterar projeto
        </v-alert>

        <v-alert class="alert-delete-top" v-if="state.successDeleteMessage" type="success" color="error" icon="$success">
            Projeto Excluído com sucesso.
        </v-alert>
        <v-alert class="alert-delete-top" v-if="state.errorDeleteMessage" type="error" color="error" icon="$error">
            Erro ao excluir projeto.
        </v-alert>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref, reactive, nextTick } from 'vue';
import { searchUsers, updateProject, deleteProject } from '@/ajax/main-requests';

const participantInput = ref("");
const participants = ref([]);
const store = useGlobalsStore();
const state = reactive({
    successMessage: false,
    errorMessage: false,
    successDeleteMessage: false,
    errorDeleteMessage: false
});


let rules = [() => true];

const addParticipant = async () => {

    if (participantInput.value.trim() !== '') {
        try {
            const user = await searchUsers(store, participantInput.value);

            if (user !== false) {
                store.participants.push(participantInput.value.trim());

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
        for (let idxEmail = 0; idxEmail < store.participants.length; idxEmail++) {
            const parti = store.participants[idxEmail];
            console.log(parti);
            const user = await searchUsers(store, parti);
            participants.value.push(user);
        }

        const data = {
            name: store.projectActive.name,
            participants: participants.value
        }
        const idProject = store.projectActive._id;

        store.popupProject = false;

        const edit = await updateProject(data, idProject, store);
        if (edit.data) {
            state.successMessage = true;
            state.errorMessage = false;
            setTimeout(() => {
                state.successMessage = false;
            }, 3000);
            location.reload();
        } 

    } catch (error) {
        state.successMessage = false;
        state.errorMessage = true;
        setTimeout(() => {
            state.errorMessage = false;
        }, 3000);
    }
}

const projectDelete = async () => {
    try {
        const response = await deleteProject(store.projectActive._id, store);

        if (response.data) {
            store.popupProject = false;
            state.successDeleteMessage = true;
            state.errorDeleteMessage = false;

            location.reload();
            setTimeout(() => {
                state.successDeleteMessage = false;
            }, 3000);
        } 

    } catch (error) {
        state.successDeleteMessage = false;
        state.errorDeleteMessage = true;
        setTimeout(() => {
            state.errorDeleteMessage = false;
        }, 3000);
    }
};

const executeProjectCreated = async () => {
    await editProject();
    await nextTick();
}

const removeParticipant = (index) => {
    const participant = store.participants[index];
    if (participant) {
        store.participants.splice(index, 1);
    }
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

.alert-delete-top {
    position: fixed;
    top: 20px;
    left: 85%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 20%;
}
</style>