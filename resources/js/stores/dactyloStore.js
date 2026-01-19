import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDactyloStore = defineStore('dactylo', () => {
    const totalStrokes = ref(0);
    const currentStreak = ref(0);

    const currentStrokes = ref(0);
    const errors = ref([]);
    const accuracy = ref(0);

    const startTime = ref(null);
    const endTime = ref(null);
    const passedTime = ref(0);
    const typeSpeed = ref(0);

    const currentTextIndex = ref(0);
    const isStarted = ref(false);
    const textToType = ref("");

    const language = ref("en");
    const languages = ref(["en", "fr", "es", "de", "it"]);
    const numberOfWords = ref(10);
    const category = ref("All");
    const categories = ref(["All", "Countries", "Sports", "Animals", "Birds"]);
    const EnglishCategories = ref(["All", "Wordle", "Brainrot", "Countries", "Capitals_Of_Countries", "Sports", "Animals", "Birds", "Softwares", "Programming_Languages", "Games", "Companies"]);
    const capitalLetters = ref(false);

    async function prepareNewText() {
        try {
            var url = '';
            if (category.value === "All") {
                url = 'https://random-words-api.kushcreates.com/api?language=' + language.value + '&words=' + numberOfWords.value;
            } else {
                url = 'https://random-words-api.kushcreates.com/api?language=' + language.value + '&words=' + numberOfWords.value + '&category=' + category.value;
            }

            const response = await fetch(url);
            const data = await response.json();

            textToType.value = data.map(item => item.word).join(' ');
        } catch (error) {
            console.error('Error fetching random words:', error);
        }
    }

    function saveParameters() {
        prepareNewText();
        restart();
    }

    function processKey(key) {
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
                    if (!errors.value.includes(currentTextIndex.value) && key !== "Space")
                        errors.value.push(currentTextIndex.value);
                    currentStreak.value = 0;
                    return;
                }
            }
        }
    }

    function restart() {
        isStarted.value = false;
        currentTextIndex.value = 0;
    }

    function start() {
        isStarted.value = true;
        currentStreak.value = 0;
        currentStrokes.value = 0;
        errors.value = [];
        startTime.value = new Date();
        endTime.value = null;
    }

    function end() {
        prepareNewText();

        isStarted.value = false;
        currentTextIndex.value = 0;

        endTime.value = new Date();
        passedTime.value = (endTime.value - startTime.value) / 1000;
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