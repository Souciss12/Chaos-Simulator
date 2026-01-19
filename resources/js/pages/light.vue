<template>
    <div class="grid-container">
        <div class="grid">
            <div
                v-for="(row, rowIndex) in lightStore.grid"
                :key="rowIndex"
                class="grid-row"
            >
                <div
                    @click="lightStore.clickCell(rowIndex, colIndex)"
                    v-for="(col, colIndex) in row"
                    :key="colIndex"
                    class="grid-col"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useLightStore } from "../stores/lightStore";

const lightStore = useLightStore();
</script>

<style scoped>
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
</style>
