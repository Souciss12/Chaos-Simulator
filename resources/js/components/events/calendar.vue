<template>
    <div class="calendar">
        <img @click="openCalendar()" :src="currentCalendarImage" />
    </div>
    <div :class="{ openCalendar: isCalendarOpen, hideCalendar: !isCalendarOpen }">
        <img class="calendarImg" :src="currentCalendarImage" />
    </div>
    <!-- <button @click="changeCurrentDay()" class="ms-3">Change</button> -->
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import { eventBus } from "../../eventBus";
import { calendarRandom } from "../../utils/seedRandom";
import { CalendarEvent } from "../../types/calendarEvent";

const chaosStore = useChaosStore();
let isCalendarOpen = ref<boolean>(false);
const isMessageSent = ref<boolean>(false);

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
].map(([day, name]) => ({
    day,
    name,
    isBirthday: false,
}));
chaosStore.currentDay = calendarRandom.randomInt(0, 10);

const currentCalendarImage = computed((): string => {
    const dayIndex: number | null = chaosStore.currentDay;

    if (dayIndex === null || dayIndex === undefined) {
        return "";
    }

    const event: CalendarEvent = chaosStore.calendarEvents[dayIndex];
    return new URL(`../../../assets/calendar/${event.day}-calendar.jpg`, import.meta.url)
        .href;
});

eventBus.on("message-sent-success", (): void => {
    isMessageSent.value = true;
});

setInterval((): void => {
    if (chaosStore.currentDay == null) return;
    if (!isMessageSent.value && [1, 3, 6, 7, 8, 11].includes(chaosStore.currentDay)) {
        chaosStore.addChaos(5, 200, 150);
    }
    changeCurrentDay();
}, calendarRandom.randomInt(30000, 60000));

function openCalendar(): void {
    isCalendarOpen.value = !isCalendarOpen.value;
}

function changeCurrentDay(): void {
    if (chaosStore.currentDay == null) return;
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
