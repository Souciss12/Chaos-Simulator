<template>
    <div class="game-container">
        <div class="grid-container">
            <div class="grid">
                <div
                    v-for="(row, rowIndex) in gameOfLifeStore.grid"
                    :key="rowIndex"
                    class="grid-row"
                >
                    <div
                        v-for="(col, colIndex) in row"
                        :key="colIndex"
                        :style="{ backgroundColor: col ? '#000000' : '#FFFFFF' }"
                        class="grid-col"
                        @click="gameOfLifeStore.clickCell(rowIndex, colIndex)"
                    ></div>
                </div>
            </div>
        </div>
        <div class="parameter">
            <button @click="gameOfLifeStore.start">Play</button>
            <button @click="gameOfLifeStore.pause">Pause</button>
            <button @click="gameOfLifeStore.clear">Clear</button>
            <div class="speed">
                <label>Speed: {{ gameOfLifeStore.speed }}ms</label>
                <input
                    type="range"
                    min="1"
                    max="1000"
                    v-model.number="gameOfLifeStore.speed"
                />
                <div class="speed-labels">
                    <span>Fast</span>
                    <span>Slow</span>
                </div>
            </div>
            <div class="grid-size">
                <label>Size: {{ gameOfLifeStore.gridSize }}</label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    v-model.number="gameOfLifeStore.gridSize"
                />
                <div class="speed-labels">
                    <span>Small</span>
                    <span>Big</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGameOfLifeStore } from "../stores/gameOfLifeStore";

const gameOfLifeStore = useGameOfLifeStore();
</script>

<style scoped>
.game-container {
    position: relative;
    min-height: 100vh;
}

.grid-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.grid {
    display: flex;
    flex-direction: column;
    gap: 25;
    border: 1px solid #000000;
}

.grid-row {
    display: flex;
    gap: 25;
}

.grid-col {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* cursor: pointer; */
    font-size: 18px;
    border: 1px solid #1616161f;
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

.grid-size {
    margin-top: 20px;
    padding: 15px;
    border: 2px solid #000;
    background: white;
    min-width: 120px;
}

.grid-size label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
    color: #000;
}

.grid-size input[type="range"] {
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, #000 0%, #ccc 100%);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}

.grid-size input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
}

.grid-size input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: #333;
}

.grid-size input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.grid-size input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    background: #333;
}

.grid-size-labels {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #666;
    margin-top: 5px;
}

.speed {
    margin-top: 20px;
    padding: 15px;
    border: 2px solid #000;
    background: white;
    min-width: 120px;
}

.speed label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
    color: #000;
}

.speed input[type="range"] {
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, #000 0%, #ccc 100%);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
}

.speed input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
}

.speed input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: #333;
}

.speed input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #000;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.speed input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.2);
    background: #333;
}

.speed-labels {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #666;
    margin-top: 5px;
}
</style>
