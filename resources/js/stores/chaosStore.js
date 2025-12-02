import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChaosStore = defineStore('chaos', () => {
    const chaosLevel = ref(0);
    const isGameOver = ref(false);

    function addChaos(amount) {
        if (chaosLevel.value < 100) {
            chaosLevel.value += amount;
        }
        if (chaosLevel.value > 100) {
            chaosLevel.value = 100;
        }
        checkGameOver();
    }

    function reduceChaos(amount) {
        if (chaosLevel.value > 0) {
            chaosLevel.value -= amount;
        }
    }

    function checkGameOver() {
        if (chaosLevel.value >= 100) {
            isGameOver.value = true;
        }
    }

    function restart() {
        chaosLevel.value = 0;
        isGameOver.value = false;
    }

    return {
        chaosLevel,
        isGameOver,

        addChaos,
        reduceChaos,
        checkGameOver,
        restart,
    };
});