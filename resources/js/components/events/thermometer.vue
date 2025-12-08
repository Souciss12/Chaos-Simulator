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
        <button @click="changeThermometerState()">Change</button>
    </div>
    <div class="fan">
        <img
            @click="activateFan()"
            src="../../../assets/fan.png"
            :class="{ rotate: isFanOn }"
        />
    </div>
    <div class="fireplace">
        <img
            @click="activateFireplace()"
            :src="isFireplaceOn ? fireplaceOnImg : fireplaceOffImg"
        />
    </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import fireplaceOnImg from "../../../assets/on-fireplace.png";
import fireplaceOffImg from "../../../assets/off-fireplace.png";
import normalThermometerImg from "../../../assets/normal-thermometer.png";
import hotThermometerImg from "../../../assets/hot-thermometer.png";
import coldThermometerImg from "../../../assets/cold-thermometer.png";
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();
const isFanOn = ref(false);
const isFireplaceOn = ref(false);

const thermometerState = ref("normal");

let chaosTimer = null;

updateChaosTimer();

function changeThermometerState() {
    if (thermometerState.value == "normal") {
        thermometerState.value = "hot";
    } else if (thermometerState.value == "hot") {
        thermometerState.value = "cold";
    } else {
        thermometerState.value = "normal";
    }
}

function activateFan() {
    if (isFanOn.value == false) {
        isFireplaceOn.value = false;
    }
    isFanOn.value = !isFanOn.value;
}

function activateFireplace() {
    if (isFireplaceOn.value == false) {
        isFanOn.value = false;
    }
    isFireplaceOn.value = !isFireplaceOn.value;
}

function updateChaosTimer() {
    if (chaosTimer) {
        clearInterval(chaosTimer);
        chaosTimer = null;
    }

    if (thermometerState.value === "normal" && !isFanOn.value && !isFireplaceOn.value) {
        chaosTimer = setTimeout(() => {
            thermometerState.value = Math.random() < 0.5 ? "cold" : "hot";
        }, 30000); // 30 secondes
    }

    if (thermometerState.value === "normal" && isFanOn.value) {
        chaosTimer = setInterval(() => {
            thermometerState.value = "cold";
            chaosStore.addChaos(3, 190, 300);
        }, 5000); // 5 secondes
    } else if (thermometerState.value === "normal" && isFireplaceOn.value) {
        chaosTimer = setInterval(() => {
            thermometerState.value = "hot";
            chaosStore.addChaos(3, 190, 300);
        }, 5000); // 5 secondes
    }

    if (
        (thermometerState.value === "cold" || thermometerState.value === "hot") &&
        !isFanOn.value &&
        !isFireplaceOn.value
    ) {
        startChaosTimer(true, 1, 5000); // 5 secondes
    }

    if (thermometerState.value === "cold" && isFanOn.value) {
        startChaosTimer(true, 3, 5000); // 5 secondes
    }

    if (thermometerState.value === "hot" && isFireplaceOn.value) {
        startChaosTimer(true, 3, 5000); // 5 secondes
    }

    if (thermometerState.value === "cold" && isFireplaceOn.value) {
        chaosTimer = setInterval(() => {
            thermometerState.value = "normal";
            chaosStore.reduceChaos(2, 190, 300);
        }, 15000); // 15 secondes
    }

    if (thermometerState.value === "hot" && isFanOn.value) {
        chaosTimer = setInterval(() => {
            thermometerState.value = "normal";
            chaosStore.reduceChaos(2, 190, 300);
        }, 15000); // 15 secondes
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

watch(isFanOn, () => {
    updateChaosTimer();
});

watch(isFireplaceOn, () => {
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

.fan {
    position: absolute;
    top: 250px;
    right: 60px;
    cursor: pointer;
    transition: transform 0.2s;
}

.fan:hover {
    transform: scale(1.05);
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.rotate {
    animation: rotate 1s linear infinite;
}

.fan img {
    width: 220px;
    height: auto;
}

.fireplace {
    position: absolute;
    top: 550px;
    right: 45px;
    cursor: pointer;
    transition: transform 0.2s;
}

.fireplace:hover {
    transform: scale(1.05);
}

.fireplace img {
    width: 250px;
    height: auto;
}
</style>
