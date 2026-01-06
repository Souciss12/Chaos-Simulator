<template>
    <div class="textToType">
        <span
            v-for="(char, index) in dactyloStore.textToType"
            :key="index"
            :class="{
                typed: index < dactyloStore.currentTextIndex,
                current: index === dactyloStore.currentTextIndex,
                error: dactyloStore.strokeErrors.includes(index),
            }"
        >
            {{ char }}
        </span>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useDactyloStore } from "../stores/dactyloStore";

let isStarted = false;

const dactyloStore = useDactyloStore();

const handleKeyPress = (event) => {
    if (
        event.key == "Shift" ||
        event.key == "CapsLock" ||
        event.key == "Alt" ||
        event.key == "Control"
    ) {
        return;
    }

    if (!isStarted) {
        dactyloStore.start();
    }
    isStarted = true;

    dactyloStore.processKey(event.key);

    if (dactyloStore.currentTextIndex >= dactyloStore.textToType.length) {
        isStarted = false;
        dactyloStore.end();
    }
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
