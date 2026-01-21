import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useGameOfLifeStore = defineStore('gameOfLife', () => {
    const isStarted = ref(false);
    const speed = ref(100);

    let intervalId = null;

    const gridSize = ref(45);
    const grid = ref(Array.from({ length: gridSize.value }, () => Array.from({ length: gridSize.value }, () => false)));

    function clickCell(row, col) {
        if (!isStarted.value) {
            grid.value[row][col] = !grid.value[row][col];
        }
    }

    function processGeneration() {
        let newGrid = Array.from({ length: gridSize.value }, () => Array.from({ length: gridSize.value }, () => false));

        for (let row = 0; row < gridSize.value; row++) {
            for (let col = 0; col < gridSize.value; col++) {
                let isLiving = grid.value[row][col] == true ? true : false;

                let livingNeighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        let neighborRow = row + i;
                        let neighborCol = col + j;

                        if (neighborRow >= 0 && neighborRow < gridSize.value && neighborCol >= 0 && neighborCol < gridSize.value) {
                            if (grid.value[neighborRow][neighborCol]) {
                                livingNeighbors += 1;
                            }
                        }
                    }
                }

                if (isLiving && livingNeighbors < 2) {
                    newGrid[row][col] = false;
                }

                if (isLiving && (livingNeighbors === 2 || livingNeighbors === 3)) {
                    newGrid[row][col] = true;
                }

                if (isLiving && livingNeighbors > 3) {
                    newGrid[row][col] = false;
                }

                if (!isLiving && livingNeighbors === 3) {
                    newGrid[row][col] = true;
                }
            }
        }

        grid.value = newGrid;
    }

    watch(speed, (newSpeed) => {
        if (isStarted.value) {
            pause();
            start();
        }
    });

    watch(gridSize, (newSize) => {
        clear();
    });

    function start() {
        if (intervalId) return;

        isStarted.value = true;

        intervalId = setInterval(() => {
            processGeneration();
        }, speed.value);
    }

    function pause() {
        isStarted.value = false;

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function clear() {
        isStarted.value = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        grid.value = Array.from({ length: gridSize.value }, () => Array.from({ length: gridSize.value }, () => false));
    }

    return {
        isStarted,
        speed,
        gridSize,
        grid,

        clickCell,
        processGeneration,
        start,
        pause,
        clear,
    }
});