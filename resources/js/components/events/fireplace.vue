<template>
    <div class="fireplace">
        <img
            @click="activateFireplace()"
            :src="isFireplaceOn ? fireplaceOnImg : fireplaceOffImg"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import fireplaceOnImg from "../../../assets/on-fireplace.png";
import fireplaceOffImg from "../../../assets/off-fireplace.png";
import { eventBus } from "../../eventBus";
const isFireplaceOn = ref(false);

eventBus.on("desactivate-fireplace", () => {
    isFireplaceOn.value = false;
    eventBus.emit("temperature-stabilizing");
});

function activateFireplace() {
    if (isFireplaceOn.value) {
        isFireplaceOn.value = false;
        eventBus.emit("desactivate-fireplace");
    } else {
        isFireplaceOn.value = true;
        eventBus.emit("desactivate-fan");
        eventBus.emit("temperature-heating");
    }
}
</script>

<style scoped>
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
