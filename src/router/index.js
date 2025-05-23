import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Inventory from '../pages/Inventory.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/inventory/:farmerId', component: Inventory },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
