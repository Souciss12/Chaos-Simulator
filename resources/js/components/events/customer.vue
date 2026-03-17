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

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { eventBus } from "../../eventBus";
import { customerRandom } from "../../utils/seedRandom";
import { useChaosStore } from "../../stores/chaosStore";
import { PizzaState } from "../../types/pizzaState";
import { Pizza } from "../../types/pizza";
const chaosStore = useChaosStore();

const fromageImg: string = new URL("../../../assets/pizza/fromage.png", import.meta.url)
    .href;
const ananasImg: string = new URL("../../../assets/pizza/ananas.png", import.meta.url)
    .href;
const jambonImg: string = new URL("../../../assets/pizza/jambon.png", import.meta.url)
    .href;
const peperonniImg: string = new URL(
    "../../../assets/pizza/peperonni.png",
    import.meta.url
).href;

const isHiden = ref<boolean>(true);
const pizzaType = ref<PizzaState>("empty");
const cookedPizzaType = ref<PizzaState>("empty");
const isPizzaCooked = ref<boolean>(false);
let customerTimer: number | ReturnType<typeof setInterval> | null = null;

setTimeout(() => {
    spawnCustomer();
}, customerRandom.randomInt(5000, 10000));

const handlePizzaStateChange = (data: Pizza): void => {
    cookedPizzaType.value = data.cookedPizzaType;
    isPizzaCooked.value = data.isPizzaCooked;
};

onMounted((): void => {
    eventBus.on("pizza-state-changed", handlePizzaStateChange as any);
});

onUnmounted((): void => {
    eventBus.off("pizza-state-changed", handlePizzaStateChange as any);
    if (customerTimer) clearInterval(customerTimer);
});

function givePizza(): void {
    if (!isHiden.value && isPizzaCooked.value) {
        if (pizzaType.value === cookedPizzaType.value) {
            isHiden.value = true;
            chaosStore.reduceChaos(3, 800, 500);
            eventBus.emit("pizza-given");
        }
    }
}
function spawnCustomer(): void {
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
