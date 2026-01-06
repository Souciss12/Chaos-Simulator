<template>
    <div class="menu">
        <div class="menu-content">
            <h1>Chaos Simulator</h1>
            <div class="buttons">
                <button @click="startDailyGame" class="btn-daily">Niveau du jour</button>
                <button @click="startRandomGame" class="btn-random">
                    Partie aléatoire
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useNavigationStore } from "../stores/navigationStore";
import { useChaosStore } from "../stores/chaosStore";
import { seedRandom } from "../utils/seedRandom";

const navigationStore = useNavigationStore();
const chaosStore = useChaosStore();

function startDailyGame() {
    const today = new Date();
    const seed =
        today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate() * 10;
    seedRandom.setSeed(seed);

    chaosStore.restart();
    navigationStore.navigateTo("game");
}

function startRandomGame() {
    const randomSeed = Math.random().toString(36).substring(2, 15);
    seedRandom.setSeed(randomSeed);

    chaosStore.restart();
    navigationStore.navigateTo("game");
}
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.menu-content {
    text-align: center;
    padding: 50px 70px;
    background: white;
    border: 3px solid #3498db;
}

h1 {
    font-size: 72px;
    font-weight: 900;
    color: #3498db;
    margin: 0 0 50px 0;
    letter-spacing: 8px;
}

.buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
}

.btn-daily,
.btn-random {
    padding: 15px 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid;
    background: none;
    transition: all 0.2s;
}

.btn-daily {
    color: #3498db;
    border-color: #3498db;
}

.btn-daily:hover {
    background: #3498db;
    color: white;
}

.btn-random {
    color: #7f8c8d;
    border-color: #bdc3c7;
}

.btn-random:hover {
    border-color: #7f8c8d;
    color: #2c3e50;
}
</style>
