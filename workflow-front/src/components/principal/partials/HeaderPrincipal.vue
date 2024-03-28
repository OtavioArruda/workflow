<template>
    <div class="cb">
        <header>
            <img id="logo" src="../../../assets/logo-tipo.png" alt="">
            <div class="user-symbol">
                <span class="initial-of-name">
                    B
                </span>
            </div>
        </header>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';

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
    z-index: 2;
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

.initial-of-name{
    font-weight: bolder;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: white;
    font-size: 25px;
}
</style>