import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Game from './pages/game.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(Game);
app.use(createPinia());
app.mount("#app");
