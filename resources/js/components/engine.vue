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
        <Customer />
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
import Customer from "./events/customer.vue";
import { seedRandom } from "../utils/seedRandom";

const chaosStore = useChaosStore();

chaosStore.chaosLevel = 30;

setSeed();

function setSeed() {
    // seedRandom.setSeed(Math.random().toString(36).substring(2, 15));
    seedRandom.setSeed("quentin");
}

spawnPopup();

function spawnPopup() {
    setTimeout(() => {
        chaosStore.spawnPopup();
        spawnPopup();
    }, rndDelay());
}

function rndDelay() {
    // return 5000;
    return seedRandom.randomInt(20000, 90000);
}
</script>

<style lang="scss" scoped></style>
