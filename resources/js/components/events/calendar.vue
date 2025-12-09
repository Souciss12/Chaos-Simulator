<template>
    <div class="calendar">
        <img @click="openCalendar()" :src="currentCalendarImage" />
    </div>
    <div :class="{ openCalendar: isCalendarOpen, hideCalendar: !isCalendarOpen }">
        <img class="calendarImg" :src="currentCalendarImage" />
    </div>
    <button @click="changeCurrentDay()" class="ms-3">Change</button>
    <div class="smartphone" @click="openSmartphone()">
        <img :src="smartphoneMenuRef?.isMenuOpen ? onSmartphoneImg : offSmartphoneImg" />
    </div>
    <div class="charger">
        <img
            :src="!isChargerActivate ? offChargerImg : onChargerImg"
            :class="{ offCharger: !isChargerActivate, onCharger: isChargerActivate }"
            @click="isChargerActivate = !isChargerActivate"
        />
    </div>
    <div v-if="isChargerActivate">
        <div class="chargerNumber">{{ chaosStore.phoneBattery }}%</div>
    </div>
    <SmartphoneMenu ref="smartphoneMenuRef" :isChargerActivate="isChargerActivate" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useChaosStore } from "../../stores/chaosStore";
import SmartphoneMenu from "./smartphoneMenu.vue";
import offSmartphoneImg from "../../../assets/off-smartphone.png";
import onSmartphoneImg from "../../../assets/on-smartphone.png";
import offChargerImg from "../../../assets/off-charger.png";
import onChargerImg from "../../../assets/on-charger.png";

const chaosStore = useChaosStore();
let isCalendarOpen = ref(false);
const smartphoneMenuRef = ref(null);
let isChargerActivate = ref(false);

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
        smartphoneMenuRef.value?.isMessageSent === false &&
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

    if (smartphoneMenuRef.value) {
        smartphoneMenuRef.value.isMessageSent = false;
    }
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

.onCharger {
    position: absolute;
    top: 140px;
    left: 337px;
    cursor: pointer;
    transition: transform 0.2s;
}

.offCharger {
    position: absolute;
    top: 90px;
    left: 410px;
    cursor: pointer;
    transition: transform 0.2s;
}

.onCharger:hover,
.offCharger:hover {
    transform: scale(1.05);
}

.charger img {
    height: 80px;
    width: auto;
}

.chargerNumber {
    position: absolute;
    top: 100px;
    left: 320px;
    font-size: 24px;
    font-weight: bold;
    color: #e0e0e0;
}
</style>
