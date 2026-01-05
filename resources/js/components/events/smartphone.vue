<template>
    <div class="smartphone" @click="openSmartphone()">
        <img :src="isMenuOpen ? onSmartphoneImg : offSmartphoneImg" />
    </div>
    <div v-if="isChargerActivate">
        <div class="chargerNumber">{{ chaosStore.phoneBattery }}%</div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import { eventBus } from "../../eventBus";
import offSmartphoneImg from "../../../assets/off-smartphone.png";
import onSmartphoneImg from "../../../assets/on-smartphone.png";

const chaosStore = useChaosStore();
const isMenuOpen = ref(false);
const isChargerActivate = ref(false);

chaosStore.phoneBattery = 20;

eventBus.on("smartphone-menu-opened", () => {
    isMenuOpen.value = true;
});

eventBus.on("smartphone-menu-closed", () => {
    isMenuOpen.value = false;
});

eventBus.on("charger-activated", () => {
    isChargerActivate.value = true;
});

eventBus.on("charger-deactivated", () => {
    isChargerActivate.value = false;
});

function openSmartphone() {
    eventBus.emit("smartphone-clicked");
}
</script>

<style scoped>
.smartphone {
    position: absolute;
    top: 50px;
    left: 300px;
    cursor: pointer;
    transition: transform 0.2s;
}

.smartphone:hover {
    transform: scale(1.05);
}

.smartphone img {
    width: 80px;
    height: auto;
}

.chargerNumber {
    position: absolute;
    top: 100px;
    left: 320px;
    font-size: 24px;
    font-weight: bold;
    color: #e0e0e0;
}
</style>
