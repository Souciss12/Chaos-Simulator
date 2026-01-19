<template>
    <component :is="currentComponent" />
</template>

<script setup>
import { computed } from "vue";
import { useNavigationStore } from "./stores/navigationStore";
import Menu from "./pages/menu.vue";
import Game from "./pages/game.vue";
import Dactylo from "./pages/dactylo.vue";
import Light from "./pages/light.vue";
import GameOfLife from "./pages/gameOfLife.vue";

const navigationStore = useNavigationStore();

const currentComponent = computed(() => {
    switch (navigationStore.currentPage) {
        case "menu":
            return Menu;
        case "game":
            return Game;
        case "dactylo":
            return Dactylo;
        case "light":
            return Light;
        case "gameOfLife":
            return GameOfLife;
        default:
            return Menu;
    }
});
</script>

<style scoped></style>
