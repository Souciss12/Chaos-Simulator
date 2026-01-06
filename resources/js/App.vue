<template>
    <component :is="currentComponent" />
</template>

<script setup>
import { computed } from "vue";
import { useNavigationStore } from "./stores/navigationStore";
import Menu from "./pages/menu.vue";
import Game from "./pages/game.vue";

const navigationStore = useNavigationStore();

const currentComponent = computed(() => {
    switch (navigationStore.currentPage) {
        case "menu":
            return Menu;
        case "game":
            return Game;
        default:
            return Menu;
    }
});
</script>

<style scoped></style>
