<template>
    <div class="update-popup" :style="{ left: popup.x + '%', top: popup.y + '%' }">
        <div class="title-bar">
            Windows Update
            <span class="close" @click="closeUpdate($event)">x</span>
        </div>

        <div class="content">
            <h2>Des mises à jour sont disponibles</h2>
            <p class="text">
                Votre système a trouvé de nouvelles mises à jour importantes pour
                améliorer la sécurité et les performances de votre ordinateur.
            </p>

            <div class="text">Téléchargement des mises à jour… (55%)</div>

            <div class="progress">
                <div></div>
            </div>

            <div class="btns">
                <button class="btn" @click="closeUpdate($event)">Plus tard</button>
                <button class="btn primary" @click="openUpdate($event)">
                    Installer maintenant
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useChaosStore } from "../../../stores/chaosStore";

const chaosStore = useChaosStore();

const props = defineProps(["popup"]);

function openUpdate(event) {
    chaosStore.addChaos(5, event.clientX, event.clientY);
    chaosStore.closePopup(props.popup.id);
}

function closeUpdate(event) {
    chaosStore.reduceChaos(1, event.clientX, event.clientY);
    chaosStore.closePopup(props.popup.id, event.clientX, event.clientY);
}
</script>

<style scoped>
.update-popup {
    width: 420px;
    position: fixed;
    border: 1px solid #bfc7d1;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.18);
    margin: 60px auto;
    z-index: 1000;
}

.title-bar {
    background: #f2f2f2;
    padding: 10px 12px;
    font-weight: bold;
    border-bottom: 1px solid #d4d4d4;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.close {
    cursor: pointer;
    font-size: 18px;
    padding: 0 5px;
    color: #555;
}

.content {
    padding: 20px;
}

h2 {
    margin: 0 0 8px;
    font-size: 20px;
    color: #1b1b1b;
}

.text {
    color: #444;
    font-size: 14px;
    line-height: 1.45;
    margin-bottom: 18px;
}

.progress {
    width: 100%;
    background: #dcdcdc;
    border-radius: 3px;
    overflow: hidden;
    height: 10px;
    margin-bottom: 20px;
}

.progress div {
    width: 55%;
    height: 100%;
    background: #2a88f7;
}

.btns {
    text-align: right;
}

.btn {
    padding: 8px 14px;
    border: 1px solid #b0b0b0;
    background: #f3f3f3;
    cursor: pointer;
    margin-left: 8px;
    font-size: 14px;
}

.primary {
    background: #2a88f7;
    color: white;
    border: none;
}

.btn:hover {
    background: #e9e9e9;
}

.primary:hover {
    background: #1f71d1;
}
</style>
