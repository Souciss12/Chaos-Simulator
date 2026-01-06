import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDactyloStore = defineStore('dactylo', () => {
    const correctStrokes = ref(0);
    const totalStrokes = ref(0);
    const strokeErrors = ref([]);
    const startTime = ref(null);
    const endTime = ref(null);

    const currentTextIndex = ref(0);

    const textToType = ref("");
    const textsToType = ref([
        "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. Sphinx of black quartz, judge my vow! How vexingly quick daft zebras jump through the misty morning.",
        "La programmation est un art qui demande patience et créativité. Chaque ligne de code raconte une histoire unique. Les développeurs transforment des idées abstraites en solutions concrètes et fonctionnelles.",
        "Learning to type faster improves productivity significantly. Practice makes perfect when developing new skills. Consistent training leads to remarkable improvements in accuracy and speed over time.",
        "Les montagnes enneigées brillent sous le soleil d'hiver. La nature offre des paysages magnifiques à contempler. Chaque saison apporte son lot de couleurs et d'émotions nouvelles dans notre quotidien.",
        "Technology shapes our modern world in countless ways. Innovation drives progress and creates new opportunities. Digital tools connect people across continents and enable global collaboration every single day.",
        "Le café du matin réveille les sens et l'esprit. Les arômes délicieux flottent dans l'air frais. Un moment de calme avant de commencer une journée remplie d'aventures et de découvertes passionnantes.",
        "Music transcends language and cultural boundaries effortlessly. Melodies evoke emotions and memories from deep within. Artists express their souls through harmonious sounds that touch hearts around the entire world.",
        "Les étoiles scintillent dans le ciel nocturne infini. L'univers recèle des mystères fascinants à explorer. La curiosité humaine nous pousse à chercher des réponses aux questions les plus profondes."
    ]);

    function prepareNewText() {
        const randomIndex = Math.floor(Math.random() * textsToType.value.length);
        textToType.value = textsToType.value[randomIndex];
    }

    function processKey(key) {
        totalStrokes.value += 1;
        for (let i = 0; i < textToType.value.length; i++) {
            if (i == currentTextIndex.value) {
                if (key === textToType.value[i]) {
                    currentTextIndex.value += 1;
                    correctStrokes.value += 1;
                    return;
                } else {
                    if (!strokeErrors.value.includes(currentTextIndex.value) && key !== "Space")
                        strokeErrors.value.push(currentTextIndex.value);
                    correctStrokes.value = 0;
                    return;
                }
            }
        }
    }

    function start() {
        correctStrokes.value = 0;
        totalStrokes.value = 0;
        startTime.value = new Date();
        endTime.value = null;
    }

    function end() {
        endTime.value = new Date();
    }

    return {
        correctStrokes,
        totalStrokes,
        strokeErrors,
        startTime,
        endTime,
        currentTextIndex,
        textToType,
        textsToType,
        prepareNewText,
        processKey,
        start,
        end
    };
});