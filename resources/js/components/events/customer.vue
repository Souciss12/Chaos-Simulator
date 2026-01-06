<template>
    <div class="customer" :class="{ hide: isHiden }">
        <div class="person">
            <img @click="givePizza()" src="../../../assets/pizza/person.png" />
        </div>
        <div class="bubble" @click="">
            <img src="../../../assets/pizza/bubble.png" />
            <div class="pizza">
                <img
                    :src="
                        pizzaType == 'fromage'
                            ? fromageImg
                            : pizzaType == 'ananas'
                            ? ananasImg
                            : pizzaType == 'jambon'
                            ? jambonImg
                            : pizzaType == 'peperonni'
                            ? peperonniImg
                            : ''
                    "
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { eventBus } from "../../eventBus";
import { customerRandom } from "../../utils/seedRandom";

import fromageImg from "../../../assets/pizza/fromage.png";
import ananasImg from "../../../assets/pizza/ananas.png";
import jambonImg from "../../../assets/pizza/jambon.png";
import peperonniImg from "../../../assets/pizza/peperonni.png";
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();

const isHiden = ref(true);
const pizzaType = ref("emtpy");
const cookedPizzaType = ref("empty");
const isPizzaCooked = ref(false);
let customerTimer = null;

setTimeout(() => {
    spawnCustomer();
}, customerRandom.randomInt(5000, 10000));

const handlePizzaStateChange = (data) => {
    cookedPizzaType.value = data.cookedPizzaType;
    isPizzaCooked.value = data.isPizzaCooked;
};

onMounted(() => {
    eventBus.on("pizza-state-changed", handlePizzaStateChange);
});

onUnmounted(() => {
    eventBus.off("pizza-state-changed", handlePizzaStateChange);
    if (customerTimer) clearInterval(customerTimer);
});

function givePizza() {
    if (!isHiden.value && isPizzaCooked.value) {
        if (pizzaType.value === cookedPizzaType.value) {
            isHiden.value = true;
            chaosStore.reduceChaos(3, 800, 500);
            eventBus.emit("pizza-given");
        }
    }
}
function spawnCustomer() {
    isHiden.value = false;
    const rnd = customerRandom.randomInt(1, 4);

    if (rnd === 1) {
        pizzaType.value = "fromage";
    } else if (rnd === 2) {
        pizzaType.value = "ananas";
    } else if (rnd === 3) {
        pizzaType.value = "jambon";
    } else {
        pizzaType.value = "peperonni";
    }
}

watch(
    () => isHiden.value,
    (newVal) => {
        if (newVal) {
            if (customerTimer) clearInterval(customerTimer);
            const rnd = customerRandom.randomInt(10000, 30000);
            setTimeout(() => {
                spawnCustomer();
            }, rnd);
        } else if (!newVal) {
            if (customerTimer) clearInterval(customerTimer);

            customerTimer = setInterval(() => {
                chaosStore.addChaos(2, 800, 500);
            }, 30000);
        }
    }
);
</script>

<style scoped>
.hide {
    display: none;
}

.customer {
    position: absolute;
    bottom: 500px;
    left: 500px;
}

.person {
    position: absolute;
    bottom: -320px;
    left: 100px;
    z-index: -1;
    transition: transform 0.2s;
}

.person img {
    height: 460px;
    width: auto;
}

.person:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.bubble {
    position: absolute;
    bottom: 90px;
    left: 270px;
}

.bubble img {
    height: 150px;
    width: auto;
}

.pizza {
    position: absolute;
    bottom: 37px;
    left: 43px;
}

.pizza img {
    height: 85px;
    width: auto;
}
</style>
