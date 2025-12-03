<template>
    <div>
        <Popup v-for="popup in chaosStore.popups" :key="popup.id" :popup="popup" />
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Popup from "./popup.vue";

const chaosStore = useChaosStore();

// For testing, spawn a random popup each 2 seconds
// setInterval(() => {
//     chaosStore.spawnPopup();
// }, 2000);
</script>

<style lang="scss" scoped></style>
