<template>
    <div :class="{ hide: !isActivated }">
        <div class="textToType">
            <span
                v-for="(char, index) in textToType"
                :key="index"
                :class="{
                    typed: index < currentTextIndex,
                    current: index === currentTextIndex,
                    error: errors.includes(index),
                }"
            >
                {{ char }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();
const isActivated = ref(true);
const numberOfWords = ref(6);
const textToType = ref("");
const currentTextIndex = ref(0);
const currentStrokes = ref(0);
const errors = ref([]);

const handleKeyPress = (event) => {
    if (!isActivated) return;

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
    processKey(event.key);
};

async function prepareText() {
    try {
        var url = "";
        url =
            "https://random-words-api.kushcreates.com/api?language=en&words=" +
            numberOfWords.value;

        const response = await fetch(url);
        const data = await response.json();

        textToType.value = data.map((item) => item.word).join(" ");
    } catch (error) {
        console.error("Error fetching random words:", error);
    }
}

function processKey(key) {
    for (let i = 0; i < textToType.value.length; i++) {
        if (i == currentTextIndex.value) {
            if (key === textToType.value[i]) {
                currentTextIndex.value += 1;
                currentStrokes.value += 1;
                if (currentTextIndex.value >= textToType.value.length) {
                    end();
                    prepareText();
                }
                return;
            } else {
                if (!errors.value.includes(currentTextIndex.value) && key !== "Space") {
                    errors.value.push(currentTextIndex.value);
                    chaosStore.addChaos(1, 1540, 185);
                }
                return;
            }
        }
    }
}

function end() {
    isActivated.value = false;
    chaosStore.reduceChaos(3, 1540, 185);

    setTimeout(() => {
        reset();
    }, 15000);
}

function reset() {
    currentTextIndex.value = 0;
    currentStrokes.value = 0;
    errors.value = [];

    isActivated.value = true;
}

onMounted(() => {
    prepareText();
    reset();
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style scoped>
.textToType {
    position: absolute;
    top: 180px;
    right: 370px;
    max-width: 450px;
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

.hide {
    display: none;
}
</style>
