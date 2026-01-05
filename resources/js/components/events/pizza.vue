<template>
    <div class="table">
        <img src="../../../assets/pizza/table.png" />
        <div class="poubelle">
            <img @click="trashPizza()" src="../../../assets/pizza/poubelle.png" alt="" />
        </div>
        <div class="microonde">
            <img @click="cookPizza()" src="../../../assets/pizza/microonde.png" alt="" />
            <div v-if="isCooking" class="cooking-indicator">
                <div class="cooking-text">Cuisson {{ cookingTimeLeft }}s</div>
            </div>
            <div v-if="isPizzaCooked && !isCooking" class="ready-indicator">
                ✓ Ready !
            </div>
        </div>
        <div class="pizza" :class="{ hidePizza: pizzaState == 'empty' }">
            <img
                :src="
                    pizzaState == 'pate'
                        ? pateImg
                        : pizzaState == 'tomate'
                        ? tomateImg
                        : pizzaState == 'fromage'
                        ? fromageImg
                        : pizzaState == 'ananas'
                        ? ananasImg
                        : pizzaState == 'jambon'
                        ? jambonImg
                        : pizzaState == 'peperonni'
                        ? peperonniImg
                        : ''
                "
            />
        </div>
        <div class="assiettes">
            <div class="assiette-pate">
                <img
                    @click="addIngredient('pate')"
                    src="../../../assets/pizza/assiette-pate.png"
                />
            </div>
            <div class="assiette-tomate">
                <img
                    @click="addIngredient('tomate')"
                    src="../../../assets/pizza/assiette-tomate.png"
                />
            </div>
            <div class="assiette-fromage">
                <img
                    @click="addIngredient('fromage')"
                    src="../../../assets/pizza/assiette-fromage.png"
                />
            </div>
            <div class="assiette-ananas">
                <img
                    @click="addIngredient('ananas')"
                    src="../../../assets/pizza/assiette-ananas.png"
                />
            </div>
            <div class="assiette-jambon">
                <img
                    @click="addIngredient('jambon')"
                    src="../../../assets/pizza/assiette-jambon.png"
                />
            </div>
            <div class="assiette-peperonni">
                <img
                    @click="addIngredient('peperonni')"
                    src="../../../assets/pizza/assiette-peperonni.png"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useChaosStore } from "../../stores/chaosStore";
import { ref, watch } from "vue";
import { eventBus } from "../../eventBus";
import pateImg from "../../../assets/pizza/pate.png";
import tomateImg from "../../../assets/pizza/tomate.png";
import fromageImg from "../../../assets/pizza/fromage.png";
import ananasImg from "../../../assets/pizza/ananas.png";
import jambonImg from "../../../assets/pizza/jambon.png";
import peperonniImg from "../../../assets/pizza/peperonni.png";

const chaosStore = useChaosStore();
let pizzaState = ref("empty");
let cookedPizzaType = ref("empty");
let isPizzaCooked = ref(false);
let isCooking = ref(false);
let cookingTimeLeft = ref(0);
let cookingProgress = ref(0);
let intervalId = null;

function trashPizza() {
    if (pizzaState.value != "empty") {
        pizzaState.value = "empty";
    }
    if (cookedPizzaType.value != "empty") {
        cookedPizzaType.value = "empty";
        isPizzaCooked.value = false;
        clearInterval(intervalId);
        intervalId = null;
        isCooking.value = false;
    }
}

function cookPizza() {
    if (
        pizzaState.value == "ananas" ||
        pizzaState.value == "jambon" ||
        pizzaState.value == "peperonni" ||
        pizzaState.value == "fromage"
    ) {
        cookedPizzaType.value = pizzaState.value;
        pizzaState.value = "empty";
        isPizzaCooked.value = false;
        isCooking.value = true;
        cookingTimeLeft.value = 2;
        cookingProgress.value = 0;

        if (intervalId) clearInterval(intervalId);

        const startTime = Date.now();
        const duration = 20000;

        intervalId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);

            cookingTimeLeft.value = Math.ceil(remaining / 1000);
            cookingProgress.value = Math.min(100, (elapsed / duration) * 100);

            if (elapsed >= duration) {
                clearInterval(intervalId);
                intervalId = null;
                isCooking.value = false;
                isPizzaCooked.value = true;
            }
        }, 100);
    }
}

function addIngredient(ingredient) {
    if (pizzaState.value === "empty") {
        if (ingredient === "pate") {
            pizzaState.value = "pate";
            return;
        }
    } else if (pizzaState.value === "pate") {
        if (ingredient === "tomate") {
            pizzaState.value = "tomate";
            return;
        } else {
            chaosStore.addChaos(1, 710, 610);
        }
    } else if (pizzaState.value === "tomate") {
        if (ingredient == "fromage") {
            pizzaState.value = "fromage";
            return;
        } else {
            chaosStore.addChaos(1, 710, 610);
        }
    } else if (pizzaState.value === "fromage") {
        if (
            ingredient == "ananas" ||
            ingredient == "jambon" ||
            ingredient == "peperonni"
        ) {
            pizzaState.value = ingredient;
            return;
        } else {
            chaosStore.addChaos(1, 710, 610);
        }
    } else {
        chaosStore.addChaos(1, 710, 610);
    }
}

function resetMicrowave() {
    isPizzaCooked.value = false;
    cookedPizzaType.value = "empty";
}

eventBus.on("pizza-given", () => {
    resetMicrowave();
});

watch([cookedPizzaType, isPizzaCooked], ([newPizzaType, newIsCoooked]) => {
    eventBus.emit("pizza-state-changed", {
        cookedPizzaType: newPizzaType,
        isPizzaCooked: newIsCoooked,
    });
});
</script>

<style scoped>
.table {
    position: absolute;
    bottom: 80px;
    left: 400px;
    width: 600px;
}
.table img {
    width: 700px;
    height: auto;
}

.poubelle {
    position: absolute;
    bottom: -30px;
    left: 170px;
}

.poubelle img {
    width: 140px;
    height: auto;
    transition: transform 0.2s;
}

.poubelle img:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.microonde {
    position: absolute;
    bottom: -20px;
    left: 340px;
}

.microonde img {
    width: 120px;
    height: auto;
    transition: transform 0.2s;
}

.microonde img:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.cooking-indicator {
    position: absolute;
    bottom: 107px;
    left: -5px;
    width: 120px;
    background: transparent;
}

.cooking-text {
    font-size: 20px;
    font-weight: bold;
    color: #973b1a;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
    white-space: nowrap;
    background: transparent;
}

.ready-indicator {
    position: absolute;
    bottom: 112px;
    left: 0;
    width: 120px;
    background: rgba(34, 139, 34, 0.9);
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.pizza {
    position: absolute;
    bottom: 184px;
    left: 276px;
}

.pizza img {
    width: 130px;
    height: 85px;
    transition: transform 0.2s;
}

.hidePizza {
    display: none;
}

.pizza img:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.assiettes img {
    width: 140px;
    height: auto;
    background: transparent;
    transition: transform 0.2s;
}

.assiettes img:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.assiette-pate {
    bottom: 240px;
    left: 120px;
    position: absolute;
}

.assiette-tomate {
    bottom: 192px;
    left: 90px;
    position: absolute;
}

.assiette-fromage {
    bottom: 145px;
    left: 45px;
    position: absolute;
}

.assiette-peperonni {
    bottom: 145px;
    left: 505px;
    position: absolute;
}

.assiette-jambon {
    bottom: 192px;
    left: 460px;
    position: absolute;
}

.assiette-ananas {
    bottom: 240px;
    left: 420px;
    position: absolute;
}
</style>
