import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { Grid } from '../types/grid';

export const useGameOfLifeStore = defineStore('gameOfLife', () => {
    const isStarted = ref<boolean>(false);
    const speed = ref<number>(100);

    let intervalId: number | null = null;

    const gridSize = ref<number>(45);
    const grid = ref<Grid>(Array.from({ length: gridSize.value }, () => Array.from({ length: gridSize.value }, () => false)));

    function clickCell(row: number, col: number): void {
        if (!isStarted.value) {
            grid.value[row][col] = !grid.value[row][col];
        }
    }

    function processGeneration(): void {
        let newGrid: Grid = Array.from({ length: gridSize.value }, () => Array.from({ length: gridSize.value }, () => false));

        for (let row = 0; row < gridSize.value; row++) {
            for (let col = 0; col < gridSize.value; col++) {
                let isLiving: boolean = grid.value[row][col] == true ? true : false;

                let livingNeighbors: number = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        let neighborRow: number = row + i;
                        let neighborCol: number = col + j;

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

    watch(speed, (_): void => {
        if (isStarted.value) {
            pause();
            start();
        }
    });

    watch(gridSize, (_): void => {
        clear();
    });

    function start(): void {
        if (intervalId) return;

        isStarted.value = true;

        intervalId = setInterval(() => {
            processGeneration();
        }, speed.value);
    }

    function pause(): void {
        isStarted.value = false;

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function clear(): void {
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