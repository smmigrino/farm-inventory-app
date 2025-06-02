<template>
  <div class="inventory-page">
    <div class="app-bar">
      <div class="app-bar-left">
        <div class="avatar-wrapper">
          <img src="@/assets/farmer-avatar.png" alt="Avatar" class="avatar" />
          <span class="farmer-name">{{ farmer.name }}</span>
        </div>
      </div>
      <img src="@/assets/back-arrow.png" alt="Back" class="back-arrow" @click="goBack" />
    </div>

    <h1 class="title">Log to Inventory</h1>

    <h2 class="label">Add Item</h2>
    <div class="textfield" @click="goToItemSelection">
      {{ selectedItem ? selectedItem.name : 'Item Name' }}
    </div>

    <h2 class="label">Quantity</h2>
    <div class="textfield" @click="goToQuantityInput">
      {{ quantity ? quantity + 'kg' : '00kg' }}
    </div>

    <h2 class="label">SRP per KG</h2>
    <div class="srp-display">
      {{ srpPerKg ? `₱${srpPerKg.toFixed(2)}` : '₱00.00' }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';

const route = useRoute();
const router = useRouter();

const farmerId = route.params.id;
const farmer = ref({ name: '' });
const selectedItem = ref(null);
const quantity = ref(null);
const srpPerKg = ref(null);

onMounted(async () => {
  const { data, error } = await supabase.from('farmer').select('name').eq('id', farmerId).single();
  if (data) {
    farmer.value = data;
  }
});

const goBack = () => {
  router.push('/');
};

const goToItemSelection = () => {
  router.push({ name: 'item-selection', query: { from: 'inventory', farmerId } });
};

const goToQuantityInput = () => {
  router.push({ name: 'quantity-input', query: { from: 'inventory', farmerId } });
};
</script>

<style scoped>
.inventory-page {
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  color: #006666;
  text-align: center;
}

.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #006666;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 105px;
  padding: 0 20px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  object-fit: cover;
}

.farmer-name {
  font-size: 32px;
  color: #B2D8D8;
}

.back-arrow {
  width: 50px;
  cursor: pointer;
}

.title {
  font-size: 32px;
  margin: 20px 0 50px;
}

.label {
  font-size: 25px;
  margin: 0 0 20px;
}

.textfield {
  background-color: #006666;
  color: #B2D8D8;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 70px;
  text-align: center;
  cursor: pointer;
}

.srp-display {
  font-size: 20px;
  margin-bottom: 30px;
}
</style>
