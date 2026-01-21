<template>
    <div class="title">Lights Out Algo</div>

    <button class="help-button" @click="showHelp = !showHelp">Help</button>

    <div v-if="showHelp" class="help-modal" @click="showHelp = false">
        <div class="help-content" @click.stop>
            <button class="close-button" @click="showHelp = false">×</button>
            <h2>How to use</h2>

            <div class="help-section">
                <h3>The Game</h3>
                <p>
                    Lights Out is a puzzle where clicking a cell toggles itself and its
                    adjacent cells (up, down, left, right). The goal is to turn all cells
                    black.
                </p>
            </div>

            <div class="help-section">
                <h3>Features</h3>
                <p>
                    <strong>Manual Play:</strong> Click on any cell to toggle it and its
                    neighbors.
                </p>
                <p>
                    <strong>Auto Solve:</strong> Click "Resolve" to automatically find all
                    solutions using a brute-force algorithm.
                </p>
                <p>
                    <strong>Generate Grid:</strong> Create a new random grid with custom
                    rows, columns, and fill percentage.
                </p>
                <p><strong>Restart:</strong> Reset the grid to its initial state.</p>
            </div>

            <div class="help-section">
                <h3>How the Algorithm Works</h3>
                <p>
                    The algorithm tests all possible combinations for the first row. Each
                    combination is represented in binary where
                    <strong>1 = click the cell</strong> and
                    <strong>0 = don't click</strong>.
                </p>
                <p>
                    For example, on a 5-column grid: <code>10110</code> means click cells
                    at positions 1, 3, and 4 (reading left to right).
                </p>
                <p>
                    After clicking the first row pattern, the algorithm propagates down:
                    for each row, if a cell is white (off), it clicks the cell directly
                    below to fix it. This continues until the last row.
                </p>
                <p>If all cells end up black, that combination is a valid solution!</p>
            </div>

            <div class="help-section">
                <h3>Understanding the Stats</h3>
                <p>
                    <strong>Current Combination:</strong> The binary pattern currently
                    being tested on the first row during auto-solve.
                </p>
                <p><strong>Moves:</strong> Total number of cells clicked.</p>
                <p>
                    <strong>Solutions Found:</strong> All valid first-row patterns that
                    solve the puzzle. To use a solution manually:
                </p>
                <ol style="margin: 10px 0 0 20px; line-height: 1.7">
                    <li>Click "Restart" to reset the grid</li>
                    <li>Read the binary solution from left to right</li>
                    <li>
                        Click each cell in the first row where there's a
                        <strong>1</strong>
                    </li>
                    <li>For each subsequent row, click cells below any white cells</li>
                    <li>All cells should turn black!</li>
                </ol>
            </div>
        </div>
    </div>

    <div class="stats">
        <div class="stat-item">
            Current Combination: {{ lightStore.currentCombination }}
        </div>
        <div class="stat-item">Moves: {{ lightStore.moves }}</div>
        <div class="stat-item mt-4">
            Solutions Found: {{ lightStore.posibilities.length }}
        </div>
        <div v-if="lightStore.posibilities.length > 0" class="solutions-list">
            <div
                v-for="(sol, index) in lightStore.posibilities"
                :key="index"
                class="solution-item"
            >
                {{
                    sol
                        .toString(2)
                        .padStart(lightStore.grid[0].length, "0")
                        .split("")
                        .reverse()
                        .join("")
                }}
            </div>
        </div>
    </div>
    <div class="grid-container">
        <div class="content">
            <div class="grid">
                <div
                    v-for="(row, rowIndex) in lightStore.grid"
                    :key="rowIndex"
                    class="grid-row"
                >
                    <div
                        @click="lightStore.clickCellHand(rowIndex, colIndex)"
                        v-for="(col, colIndex) in row"
                        :key="colIndex"
                        class="grid-col"
                        :style="{ backgroundColor: col ? '#000000' : '#FFFFFF' }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
    <div class="parameter">
        <button @click="lightStore.resolve">Resolve</button>
        <button @click="lightStore.restart">Restart</button>
        <button @click="lightStore.generateGrid">GenerateGrid</button>

        <div class="input-group">
            <label>Rows:</label>
            <input type="number" v-model.number="lightStore.rows" min="1" max="15" />
        </div>

        <div class="input-group">
            <label>Cols:</label>
            <input type="number" v-model.number="lightStore.cols" min="1" max="15" />
        </div>

        <div class="input-group">
            <label>Fill %: {{ lightStore.fillPercent }}%</label>
            <input
                type="range"
                v-model.number="lightStore.fillPercent"
                min="0"
                max="100"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useLightStore } from "../stores/lightStore";

const lightStore = useLightStore();
const showHelp = ref(false);
</script>

<style scoped>
.title {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    font-weight: 700;
}
.help-button {
    position: absolute;
    top: 40px;
    right: 40px;
    padding: 10px 24px;
    border: 2px solid #000;
    background: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.help-button:hover {
    background: #000;
    color: white;
}

.help-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.help-content {
    background: white;
    border: 3px solid #000;
    padding: 50px;
    max-width: 650px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    border: 2px solid #000;
    background: white;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
    line-height: 1;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-button:hover {
    background: #000;
    color: white;
}

.help-content h2 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 30px 0;
    border-bottom: 3px solid #000;
    padding-bottom: 15px;
}

.help-section {
    margin-bottom: 30px;
}

.help-section h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
    margin-top: 0;
}

.help-section p {
    font-size: 16px;
    line-height: 1.7;
    margin: 0 0 12px 0;
}

.help-section p:last-child {
    margin-bottom: 0;
}

.help-section p strong {
    font-weight: 700;
}

.help-section code {
    background: #f0f0f0;
    border: 1px solid #000;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 15px;
}

.help-section ol {
    padding-left: 20px;
}

.help-section ol li {
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: 8px;
}

.stats {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
    font-size: 18px;
    font-weight: 600;
}

.stat-item {
    padding: 12px 30px;
    background: white;
    border: 2px solid #000;
    min-width: 200px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}

.solutions-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 400px;
    overflow-y: auto;
}

.solution-item {
    padding: 8px 15px;
    background: white;
    border: 2px solid #000;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    font-family: monospace;
}

.grid-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.grid {
    display: flex;
    flex-direction: column;
    gap: 25;
}

.grid-row {
    display: flex;
    gap: 25;
}

.grid-col {
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 18px;
    border: 1px solid #000000;
}

.parameter {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.parameter button {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid #000;
    background: white;
    color: #000;
    transition: all 0.2s;
    min-width: 120px;
}

.parameter button:hover {
    background: #000;
    color: white;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.input-group label {
    font-size: 14px;
    font-weight: 600;
}

.input-group input[type="number"] {
    padding: 8px;
    font-size: 14px;
    border: 2px solid #000;
    background: white;
    text-align: center;
}

.input-group input[type="range"] {
    cursor: pointer;
}
</style>
