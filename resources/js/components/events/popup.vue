<template>
    <div v-if="popup.type == 'virus'">
        <PopupVirus :key="popup.id" :popup="popup" />
    </div>
    <div v-else-if="popup.type == 'ads'">
        <PopupAds :key="popup.id" :popup="popup" />
    </div>
    <div v-else-if="popup.type == 'update'">
        <PopupUpdate :key="popup.id" :popup="popup" />
    </div>
</template>

<script setup>
import PopupVirus from "./popups/popupVirus.vue";
import PopupAds from "./popups/popupAds.vue";
import PopupUpdate from "./popups/popupUpdate.vue";

defineProps({
    popup: Object,
});
</script>

<style scoped></style>
