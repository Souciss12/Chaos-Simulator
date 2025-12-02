<template>
    <div v-if="!chaosStore.isGameOver" class="game">
        <HUD />
        <Engine />
    </div>
    <div v-else class="text-center">
        <h1>Game Over !</h1>
        <p>Your chaos level reached {{ chaosStore.chaosLevel }}%.</p>
        <button @click="chaosStore.restart" class="btn btn-primary">Restart</button>
    </div>
</template>

<script setup>
import Engine from "../components/engine.vue";
import HUD from "../components/hud.vue";
import { useChaosStore } from "../stores/chaosStore";

const chaosStore = useChaosStore();
</script>

<style lang="scss" scoped></style>
