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
import { seedRandom } from "../../utils/seedRandom";
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
            thermometerState.value = seedRandom.random < 0.5 ? "cold" : "hot";
        }, seedRandom.randomInt(15000, 35000));
    }

    if (thermometerState.value === "normal" && temperatureMode.value === "cooling") {
        startChaosTimer(true, 3, 5000, "cold");
    }

    if (thermometerState.value === "normal" && temperatureMode.value === "heating") {
        startChaosTimer(true, 3, 5000, "hot");
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
        startChaosTimer(false, 2, 15000, "normal");
    }

    if (thermometerState.value === "hot" && temperatureMode.value === "cooling") {
        startChaosTimer(false, 2, 15000, "normal");
    }
}

function startChaosTimer(isAdd, amount, interval, state) {
    if (isAdd) {
        chaosTimer = setInterval(() => {
            if (state) {
                thermometerState.value = state;
            }
            chaosStore.addChaos(amount, 190, 300);
        }, interval);
    } else {
        chaosTimer = setInterval(() => {
            if (state) {
                thermometerState.value = state;
            }
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
