<template>
    <div id="main-tasks">
        <div class="subheader-tasks">
            <strong>Projeto 1 | Frontend</strong>

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
#main-tasks {
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 1;
}

.subheader-tasks {
    background: linear-gradient(to right, #00800d, #012804, #00f128);
    background-size: 300% 300%;
    animation: gradients 5s ease infinite;
    min-height: 3vh;
    padding: 10px 20px;
    margin-left: 275px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: white;
}

@keyframes gradients {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>