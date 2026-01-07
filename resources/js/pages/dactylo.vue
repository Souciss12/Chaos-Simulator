<template>
    <div class="page">
        <div class="container">
            <header class="header">
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Speed</span>
                        <span class="stat-value"
                            >{{ Math.round(dactyloStore.typeSpeed) }} CPM</span
                        >
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Accuracy</span>
                        <span class="stat-value"
                            >{{ dactyloStore.accuracy.toFixed(1) }}%</span
                        >
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Time</span>
                        <span class="stat-value"
                            >{{ dactyloStore.passedTime.toFixed(1) }}s</span
                        >
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Streak</span>
                        <span class="stat-value">{{ dactyloStore.currentStreak }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Errors</span>
                        <span class="stat-value">{{ dactyloStore.errors.length }}</span>
                    </div>
                </div>
            </header>

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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.page {
    min-height: 100vh;
    background: #1a1d29;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
        sans-serif;
}

.container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Header */
.header {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
}

.stat-item {
    background: #252a37;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border: 1px solid #2f3441;
    transition: all 0.2s ease;
}

.stat-item:hover {
    border-color: #4a5568;
    transform: translateY(-2px);
}

.stat-label {
    font-size: 0.75rem;
    color: #8b92a8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
}

.stat-value {
    font-size: 1.5rem;
    color: #e1e4e8;
    font-weight: 600;
}

/* Controls */
.controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-end;
    padding: 1.25rem;
    background: #252a37;
    border-radius: 8px;
    border: 1px solid #2f3441;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 120px;
}

.control-group label {
    font-size: 0.75rem;
    color: #8b92a8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
}

.control-group select,
.control-group input {
    padding: 0.625rem 0.875rem;
    background: #1a1d29;
    border: 1px solid #2f3441;
    border-radius: 6px;
    color: #e1e4e8;
    font-size: 0.9375rem;
    transition: all 0.2s ease;
    outline: none;
}

.control-group select:hover,
.control-group input:hover {
    border-color: #4a5568;
}

.control-group select:focus,
.control-group input:focus {
    border-color: #5b8bd4;
    box-shadow: 0 0 0 3px rgba(91, 139, 212, 0.1);
}

.apply-btn {
    padding: 0.625rem 1.75rem;
    background: #5b8bd4;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.apply-btn:hover {
    background: #4a7ac2;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(91, 139, 212, 0.3);
}

.apply-btn:active {
    transform: translateY(0);
}

/* Text Area */
.text-area {
    background: #252a37;
    padding: 3rem;
    border-radius: 12px;
    border: 1px solid #2f3441;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
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
