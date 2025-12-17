<template>
    <div class="thermometer">
        <img
            :src="
                thermometerState == 'normal'
                    ? normalThermometerImg
                    : thermometerState == 'hot'
                    ? hotThermometerImg
                    : coldThermometerImg
            "
        />
    </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import normalThermometerImg from "../../../assets/normal-thermometer.png";
import hotThermometerImg from "../../../assets/hot-thermometer.png";
import coldThermometerImg from "../../../assets/cold-thermometer.png";
import { useChaosStore } from "../../stores/chaosStore";
import { eventBus } from "../../eventBus";
const chaosStore = useChaosStore();

const thermometerState = ref("normal");
const temperatureMode = ref("stable"); // stable, cooling, heating
let chaosTimer = null;

eventBus.on("temperature-cooling", () => {
    temperatureMode.value = "cooling";
});

eventBus.on("temperature-heating", () => {
    temperatureMode.value = "heating";
});

eventBus.on("temperature-stabilizing", () => {
    temperatureMode.value = "stable";
});

updateChaosTimer();

function updateChaosTimer() {
    if (chaosTimer) {
        clearInterval(chaosTimer);
        chaosTimer = null;
    }

    if (thermometerState.value === "normal" && temperatureMode.value === "stable") {
        chaosTimer = setTimeout(() => {
            thermometerState.value = Math.random() < 0.5 ? "cold" : "hot";
        }, 30000);
    }

    if (thermometerState.value === "normal" && temperatureMode.value === "cooling") {
        chaosTimer = setInterval(() => {
            thermometerState.value = "cold";
            chaosStore.addChaos(3, 190, 300);
        }, 5000);
    }

    if (thermometerState.value === "normal" && temperatureMode.value === "heating") {
        chaosTimer = setInterval(() => {
            thermometerState.value = "hot";
            chaosStore.addChaos(3, 190, 300);
        }, 5000);
    }

    if (
        (thermometerState.value === "cold" || thermometerState.value === "hot") &&
        temperatureMode.value === "stable"
    ) {
        startChaosTimer(true, 1, 5000);
    }

    if (thermometerState.value === "cold" && temperatureMode.value === "cooling") {
        startChaosTimer(true, 3, 5000);
    }

    if (thermometerState.value === "hot" && temperatureMode.value === "heating") {
        startChaosTimer(true, 3, 5000);
    }

    if (thermometerState.value === "cold" && temperatureMode.value === "heating") {
        chaosTimer = setInterval(() => {
            thermometerState.value = "normal";
            chaosStore.reduceChaos(2, 190, 300);
        }, 15000);
    }

    if (thermometerState.value === "hot" && temperatureMode.value === "cooling") {
        chaosTimer = setInterval(() => {
            thermometerState.value = "normal";
            chaosStore.reduceChaos(2, 190, 300);
        }, 15000);
    }
}

function startChaosTimer(isAdd, amount, interval) {
    if (isAdd) {
        chaosTimer = setInterval(() => {
            chaosStore.addChaos(amount, 190, 300);
        }, interval);
    } else {
        chaosTimer = setInterval(() => {
            chaosStore.reduceChaos(amount, 190, 300);
        }, interval);
    }
}

watch(thermometerState, () => {
    updateChaosTimer();
});

watch(temperatureMode, () => {
    updateChaosTimer();
});

onUnmounted(() => {
    if (chaosTimer) {
        clearInterval(chaosTimer);
    }
});
</script>

<style scoped>
.thermometer {
    position: absolute;
    top: 300px;
    left: 80px;
}

.thermometer img {
    width: 100px;
    height: auto;
}
</style>
