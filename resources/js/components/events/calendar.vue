<template>
    <div class="calendar">
        <img @click="openCalendar()" :src="currentCalendarImage" />
    </div>
    <div :class="{ openCalendar: isCalendarOpen, hideCalendar: !isCalendarOpen }">
        <img class="calendarImg" :src="currentCalendarImage" />
    </div>
    <button @click="changeCurrentDay()" class="ms-3">Change</button>
    <div class="smartphone" @click="openSmartphone()">
        <img :src="smartphoneImg" />
    </div>
    <SmartphoneMenu ref="smartphoneMenuRef" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import SmartphoneMenu from "./smartphoneMenu.vue";
import smartphoneImg from "../../../assets/smartphone.png";

const chaosStore = useChaosStore();
let isCalendarOpen = ref(false);
const smartphoneMenuRef = ref(null);

const currentCalendarImage = computed(() => {
    return new URL(
        `../../../assets/calendar/${
            chaosStore.calendarEvents[chaosStore.currentDay][0]
        }-calendar.jpg`,
        import.meta.url
    ).href;
});

setInterval(() => {
    if (
        smartphoneMenuRef.value.isMessageSent === false &&
        [1, 3, 6, 7, 8, 11].includes(chaosStore.currentDay)
    ) {
        chaosStore.addChaos(5, 200, 150);
    }
    changeCurrentDay();
}, 61000); // 61 secondes

function openCalendar() {
    isCalendarOpen.value = !isCalendarOpen.value;
}

function openSmartphone() {
    if (smartphoneMenuRef.value) {
        smartphoneMenuRef.value.openMenu();
    }
}

function changeCurrentDay() {
    if (chaosStore.currentDay < chaosStore.calendarEvents.length - 1)
        chaosStore.currentDay += 1;
    else chaosStore.currentDay = 0;

    smartphoneMenuRef.value.isMessageSent = false;
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
}

.hideCalendar {
    display: none;
}

.calendarImg {
    width: 900px;
    height: auto;
}

.smartphone {
    position: absolute;
    top: 50px;
    left: 300px;
    cursor: pointer;
    transition: transform 0.2s;
}

.smartphone:hover {
    transform: scale(1.05);
}

.smartphone img {
    width: 80px;
    height: auto;
}
</style>
