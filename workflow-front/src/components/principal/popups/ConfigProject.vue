<template>
    <div class="text-center pa-4">
        <v-dialog
        v-model="store.popupProject"
        transition="dialog-bottom-transition"
        fullscreen
        >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
            prepend-icon="mdi-cog"
            size="small"
            text="Settings"
            v-bind="activatorProps"
            ></v-btn>
        </template>

        <v-card>
            <v-toolbar>
            <v-btn
                icon="mdi-close"
                @click="store.popupProject = false"
            ></v-btn>

            <v-toolbar-title>Settings</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn
                text="Save"
                variant="text"
                @click="store.popupProject = false"
                ></v-btn>
            </v-toolbar-items>
            </v-toolbar>

            <v-list
            lines="two"
            subheader
            >
            <v-list-subheader>User Controls</v-list-subheader>

            <v-list-item
                subtitle="Set the content filtering level to restrict apps that can be downloaded"
                title="Content filtering"
                link
            ></v-list-item>

            <v-list-item
                subtitle="Require password for purchase or use password to restrict purchase"
                title="Password"
                link
            ></v-list-item>

            <v-divider></v-divider>

            <v-list-subheader>General</v-list-subheader>

            <v-list-item
                subtitle="Notify me about updates to apps or games that I downloaded"
                title="Notifications"
            >
                <template v-slot:prepend>
                <v-list-item-action start>
                    <v-checkbox-btn color="primary"></v-checkbox-btn>
                </v-list-item-action>
                </template>
            </v-list-item>

            <v-list-item
                subtitle="Auto-update apps at any time. Data charges may apply"
                title="Sound"
            >
                <template v-slot:prepend>
                <v-list-item-action start>
                    <v-checkbox-btn color="primary"></v-checkbox-btn>
                </v-list-item-action>
                </template>
            </v-list-item>

            <v-list-item
                subtitle="Automatically add home screen widgets"
                title="Auto-add widgets"
            >
                <template v-slot:prepend>
                <v-list-item-action start>
                    <v-checkbox-btn color="primary"></v-checkbox-btn>
                </v-list-item-action>
                </template>
            </v-list-item>
            </v-list>
        </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { useGlobalsStore } from '@/store';
import { ref } from 'vue';

const store = useGlobalsStore();

let dialog = ref(store.popupProject)

</script>