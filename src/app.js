import { initRoutes } from "./routes/routes.js";
import { navigation } from "./navigaton/navigation.js";

function init() {
    navigation().update();
    initRoutes();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}