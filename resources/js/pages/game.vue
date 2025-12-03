<template>
    <div v-if="!chaosStore.isGameOver" class="game">
        <HUD />
        <Engine />
        <ChaosNotification
            v-for="notification in chaosStore.chaosNotifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
    <div v-else>
        <GameOver :chaosLevel="chaosStore.chaosLevel" @restart="chaosStore.restart()" />
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Engine from "../components/engine.vue";
import HUD from "../components/hud.vue";
import ChaosNotification from "../components/ChaosNotification.vue";
import GameOver from "../components/gameOver.vue";

const chaosStore = useChaosStore();
</script>

<style scoped></style>
