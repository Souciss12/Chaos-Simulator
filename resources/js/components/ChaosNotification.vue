<template>
    <div
        class="chaos-notification"
        :class="{ positive: notification.amount < 0, negative: notification.amount > 0 }"
        :style="{ left: notification.x - 25 + 'px', top: notification.y - 40 + 'px' }"
    >
        {{ notification.amount > 0 ? "+" : "" }}{{ notification.amount }}
    </div>
</template>

<script setup>
defineProps({
    notification: Object,
});
</script>

<style scoped>
.chaos-notification {
    position: fixed;
    font-size: 34px;
    font-weight: bold;
    pointer-events: none;
    z-index: 10000;
    animation: float-up 2s ease-out forwards;
}

.positive {
    color: #00ff00;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
}

.negative {
    color: #ff0000;
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

@keyframes float-up {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px);
    }
}
</style>
