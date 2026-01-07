<template>
    <div class="stats">
        <div class="total-strokes">Total strokes : {{ dactyloStore.totalStrokes }}</div>
        <div class="current-streak">
            Current streak : {{ dactyloStore.currentStreak }}
        </div>
        <div class="errors">Errors : {{ dactyloStore.errors.length }}</div>
        <div class="passed-times">Time : {{ dactyloStore.passedTime }}s</div>
        <div class="accuracy">Accuracy : {{ dactyloStore.accuracy.toFixed(1) }}%</div>
        <div class="speed">Speed : {{ Math.round(dactyloStore.typeSpeed) }} cpm</div>
    </div>
    <div class="parameters">
        <label for="language-select">Language: </label>
        <select id="language-select" v-model="dactyloStore.language">
            <option v-for="lang in dactyloStore.languages" :key="lang" :value="lang">
                {{ lang.toUpperCase() }}
            </option>
        </select>

        <label for="number-of-words">Words: </label>
        <input
            id="number-of-words"
            type="number"
            v-model.number="dactyloStore.numberOfWords"
            min="5"
            max="40"
        />

        <label for="category-select">Category: </label>
        <select id="category-select" v-model="dactyloStore.category">
            <template v-if="dactyloStore.language == 'en'">
                <option
                    v-for="cat in dactyloStore.EnglishCategories"
                    :key="cat"
                    :value="cat"
                >
                    {{ cat }}
                </option>
            </template>
            <template v-else>
                <option v-for="cat in dactyloStore.categories" :key="cat" :value="cat">
                    {{ cat }}
                </option>
            </template>
        </select>

        <button
            @click="
                (event) => {
                    dactyloStore.saveParameters();
                    event.target.blur();
                }
            "
        >
            Save
        </button>
    </div>
    <div class="textToType">
        <span
            v-for="(char, index) in dactyloStore.textToType"
            :key="index"
            :class="{
                typed: index < dactyloStore.currentTextIndex,
                current: index === dactyloStore.currentTextIndex,
                error: dactyloStore.errors.includes(index),
            }"
        >
            {{ char }}
        </span>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useDactyloStore } from "../stores/dactyloStore";

const dactyloStore = useDactyloStore();

const handleKeyPress = (event) => {
    if (
        event.key == "Shift" ||
        event.key == "CapsLock" ||
        event.key == "Alt" ||
        event.key == "Control" ||
        event.key == "Dead" ||
        event.key == "F12"
    ) {
        return;
    }

    event.preventDefault();
    dactyloStore.processKey(event.key);
};

onMounted(() => {
    dactyloStore.prepareNewText();
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style scoped>
.stats {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    padding: 1rem;
}

.stats > div {
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #333;
}

.parameters {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
}

.textToType {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px;
    max-width: 90vw;
    font-size: 40px;
    line-height: 1.5;
    font-family: "Courier New", monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.typed {
    color: #4caf50;
}

.typed.error {
    color: #f44336;
}

.current {
    text-decoration: underline;
    color: #666;
}

span {
    color: #666;
}
</style>
