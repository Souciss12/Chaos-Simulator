import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Page } from '../types/page';

export const useNavigationStore = defineStore('navigation', () => {
    const currentPage = ref<Page>('menu');

    function navigateTo(page: Page) {
        currentPage.value = page;
    }

    return {
        currentPage,
        navigateTo,
    };
});
