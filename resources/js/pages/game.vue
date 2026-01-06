<template>
    <div v-if="!chaosStore.isGameOver && !chaosStore.isGameWin" class="game">
        <HUD />
        <Engine />
        <ChaosNotification
            v-for="notification in chaosStore.chaosNotifications"
            :key="notification.id"
            :notification="notification"
        />
        <div class="menuBtn">
            <button @click="menu()">Menu</button>
        </div>
    </div>
    <div v-else-if="chaosStore.isGameWin">
        <GameWin :chaosLevel="chaosStore.chaosLevel" @restart="chaosStore.restart()" />
    </div>
    <div v-else>
        <GameOver :chaosLevel="chaosStore.chaosLevel" @restart="chaosStore.restart()" />
    </div>
    <!-- <button @click="chaosStore.addChaos(100)">Loose</button>
    <button @click="chaosStore.reduceChaos(100)">Win</button> -->
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Engine from "../components/engine.vue";
import HUD from "../components/hud.vue";
import ChaosNotification from "../components/ChaosNotification.vue";
import GameOver from "../components/gameOver.vue";
import GameWin from "../components/gameWin.vue";

const chaosStore = useChaosStore();

function menu() {
    location.reload();
}
</script>

<style scoped>
.menuBtn {
    position: absolute;
    top: 40px;
    right: 60px;
    z-index: 1000;
}

.menuBtn button {
    padding: 15px 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid #bdc3c7;
    background: white;
    color: #7f8c8d;
    transition: all 0.2s;
}

.menuBtn button:hover {
    border-color: #7f8c8d;
    color: #2c3e50;
}
</style>
