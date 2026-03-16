import { defineStore } from 'pinia';
import { ref } from 'vue';
import { WordItem } from '../types/wordItem';

export const useDactyloStore = defineStore('dactylo', () => {
    const totalStrokes = ref<number>(0);
    const currentStreak = ref<number>(0);

    const currentStrokes = ref<number>(0);
    const errors = ref<string[]>([]);
    const accuracy = ref<number>(0);

    const startTime = ref<Date | null>(null);
    const endTime = ref<Date | null>(null);
    const passedTime = ref<number>(0);
    const typeSpeed = ref<number>(0);

    const currentTextIndex = ref<number>(0);
    const isStarted = ref<boolean>(false);
    const textToType = ref<string>("");

    const language = ref<string>("en");
    const languages = ref<string[]>(["en", "fr", "es", "de", "it"]);
    const numberOfWords = ref<number>(10);
    const category = ref<string>("All");
    const categories = ref<string[]>(["All", "Countries", "Sports", "Animals", "Birds"]);
    const EnglishCategories = ref<string[]>(["All", "Wordle", "Brainrot", "Countries", "Capitals_Of_Countries", "Sports", "Animals", "Birds", "Softwares", "Programming_Languages", "Games", "Companies"]);
    const capitalLetters = ref<boolean>(false);

    async function prepareNewText(): Promise<void> {
        try {
            var url: string = '';
            if (category.value === "All") {
                url = 'https://random-words-api.kushcreates.com/api?language=' + language.value + '&words=' + numberOfWords.value;
            } else {
                url = 'https://random-words-api.kushcreates.com/api?language=' + language.value + '&words=' + numberOfWords.value + '&category=' + category.value;
            }

            const response: Response = await fetch(url);
            const data: WordItem[] = await response.json();

            textToType.value = data.map(item => item.word).join(' ');
        } catch (error) {
            console.error('Error fetching random words:', error);
        }
    }

    function saveParameters(): void {
        prepareNewText();
        restart();
    }

    function processKey(key: string): void {
        if (!isStarted.value)
            start();
        isStarted.value = true;

        totalStrokes.value += 1;
        for (let i = 0; i < textToType.value.length; i++) {
            if (i == currentTextIndex.value) {
                if (key === textToType.value[i]) {
                    currentTextIndex.value += 1;
                    currentStreak.value += 1;
                    currentStrokes.value += 1;
                    if (currentTextIndex.value >= textToType.value.length) {
                        end();
                    }
                    return;
                } else {
                    if (!errors.value.includes(currentTextIndex.value.toString()) && key !== "Space")
                        errors.value.push(currentTextIndex.value.toString());
                    currentStreak.value = 0;
                    return;
                }
            }
        }
    }

    function restart(): void {
        isStarted.value = false;
        currentTextIndex.value = 0;
    }

    function start(): void {
        isStarted.value = true;
        currentStreak.value = 0;
        currentStrokes.value = 0;
        errors.value = [];
        startTime.value = new Date();
        endTime.value = null;
    }

    function end(): void {
        prepareNewText();

        isStarted.value = false;
        currentTextIndex.value = 0;

        endTime.value = new Date();
        if (startTime.value == null) return;
        passedTime.value = (endTime.value.getTime() - startTime.value.getTime()) / 1000;
        typeSpeed.value = (currentStrokes.value / passedTime.value) * 60;

        accuracy.value = ((currentStrokes.value - errors.value.length) / currentStrokes.value) * 100;
    }

    return {
        totalStrokes,
        currentStreak,

        currentStrokes,
        errors,
        accuracy,

        startTime,
        endTime,
        passedTime,
        typeSpeed,

        currentTextIndex,

        textToType,
        language,
        languages,
        numberOfWords,
        category,
        categories,
        EnglishCategories,
        capitalLetters,

        prepareNewText,
        saveParameters,
        processKey,
        restart,
        start,
        end
    };
});