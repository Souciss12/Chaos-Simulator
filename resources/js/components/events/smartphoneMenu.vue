<template>
    <div v-if="isMenuOpen" class="smartphone-screen-overlay" @click.self="closeMenu">
        <div class="smartphone-screen">
            <div class="phone-header">
                <div class="status-bar">
                    <span class="time">11:24</span>
                    <div class="status-icons">
                        <span class="signal">📶</span>
                        <span class="battery">🔋</span>
                    </div>
                </div>
                <div class="app-bar">
                    <button @click="closeMenu" class="back-button">←</button>
                    <h2 class="app-title">Contacts</h2>
                    <div class="menu-dots">⋮</div>
                </div>
            </div>
            <div class="contacts-list">
                <div class="contacts-message">Send Happy Birthday to :</div>
                <div
                    v-for="contact in contacts"
                    :key="contact.name"
                    class="contact-item"
                    @click="selectContact(contact)"
                >
                    <div class="contact-avatar">
                        <span>{{ contact.initials }}</span>
                    </div>
                    <div class="contact-info">
                        <div class="contact-name">{{ contact.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();
const isMenuOpen = ref(false);
const isMessageSent = ref(false);

const contacts = computed(() => {
    return chaosStore.calendarEvents
        .filter((event) => event[1] !== "none")
        .map((event) => {
            const name = event[1];
            const day = event[0];
            const isBirthday =
                chaosStore.currentDay ===
                chaosStore.calendarEvents.findIndex((e) => e[1] === name);

            return {
                name: name,
                day: day,
                isBirthday: isBirthday,
                initials: name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase(),
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
});

function openMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
    isMenuOpen.value = false;
}

const selectContact = (contact) => {
    isMenuOpen.value = false;
    if (contact.isBirthday && !isMessageSent.value) {
        isMessageSent.value = true;
        chaosStore.reduceChaos(3, 400, 150);
    } else if (!contact.isBirthday || isMessageSent.value) {
        chaosStore.addChaos(5, 400, 150);
    }
};

defineExpose({
    openMenu,
    isMessageSent,
});
</script>

<style scoped>
.smartphone-screen-overlay {
    position: fixed;
    top: 150px;
    left: 400px;
    display: flex;
    z-index: 1000;
}

.smartphone-screen {
    width: 375px;
    height: 667px;
    background: linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%);
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 8px solid #2c3e50;
}

.phone-header {
    background: linear-gradient(180deg, #4a90e2 0%, #357abd 100%);
    color: white;
    padding-top: 8px;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    font-size: 12px;
    font-weight: 500;
}

.status-icons {
    display: flex;
    gap: 8px;
}

.app-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 15px;
}

.back-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 40px;
    text-align: left;

    &:hover {
        opacity: 0.8;
    }
}

.app-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    text-align: center;
}

.menu-dots {
    font-size: 24px;
    width: 40px;
    text-align: right;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
}

.contacts-message {
    padding: 10px 10px;
    font-size: 20px;
    font-weight: 500;
    color: #232f3b;
    border-bottom: 1px solid #dcdcdc;
}

.contacts-list {
    flex: 1;
    overflow-y: auto;
    background: white;
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f8f8f8;
    }

    &.birthday-today {
        background-color: #fff9e6;

        &:hover {
            background-color: #fff3d4;
        }
    }
}

.contact-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 15px;
    flex-shrink: 0;
}

.contact-info {
    flex: 1;
}

.contact-name {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 4px;
}

.contact-status {
    font-size: 13px;
    color: #7f8c8d;
}

.contact-action {
    font-size: 24px;
}

.message-popup {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1001;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.message-content {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    width: 320px;
    overflow: hidden;
}

.message-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.recipient-name {
    font-weight: 600;
    font-size: 16px;
}

.close-message {
    background: none;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    padding: 0;
    line-height: 1;

    &:hover {
        opacity: 0.8;
    }
}

.message-body {
    padding: 20px;
    background: #f0f0f0;
}

.sent-message {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 16px;
    border-radius: 18px 18px 4px 18px;
    max-width: 85%;
    margin-left: auto;
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.message-status {
    padding: 10px 20px;
    font-size: 12px;
    color: #7f8c8d;
    text-align: right;
}
</style>
