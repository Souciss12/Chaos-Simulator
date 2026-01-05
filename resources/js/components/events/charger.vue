<template>
    <div class="charger">
        <img
            :src="!isChargerActivate ? offChargerImg : onChargerImg"
            :class="{ offCharger: !isChargerActivate, onCharger: isChargerActivate }"
            @click="toggleCharger()"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { eventBus } from "../../eventBus";
import offChargerImg from "../../../assets/off-charger.png";
import onChargerImg from "../../../assets/on-charger.png";

const isChargerActivate = ref(false);

function toggleCharger() {
    isChargerActivate.value = !isChargerActivate.value;

    if (isChargerActivate.value) {
        eventBus.emit("charger-activated");
    } else {
        eventBus.emit("charger-deactivated");
    }
}
</script>

<style scoped>
.onCharger {
    position: absolute;
    top: 140px;
    left: 337px;
    cursor: pointer;
    transition: transform 0.2s;
}

.offCharger {
    position: absolute;
    top: 90px;
    left: 410px;
    cursor: pointer;
    transition: transform 0.2s;
}

.onCharger:hover,
.offCharger:hover {
    transform: scale(1.05);
}

.charger img {
    height: 80px;
    width: auto;
}
</style>
