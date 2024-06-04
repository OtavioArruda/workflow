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
                @click="store.popupProject = false"
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
            </v-form>

            <v-divider></v-divider>
            </v-list>
        </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref } from 'vue';
import { searchUsers } from '@/ajax/main-requests';

const participantInput = ref("");
const participants = ref([]);
const store = useGlobalsStore();
const email = ref(store.participants);


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

</script>