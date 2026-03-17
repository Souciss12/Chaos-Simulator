<template>
    <div class="fireplace">
        <img
            @click="activateFireplace()"
            :src="isFireplaceOn ? fireplaceOnImg : fireplaceOffImg"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { eventBus } from "../../eventBus";
const fireplaceOnImg: string = new URL(
    "../../../assets/on-fireplace.png",
    import.meta.url
).href;
const fireplaceOffImg: string = new URL(
    "../../../assets/off-fireplace.png",
    import.meta.url
).href;
const isFireplaceOn = ref<boolean>(false);

eventBus.on("desactivate-fireplace", (): void => {
    isFireplaceOn.value = false;
    eventBus.emit("temperature-stabilizing");
});

function activateFireplace(): void {
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
