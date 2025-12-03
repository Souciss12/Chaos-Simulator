<template>
    <!-- <div class="overlay" id="popup"> -->
    <div class="popup-ad" :style="{ left: popup.x + '%', top: popup.y + '%' }">
        <span class="close-btn rounded p-2" @click="closeAds($event)">X</span>

        <img :src="`https://picsum.photos/800/400?random=${popup.id}`" alt="ads" />

        <div class="popup-content">
            <h2>Offre spéciale !</h2>
            <p>
                Profite de -50% sur une sélection d’articles. Offre valable jusqu’à ce
                soir uniquement.
            </p>

            <button @click="openAds($event)" class="cta-btn">
                Voir l'offre maintenant
            </button>
        </div>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { useChaosStore } from "../../stores/chaosStore";

const chaosStore = useChaosStore();

const props = defineProps(["popup"]);

function openAds(event) {
    chaosStore.addChaos(4, event.clientX, event.clientY);
    chaosStore.closePopup(props.popup.id);
}

function closeAds(event) {
    chaosStore.reduceChaos(2, event.clientX, event.clientY);
    chaosStore.closePopup(props.popup.id, event.clientX, event.clientY);
}
</script>

<style scoped>
.popup-ad {
    width: 420px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: fadeIn 0.3s ease-out;
    position: fixed;
    z-index: 1000;
}

.close-btn {
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 22px;
    cursor: pointer;
    color: #e6e6e6;
    background: #33333369;
}

.popup-ad img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.popup-content {
    padding: 20px;
    text-align: center;
}

.popup-content h2 {
    margin: 0;
    font-size: 22px;
}

.popup-content p {
    margin: 10px 0 20px 0;
    color: #555;
    font-size: 15px;
}

.cta-btn {
    background: #ff6600;
    padding: 12px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 80%;
}

.cta-btn:hover {
    background: #e05500;
}
</style>
