import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLightStore = defineStore('light', () => {
    const canClick = ref(true);
    const isResolving = ref(false);
    const shouldStop = ref(false);

    const moves = ref(0);
    const isPossible = ref(true);
    const posibilities = ref([]);
    const currentCombination = ref('0/0');

    const rows = ref(5);
    const cols = ref(5);
    const fillPercent = ref(50);

    const originalGrid = ref([]);
    const grid = ref([]);

    function generateGrid() {
        shouldStop.value = true;
        const newGrid = [];
        for (let r = 0; r < rows.value; r++) {
            const row = [];
            for (let c = 0; c < cols.value; c++) {
                const isTrue = Math.random() * 100 < fillPercent.value;
                row.push(isTrue);
            }
            newGrid.push(row);
        }
        originalGrid.value = newGrid;
        restart();
    }

    generateGrid();
    grid.value = originalGrid.value.map(row => [...row]);

    // 1 compter nombre posibilités premières lignes
    // 2 sur la première ligne, essayer une combinaison en s'aidant du binaire
    // 3 Pour chaque ligne une après l'autre, si une case false cliquer sur la case en dessous
    // 4 vérifier si la dernière ligne est toute true, sinon recommencer avec une autre combinaison pour la première ligne

    async function resolve() {
        // Empêcher de lancer deux fois en même temps
        if (isResolving.value) return;

        isResolving.value = true;
        shouldStop.value = false;
        canClick.value = false;
        posibilities.value = [];
        isPossible.value = false;

        const resetGrid = () => {
            grid.value = originalGrid.value.map(row => [...row]);
            moves.value = 0;
            isPossible.value = false;
        };

        // 1 compter nombre posibilités premières lignes
        const combinaison = Math.pow(2, grid.value[0].length);
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < combinaison; i++) {
            // Vérifier si on doit arrêter
            if (shouldStop.value) {
                restart();
                break;
            }

            currentCombination.value = i + 1 + " / " + combinaison;

            // 2 sur la première ligne, essayer une combinaison en s'aidant du binaire
            resetGrid();
            for (let j = 0; j < grid.value[0].length; j++) {
                if ((i >> j) & 1) {
                    clickCell(0, j);
                    await delay(1);
                }
            }

            // 3 Pour chaque ligne une après l'autre, si une case false cliquer sur la case en dessous
            for (let row = 0; row < grid.value.length - 1; row++) {
                for (let col = 0; col < grid.value[0].length; col++) {
                    if (!grid.value[row][col]) {
                        clickCell(row + 1, col);
                        await delay(1);
                    }
                }
            }

            // 4 vérifier si la grille est complète
            if (grid.value.every(row => row.every(cell => cell))) {
                isPossible.value = true;
                posibilities.value.push(i);
            }
        }

        restart();

        isResolving.value = false;
        canClick.value = true;
    }

    function restart() {
        shouldStop.value = true;
        grid.value = originalGrid.value.map(row => [...row]);
        moves.value = 0;
    }

    function clickCell(row, col) {
        toggleCell(row, col);
        toggleCell(row - 1, col);
        toggleCell(row + 1, col);
        toggleCell(row, col - 1);
        toggleCell(row, col + 1);
        moves.value += 1;
    }

    function clickCellHand(row, col) {
        if (!canClick.value) return;
        toggleCell(row, col);
        toggleCell(row - 1, col);
        toggleCell(row + 1, col);
        toggleCell(row, col - 1);
        toggleCell(row, col + 1);
        moves.value += 1;
    }

    function toggleCell(row, col) {
        if (row >= 0 && row < grid.value.length && col >= 0 && col < grid.value[0].length) {
            grid.value[row][col] = !grid.value[row][col];
        }
    }


    return {
        grid,

        canClick,

        moves,
        posibilities,
        isPossible,
        currentCombination,

        rows,
        cols,
        fillPercent,

        generateGrid,

        resolve,
        clickCell,
        clickCellHand,
        toggleCell,
        restart,
    }
});