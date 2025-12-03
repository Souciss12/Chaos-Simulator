<template>
    <div>
        <Thermometer />
        <Popup v-for="popup in chaosStore.popups" :key="popup.id" :popup="popup" />
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Popup from "./popup.vue";
import Thermometer from "./thermometer.vue";

const chaosStore = useChaosStore();

spawnPopup();

function spawnPopup() {
    const delay = Math.floor(Math.random() * (60000 - 10000 + 1)) + 10000;
    setTimeout(() => {
        chaosStore.spawnPopup();
        spawnPopup();
    }, delay);
}
</script>

<style lang="scss" scoped></style>
