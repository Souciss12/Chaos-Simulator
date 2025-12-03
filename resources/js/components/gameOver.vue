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
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
}

.game-over-content {
    text-align: center;
    padding: 50px 60px;
    background: white;
    border-radius: 20px;
    border: 2px solid #e0e0e0;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.chaos-message {
    font-size: 24px;
    color: #333;
    margin: 20px 0;
    font-weight: 600;
}

.subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 30px;
    font-style: italic;
}

.restart-btn {
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #ff3300 0%, #ff6600 100%);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 51, 0, 0.2);
}

.restart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 51, 0, 0.4);
    background: linear-gradient(135deg, #ff4400 0%, #ff7700 100%);
}

.restart-btn:active {
    transform: translateY(0);
}
</style>
