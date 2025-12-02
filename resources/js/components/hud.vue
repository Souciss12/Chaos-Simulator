<template>
    <div class="text-center">
        <h1>Chaos level : {{ chaosStore.chaosLevel }}%</h1>
        debug :
        <button class="me-2" @click="chaosStore.addChaos(5)">Ajouter Chaos (+5%)</button>
        <button class="ms-2" @click="chaosStore.reduceChaos(5)">
            Retirer Chaos (-5%)
        </button>
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";

const chaosStore = useChaosStore();
</script>

<style lang="scss" scoped></style>
