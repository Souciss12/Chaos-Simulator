<template>
    <div class="calendar">
        <img @click="openCalendar()" :src="currentCalendarImage" />
    </div>
    <div :class="{ openCalendar: isCalendarOpen, hideCalendar: !isCalendarOpen }">
        <img class="calendarImg" :src="currentCalendarImage" />
    </div>
    <!-- <button @click="changeCurrentDay()" class="ms-3">Change</button> -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import { eventBus } from "../../eventBus";
import { seedRandom } from "../../utils/seedRandom";

const chaosStore = useChaosStore();
let isCalendarOpen = ref(false);
const isMessageSent = ref(false);

chaosStore.calendarEvents = [
    ["01", "none"],
    ["02", "Lucas"],
    ["03", "none"],
    ["05", "Émilie"],
    ["10", "none"],
    ["16", "none"],
    ["17", "Gabriel"],
    ["19", "Sophia"],
    ["22", "Clara"],
    ["24", "none"],
    ["25", "none"],
    ["30", "Nathan"],
];
chaosStore.currentDay = seedRandom.randomInt(0, 10);

const currentCalendarImage = computed(() => {
    return new URL(
        `../../../assets/calendar/${
            chaosStore.calendarEvents[chaosStore.currentDay][0]
        }-calendar.jpg`,
        import.meta.url
    ).href;
});

eventBus.on("message-sent-success", () => {
    isMessageSent.value = true;
});

setInterval(() => {
    if (!isMessageSent.value && [1, 3, 6, 7, 8, 11].includes(chaosStore.currentDay)) {
        chaosStore.addChaos(5, 200, 150);
    }
    changeCurrentDay();
}, seedRandom.randomInt(30000, 60000));

function openCalendar() {
    isCalendarOpen.value = !isCalendarOpen.value;
}

function changeCurrentDay() {
    if (chaosStore.currentDay < chaosStore.calendarEvents.length - 1)
        chaosStore.currentDay += 1;
    else chaosStore.currentDay = 0;

    isMessageSent.value = false;
    eventBus.emit("day-changed", chaosStore.currentDay);
}
</script>
<style scoped>
.calendar {
    position: absolute;
    top: 80px;
    left: 100px;
    border: 2px solid #000;
    cursor: pointer;
    transition: transform 0.2s;
}

.calendar:hover {
    transform: scale(1.05);
}

.calendar img {
    width: 150px;
    height: auto;
    cursor: pointer;
}

.openCalendar {
    position: absolute;
    top: 200px;
    left: 300px;
    border: 2px solid #000;
    z-index: 10;
}

.hideCalendar {
    display: none;
}

.calendarImg {
    width: 900px;
    height: auto;
}
</style>
