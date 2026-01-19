import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLightStore = defineStore('light', () => {
    const grid = ref([
        [false, true, false, true, true, false, false, true, false, true, true, false],
        [true, false, true, false, true, true, false, false, true, false, true, true],
        [false, true, true, false, false, true, true, false, false, true, false, true],
        [true, false, false, true, false, true, false, true, true, false, true, false],
        [true, true, false, false, true, false, true, false, true, true, false, false],
        [false, false, true, true, false, true, false, false, true, false, true, true],
        [false, true, false, true, false, false, true, true, false, true, false, true],
        [true, false, true, false, true, true, false, true, true, false, true, false],
        [false, true, false, true, true, false, true, false, false, true, false, true],
        [true, true, false, false, true, true, false, true, false, false, true, false],
        [true, false, true, true, false, false, true, false, true, true, false, true],
        [false, true, false, true, false, true, false, true, false, true, true, false],
    ]);
    const moves = ref(0);
    const isCompleted = ref(false);

    function clickCell(row, col) {
        toggleCell(row, col);
        toggleCell(row - 1, col);
        toggleCell(row + 1, col);
        toggleCell(row, col - 1);
        toggleCell(row, col + 1);
        moves.value += 1;
        // checkCompletion();
    }

    function toggleCell(row, col) {
        if (row >= 0 && row < grid.value.length && col >= 0 && col < grid.value[0].length) {
            grid.value[row][col] = !grid.value[row][col];
        }
    }

    return {
        grid,
        moves,
        isCompleted,

        clickCell,
        toggleCell,
    }
});