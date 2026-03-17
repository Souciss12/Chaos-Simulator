<template>
    <div :class="{ hide: !isActivated }">
        <div class="textToType">
            <span
                v-for="(char, index) in textToType"
                :key="index"
                :class="{
                    typed: index < currentTextIndex,
                    current: index === currentTextIndex,
                    error: errors.includes(index.toString()),
                }"
            >
                {{ char }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import { WordItem } from "../../types/wordItem";

const chaosStore = useChaosStore();
const isActivated = ref<boolean>(true);
const numberOfWords = ref<number>(6);
const textToType = ref<string>("");
const currentTextIndex = ref<number>(0);
const currentStrokes = ref<number>(0);
const errors = ref<string[]>([]);

const handleKeyPress = (event: KeyboardEvent): void => {
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

async function prepareText(): Promise<void> {
    try {
        var url: string = "";
        url =
            "https://random-words-api.kushcreates.com/api?language=en&words=" +
            numberOfWords.value;

        const response: Response = await fetch(url);
        const data: WordItem[] = await response.json();

        textToType.value = data.map((item) => item.word).join(" ");
    } catch (error) {
        console.error("Error fetching random words:", error);
    }
}

function processKey(key: string): void {
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
                if (
                    !errors.value.includes(currentTextIndex.value.toString()) &&
                    key !== "Space"
                ) {
                    errors.value.push(currentTextIndex.value.toString());
                    chaosStore.addChaos(1, 1540, 185);
                }
                return;
            }
        }
    }
}

function end(): void {
    isActivated.value = false;
    chaosStore.reduceChaos(3, 1540, 185);

    setTimeout(() => {
        reset();
    }, 3000);
}

function reset(): void {
    currentTextIndex.value = 0;
    currentStrokes.value = 0;
    errors.value = [];

    isActivated.value = true;
}

onMounted((): void => {
    prepareText();
    reset();
    window.addEventListener("keydown", handleKeyPress);
});

onUnmounted((): void => {
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
