import { defineStore } from 'pinia';
import { ref } from 'vue';
import { seedRandom } from '../utils/seedRandom';

export const useChaosStore = defineStore('chaos', () => {
    const chaosLevel = ref(null);
    const isGameOver = ref(false);
    const isGameWin = ref(false);

    const popups = ref([]);
    const nextPopupId = ref(1);

    const calendarEvents = ref(null);
    const currentDay = ref(null);
    const phoneBattery = ref(null);

    const chaosNotifications = ref([]);
    let nextNotificationId = 1;

    function spawnPopup() {
        if (popups.value.length < 3) {
            const rnd = seedRandom.random();
            if (rnd < 0.33) {
                popups.value.push({
                    id: nextPopupId.value++,
                    type: 'virus',
                    time: 3000,
                    x: seedRandom.randomFloat(0, 80),
                    y: seedRandom.randomFloat(0, 60),
                });
            } else if (rnd <= 0.66) {
                popups.value.push({
                    id: nextPopupId.value++,
                    type: 'ads',
                    time: 3000,
                    x: seedRandom.randomFloat(0, 70),
                    y: seedRandom.randomFloat(0, 65),
                });
            } else {
                popups.value.push({
                    id: nextPopupId.value++,
                    type: 'update',
                    time: 3000,
                    x: seedRandom.randomFloat(0, 75),
                    y: seedRandom.randomFloat(0, 65),
                });
            }
        }
    }

    function closePopup(id) {
        popups.value = popups.value.filter(popup => popup.id !== id);
    }

    function addChaos(amount, mouseX, mouseY) {
        if (chaosLevel.value < 100) {
            chaosLevel.value += amount;
        }
        if (chaosLevel.value > 100) {
            chaosLevel.value = 100;
        }
        checkGameOver();

        if (mouseX !== undefined && mouseY !== undefined) {
            addChaosNotification(amount, mouseX, mouseY);
        }
    }

    function reduceChaos(amount, mouseX, mouseY) {
        if (chaosLevel.value > 0) {
            chaosLevel.value -= amount;
        }

        if (mouseX !== undefined && mouseY !== undefined) {
            addChaosNotification(-amount, mouseX, mouseY);
        }
        checkWin();
    }

    function addChaosNotification(amount, x, y) {
        const notification = {
            id: nextNotificationId++,
            amount: amount,
            x: x,
            y: y
        };

        chaosNotifications.value.push(notification);

        setTimeout(() => {
            chaosNotifications.value = chaosNotifications.value.filter(n => n.id !== notification.id);
        }, 1000);
    }

    function checkGameOver() {
        if (chaosLevel.value >= 100) {
            isGameOver.value = true;
        }
    }

    function checkWin() {
        if (chaosLevel.value <= 0) {
            isGameWin.value = true;
        }
    }

    function restart() {
        chaosLevel.value = 25;
        isGameOver.value = false;
        isGameWin.value = false;

        popups.value = [];
        nextPopupId.value = 1;

        chaosNotifications.value = [];
        nextNotificationId = 1;
    }

    return {
        chaosLevel,
        isGameOver,
        isGameWin,

        popups,
        chaosNotifications,

        calendarEvents,
        currentDay,
        phoneBattery,

        spawnPopup,
        closePopup,

        addChaos,
        reduceChaos,
        checkGameOver,
        restart,
    };
});