import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChaosStore = defineStore('chaos', () => {
    const chaosLevel = ref(25);
    const isGameOver = ref(false);

    const popups = ref([]);
    const nextPopupId = ref(1);

    const chaosNotifications = ref([]);
    let nextNotificationId = 1;

    function spawnPopup() {
        const rnd = Math.random();
        if (rnd < 0.33) {
            popups.value.push({
                id: nextPopupId.value++,
                type: 'virus',
                time: 3000,
                x: Math.random() * 80,
                y: Math.random() * 60,
            });
        } else if (rnd <= 0.66) {
            popups.value.push({
                id: nextPopupId.value++,
                type: 'ads',
                time: 3000,
                x: Math.random() * 70,
                y: Math.random() * 65,
            });
        } else {
            popups.value.push({
                id: nextPopupId.value++,
                type: 'update',
                time: 3000,
                x: Math.random() * 75,
                y: Math.random() * 65,
            });
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

    function restart() {
        chaosLevel.value = 25;
        isGameOver.value = false;

        popups.value = [];
        nextPopupId.value = 1;

        chaosNotifications.value = [];
        nextNotificationId = 1;
    }

    return {
        chaosLevel,
        isGameOver,

        popups,
        chaosNotifications,

        spawnPopup,
        closePopup,

        addChaos,
        reduceChaos,
        checkGameOver,
        restart,
    };
});