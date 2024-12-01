import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Adjust the path if necessary
import './index.css'


const app = createApp(App);
app.use(router);
app.mount('#app');
