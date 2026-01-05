<template>
    <div class="fan">
        <img
            @click="activateFan()"
            src="../../../assets/fan.png"
            :class="{ rotate: isFanOn }"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { eventBus } from "../../eventBus";
const isFanOn = ref(false);

eventBus.on("desactivate-fan", () => {
    isFanOn.value = false;
    eventBus.emit("temperature-stabilizing");
});

function activateFan() {
    if (isFanOn.value) {
        isFanOn.value = false;
        eventBus.emit("desactivate-fan");
    } else {
        isFanOn.value = true;
        eventBus.emit("desactivate-fireplace");
        eventBus.emit("temperature-cooling");
    }
}
</script>

<style scoped>
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
</style>
