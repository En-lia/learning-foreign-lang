import { createApp } from 'vue';
import components from '@/components/UI';
import App from './App.vue';
import router from './router';

const app = createApp(App);

components.forEach((component:any) => app.component(component.name, component));

app.use(router).mount('#app');
