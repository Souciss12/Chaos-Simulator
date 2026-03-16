<template>
    <div class="game-over">
        <div class="game-over-content">
            <h1>Game Over !</h1>
            <p class="chaos-value">Final Chaos : {{ chaosLevel }}%</p>
            <p class="message">The simulation went out of control !</p>
            <div class="buttons">
                <button @click="goToMenu" class="btn-menu">Menu</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(["chaosLevel"]);

function goToMenu(): void {
    location.reload();
}
</script>

<style scoped>
.game-over {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.game-over-content {
    text-align: center;
    padding: 50px 70px;
    background: white;
    border: 3px solid #e74c3c;
}

h1 {
    font-size: 72px;
    font-weight: 900;
    color: #e74c3c;
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
    color: #e74c3c;
    border-color: #e74c3c;
}

.btn-restart:hover {
    background: #e74c3c;
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
