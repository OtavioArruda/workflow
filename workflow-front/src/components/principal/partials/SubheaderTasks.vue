<template>
    <div id="main-tasks">
        <div class="subheader-tasks">
            <strong>
                Projeto 1 | Frontend
            </strong>
            <div class="gears">
                <div></div>
                <i class="fa-solid fa-gear"></i>
            </div>
        </div>
        
    </div>
</template>

<script setup>
</script>

<style scoped>
#main-tasks{
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 1;
}

.subheader-tasks{
    background-color: #a9c52f;
    min-height: 3vh;
    padding: 10px 20px;
    margin-left: 275px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
}

</style>