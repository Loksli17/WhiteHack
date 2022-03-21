import { createApp }   from 'vue';
import { createPinia } from 'pinia';
import VueToast        from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';

import App             from './App.vue';
import router          from './router';

// declare module '@vue/runtime-core'{
//     interface ComponentCustomProperties{
//         $Toast: typeof VueToast;
//     }
// }

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueToast, { position: "bottom-right", duration: 6000 });

app.mount('#app');

app.provide("Toast", app.config.globalProperties.$toast)
