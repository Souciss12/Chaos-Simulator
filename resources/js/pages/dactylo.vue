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

            <div class="controls">
                <div class="control-group">
                    <label>Language</label>
                    <select v-model="dactyloStore.language">
                        <option
                            v-for="lang in dactyloStore.languages"
                            :key="lang"
                            :value="lang"
                        >
                            {{ lang.toUpperCase() }}
                        </option>
                    </select>
                </div>
                <div class="control-group">
                    <label>Words</label>
                    <input
                        type="number"
                        v-model.number="dactyloStore.numberOfWords"
                        min="5"
                        max="80"
                    />
                </div>
                <div class="control-group">
                    <label>Category</label>
                    <select v-model="dactyloStore.category">
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
                            <option
                                v-for="cat in dactyloStore.categories"
                                :key="cat"
                                :value="cat"
                            >
                                {{ cat }}
                            </option>
                        </template>
                    </select>
                </div>
                <button
                    class="apply-btn"
                    @click="
                        (event) => {
                            dactyloStore.saveParameters();
                            event.target.blur();
                        }
                    "
                >
                    Apply Settings
                </button>
            </div>

            <div class="text-area">
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
            </div>
        </div>
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
    font-size: 2rem;
    line-height: 1.8;
    font-family: "Courier New", "Consolas", monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
    letter-spacing: 0.02em;
}

.textToType span {
    color: #6e798b;
    transition: all 0.15s ease;
    position: relative;
}

.typed {
    color: #8b92a8 !important;
}

.typed.error {
    color: #e06c75 !important;
    text-decoration: line-through;
}

.current {
    color: #e1e4e8 !important;
    background: #5b8bd4;
    border-radius: 3px;
    animation: blink 1s ease-in-out infinite;
}

/* @keyframes blink {
    0%,
    50%,
    100% {
        opacity: 1;
    }
    25%,
    75% {
        opacity: 0.5;
    }
} */

/* Responsive */
@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }

    .textToType {
        font-size: 1.5rem;
    }

    .text-area {
        padding: 2rem 1.5rem;
    }

    .title {
        font-size: 1.5rem;
    }
}
</style>
