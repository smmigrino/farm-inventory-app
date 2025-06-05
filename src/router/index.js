import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Inventory from '../pages/Inventory.vue';
import ItemSelection from '../pages/ItemSelection.vue';
import QuantityInputPage from '../pages/QuantityInput.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/inventory/:farmerId', name: 'Inventory', component: Inventory, props: true },
  { path: '/inventory/:farmerId/select-item', name: 'ItemSelection', component: ItemSelection, props: true },
  { path: '/inventory/:farmerId/select-item/quantity', name: 'QuantityInput', component: QuantityInput, props: true },
]; //updated

const router = createRouter({
  history: createWebHistory(),
  routes
}); //updated

export default router; //added
