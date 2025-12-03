<template>
    <div class="text-center mt-3">
        <h1>Chaos level : {{ chaosStore.chaosLevel }}%</h1>
        <!-- debug :
        <button class="me-2" @click="chaosStore.addChaos(5)">Ajouter Chaos (+5%)</button>
        <button class="ms-2" @click="chaosStore.reduceChaos(5)">
            Retirer Chaos (-5%)
        </button> -->
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";

const chaosStore = useChaosStore();
</script>

<style scoped>
h1 {
    font-size: 60px;
    font-weight: bold;
    color: #ff3300;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.7);
}
</style>
