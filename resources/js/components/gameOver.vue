<template>
    <div class="game-over">
        <div class="game-over-content">
            <h1>Game Over !</h1>
            <p class="chaos-message">Le chaos a atteint {{ chaosLevel }}%</p>
            <p class="subtitle">Votre simulation est devenue incontrôlable...</p>
            <button @click="$emit('restart')" class="restart-btn">Recommencer</button>
        </div>
    </div>
</template>

<script setup>
defineProps(["chaosLevel"]);
</script>

<style scoped>
h1 {
    font-size: 60px;
    font-weight: bold;
    color: #ff3300;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.7);
}

.game-over {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f8f9fa;
}

.game-over-content {
    text-align: center;
    padding: 60px 80px;
    background: white;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.chaos-message {
    font-size: 22px;
    color: #2c3e50;
    margin: 25px 0;
    font-weight: 500;
}

.subtitle {
    font-size: 15px;
    color: #7f8c8d;
    margin-bottom: 35px;
}

.restart-btn {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background: #ff3300;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}

.restart-btn:hover {
    background: #e62e00;
}
</style>
