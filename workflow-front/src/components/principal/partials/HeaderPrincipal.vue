<template>
    <div class="cb">
        <header>
            <img id="logo" src="../../../assets/logo-tipo.png" alt="">
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                location="end"
            >
                <template v-slot:activator="{ props }">
                    <div class="mr-3" style="padding: 2px 5px; cursor:pointer;" v-bind="props">
                        <v-icon height="40" width="40">mdi-dots-vertical</v-icon>
                    </div>
                </template>
        
                <v-card style="top: 20px;" min-width="300">
                    <v-list>
                        <v-list-item>
                            <template v-slot:prepend>
                                <v-btn icon="mdi-dots-vertical" height="40" width="40" class="mr-3" color="green" v-bind="props"> 
                                    {{ sigla }} 
                                </v-btn>
                            </template>
                            <v-list-item-title>{{ store.email }}</v-list-item-title>
                            <v-list-item-subtitle>{{ store.name }}</v-list-item-subtitle>
                            <template v-slot:append>
                                <v-btn
                                    :class="fav ? 'text-red' : ''"
                                    variant="text"
                                    @click="fav = !fav"
                                ></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>                    
        
                    <v-divider></v-divider>
        
                    <v-card-actions style="display: flex; justify-content: center;">
                        <v-btn variant="text" @click="logout">Sair</v-btn>
                    </v-card-actions>                    
                </v-card>
            </v-menu>
        </header>
    </div>
</template>


<script setup>
import { defineProps, ref } from 'vue';
import { useGlobalsStore } from '@/store';
import { useRouter } from 'vue-router';

const registerRouter = useRouter();

const store = useGlobalsStore();
let sigla = (store.email[0]).toUpperCase();


let fav = ref(true);
let menu = ref(false);
let message = ref(false);
let hints = ref(true);

const logout = () => {
    menu = false;
    localStorage.removeItem('token');
    registerRouter.push("/")
}

const props = defineProps({
    DirectsRegistration: Function
})
</script>


<style scoped>
.cb {
    z-index: 1;
}

header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    min-height: 50px;
    z-index: 3;
    background-color: white;
    box-shadow: 10px 1px 20px black;
}

#logo {
    width: 60px;
    margin-left: 20px;
}

.user-symbol {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: green;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.option-header {
    cursor: pointer;
}

.initial-of-name{
    font-weight: bolder;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-size: 25px;
}

.user-card {
    position: absolute;
    top: 100%; 
    right: 0; 
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
}

.user-symbol:hover .user-card {
    display: block;
}
</style>