<template>
    <div v-if="popup.type == 'virus'">
        <PopupVirus
            :key="popup.id"
            :popup="popup"
            @close-popup="closePopup"
            @open-popup="openPopup"
        />
    </div>
    <div v-else-if="popup.type == 'ads'">
        <PopupAds
            :key="popup.id"
            :popup="popup"
            @close-popup="closePopup"
            @open-popup="openPopup"
        />
    </div>
    <div v-else-if="popup.type == 'update'">
        <PopupUpdate
            :key="popup.id"
            :popup="popup"
            @close-popup="closePopup"
            @open-popup="openPopup"
        />
    </div>
</template>

<script setup>
import PopupVirus from "./popups/popupVirus.vue";
import PopupAds from "./popups/popupAds.vue";
import PopupUpdate from "./popups/popupUpdate.vue";
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();

defineProps({
    popup: Object,
});

const timer = setInterval(() => {
    chaosStore.addChaos(1, 1250, 90);
}, 8000);

function closePopup(popupId, x, y) {
    clearInterval(timer);
    chaosStore.reduceChaos(1, x, y);
    chaosStore.closePopup(popupId);
}

function openPopup(popupId, x, y) {
    clearInterval(timer);
    chaosStore.addChaos(5, x, y);
    chaosStore.closePopup(popupId);
}
</script>

<style scoped></style>
