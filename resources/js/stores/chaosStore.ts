import { defineStore } from 'pinia';
import { ref } from 'vue';
import { popupsRandom } from '../utils/seedRandom';
import { Popup } from '../types/poup';
import { CalendarEvent } from '../types/calendarEvent';
import { ChaosNotification } from '../types/chaosNotification';
import { PopupType } from '../types/popupType';

export const useChaosStore = defineStore('chaos', () => {
    const chaosLevel = ref<number | null>(null);
    const isGameOver = ref<boolean>(false);
    const isGameWin = ref<boolean>(false);

    const popups = ref<Popup[]>([]);
    const nextPopupId = ref<number>(1);

    const calendarEvents = ref<CalendarEvent[]>([]);
    const currentDay = ref<number | null>(null);
    const phoneBattery = ref<number | null>(null);

    const chaosNotifications = ref<ChaosNotification[]>([]);
    let nextNotificationId: number = 1;

    function spawnPopup(): void {
        if (popups.value.length < 3) {
            const rnd: number = popupsRandom.random();
            let type: PopupType = 'virus';
            let x: number = 80;
            let y: number = 60;

            if (rnd <= 0.33) {
                type = 'virus';
                x = 80; y = 60;
            } else if (rnd <= 0.66) {
                type = 'ads';
                x = 70; y = 65;
            } else {
                type = 'update';
                x = 75; y = 65;
            }

            popups.value.push({
                id: nextPopupId.value++,
                type: type,
                time: 3000,
                x: popupsRandom.randomFloat(0, x),
                y: popupsRandom.randomFloat(0, y),
            });
        }
    }

    function closePopup(id: number): void {
        popups.value = popups.value.filter(popup => popup.id !== id);
    }

    function addChaos(amount: number, mouseX?: number, mouseY?: number): void {
        if (chaosLevel.value == null) return;

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

    function reduceChaos(amount: number, mouseX?: number, mouseY?: number): void {
        if (chaosLevel.value == null) return;

        if (chaosLevel.value > 0) {
            chaosLevel.value -= amount;
        }

        if (mouseX !== undefined && mouseY !== undefined) {
            addChaosNotification(-amount, mouseX, mouseY);
        }
        checkWin();
    }

    function addChaosNotification(amount: number, x: number, y: number): void {
        const notification: ChaosNotification = {
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

    function checkGameOver(): void {
        if (chaosLevel.value == null) return;
        if (chaosLevel.value >= 100) {
            isGameOver.value = true;
        }
    }

    function checkWin(): void {
        if (chaosLevel.value == null) return;
        if (chaosLevel.value <= 0) {
            isGameWin.value = true;
        }
    }

    function restart(): void {
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