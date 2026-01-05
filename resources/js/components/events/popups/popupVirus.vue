<template>
    <div class="popup" :style="{ left: popup.x + '%', top: popup.y + '%' }">
        <h1>WARNING!</h1>
        <div class="subtitle">5 viruses detected!!</div>

        <div class="content">
            Our latest scan has detected 5 viruses and tracking cookies that may steal
            your personal info. You need to remove the threats now to avoid:
            <ul>
                <li>System crashing</li>
                <li>Files deleted</li>
                <li>Personal info stealing</li>
                <li>Loss of Wi-Fi</li>
                <li>Infecting your other devices</li>
            </ul>
        </div>

        <div class="buttons">
            <button @click="openPopup($event)" class="safe">Remove viruses now</button>
            <button @click="closePopup($event)" class="danger">
                I don't want to be safe
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["popup"]);
const emit = defineEmits(["close-popup", "open-popup"]);

function openPopup(event) {
    emit("open-popup", props.popup.id, event.clientX, event.clientY);
}

function closePopup(event) {
    emit("close-popup", props.popup.id, event.clientX, event.clientY);
}
</script>

<style scoped>
.popup {
    width: 480px;
    position: fixed;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: white;
    padding: 20px 30px;
    z-index: 1000;
}

.popup h1 {
    color: red;
    font-size: 38px;
    margin: 0;
    text-align: center;
    font-weight: 900;
}

.subtitle {
    color: red;
    font-size: 26px;
    text-align: center;
    margin-top: 5px;
    font-weight: bold;
}

.content {
    margin-top: 15px;
    font-size: 15px;
    line-height: 1.4;
}

ul {
    margin-top: 10px;
    list-style: none;
    padding-left: 0;
}

ul li {
    margin: 6px 0;
    font-size: 16px;
}

ul li::before {
    content: "✘ ";
    color: red;
    font-weight: bold;
}

.buttons {
    margin-top: 25px;
    text-align: center;
}

button {
    padding: 10px 20px;
    font-size: 14px;
    margin: 0 10px;
    border: 1px solid #aaa;
    cursor: pointer;
}

.danger {
    background: #e6e6e6;
}

.safe {
    background: #4285f4;
    color: white;
    border: none;
}
</style>
