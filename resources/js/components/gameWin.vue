<template>
    <div class="win">
        <div class="win-content">
            <h1>Victoire !</h1>
            <p class="chaos-value">Final Chaos : {{ chaosLevel }}%</p>
            <p class="message">You managed to handle everything</p>
            <div class="buttons">
                <button @click="goToMenu" class="btn-menu">Menu</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(["chaosLevel"]);

function goToMenu() {
    location.reload();
}
</script>

<style scoped>
.win {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.win-content {
    text-align: center;
    padding: 50px 70px;
    background: white;
    border: 3px solid #2ecc71;
}

h1 {
    font-size: 72px;
    font-weight: 900;
    color: #2ecc71;
    margin: 0 0 30px 0;
    letter-spacing: 8px;
}

.chaos-value {
    font-size: 28px;
    color: #2c3e50;
    margin: 20px 0;
    font-weight: 700;
}

.message {
    font-size: 18px;
    color: #7f8c8d;
    margin: 15px 0 40px 0;
}

.buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.btn-restart,
.btn-menu {
    padding: 15px 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid;
    background: none;
    transition: all 0.2s;
}

.btn-restart {
    color: #2ecc71;
    border-color: #2ecc71;
}

.btn-restart:hover {
    background: #2ecc71;
    color: white;
}

.btn-menu {
    color: #7f8c8d;
    border-color: #bdc3c7;
}

.btn-menu:hover {
    border-color: #7f8c8d;
    color: #2c3e50;
}
</style>
