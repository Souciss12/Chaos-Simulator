import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNavigationStore = defineStore('navigation', () => {
    const currentPage = ref('menu');

    function navigateTo(page) {
        currentPage.value = page;
    }

    return {
        currentPage,
        navigateTo,
    };
});
