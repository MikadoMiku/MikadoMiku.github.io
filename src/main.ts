import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "popper.js";
import "jquery";
import "@fortawesome/fontawesome-free";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");

// createApp(App).use(store).use(router).use(BootstrapVue3).mount('#app')
