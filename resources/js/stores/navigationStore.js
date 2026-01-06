import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNavigationStore = defineStore('navigation', () => {
    const currentPage = ref('menu');
    const gameMode = ref(null); // 'daily' ou 'random'
    const gameSeed = ref(null);

    function navigateTo(page) {
        currentPage.value = page;
    }

    function setGameMode(mode, seed) {
        gameMode.value = mode;
        gameSeed.value = seed;
    }

    return {
        currentPage,
        gameMode,
        gameSeed,
        navigateTo,
        setGameMode,
    };
});
