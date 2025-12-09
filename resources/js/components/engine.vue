<template>
    <div>
        <Thermometer />
        <Popup v-for="popup in chaosStore.popups" :key="popup.id" :popup="popup" />
        <Calendar />
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Popup from "./events/popup.vue";
import Thermometer from "./events/thermometer.vue";
import Calendar from "./events/calendar.vue";

const chaosStore = useChaosStore();

spawnPopup();

function spawnPopup() {
    setTimeout(() => {
        chaosStore.spawnPopup();
        spawnPopup();
    }, rndDelay());
}

function rndDelay() {
    return Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
}
</script>

<style lang="scss" scoped></style>
