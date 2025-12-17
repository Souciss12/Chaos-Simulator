<template>
    <div>
        <Popup v-for="popup in chaosStore.popups" :key="popup.id" :popup="popup" />

        <Thermometer />
        <Fan />
        <Fireplace />

        <Calendar />
        <Smartphone />
        <SmartphoneMenu />
        <Charger />

        <Pizza />
    </div>
</template>

<script setup>
import { useChaosStore } from "../stores/chaosStore";
import Popup from "./events/popup.vue";
import Thermometer from "./events/thermometer.vue";
import Calendar from "./events/calendar.vue";
import Pizza from "./events/pizza.vue";
import Fan from "./events/fan.vue";
import Fireplace from "./events/fireplace.vue";
import Smartphone from "./events/smartphone.vue";
import SmartphoneMenu from "./events/smartphoneMenu.vue";
import Charger from "./events/charger.vue";

const chaosStore = useChaosStore();

spawnPopup();

function spawnPopup() {
    setTimeout(() => {
        chaosStore.spawnPopup();
        spawnPopup();
    }, rndDelay());
}

function rndDelay() {
    // return Math.floor(Math.random() * 5000) + 3000;
    // return 10;
    return Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
}
</script>

<style lang="scss" scoped></style>
