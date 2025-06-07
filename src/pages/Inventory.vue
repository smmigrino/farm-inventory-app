<!-- src/pages/Inventory.vue -->
<template>
  <div class="inventory-container">
    <!-- App Bar -->
    <div class="app-bar">
      <div class="app-bar-left">
        <img src="@/assets/farmer-avatar.png" class="avatar" alt="Farmer Avatar" />
        <span class="farmer-name">{{ farmerName }}</span>
      </div>
      <img src="@/assets/back-arrow.png" class="back-icon" alt="Back" @click="goBack" />
    </div>

    <!-- Header -->
    <h1 class="header">Log to Inventory</h1>

    <!-- Add Item Section -->
    <h2 class="section-title">Add Item</h2>
    <div class="input-box" @click="goToItemSelection">
      <span class="input-text">{{ selectedItem?.name || 'Item Name' }}</span>
    </div>

    <!-- Quantity Section -->
    <h2 class="section-title">Quantity</h2>
    <div class="input-box" @click="openQuantityInput">
      <span class="input-text">{{ quantity ? quantity + 'kg' : '00kg' }}</span>
    </div>

    <!-- SRP per KG -->
    <h2 class="section-title">SRP per KG</h2>
    <div class="srp-text">
      {{ srpPerKg !== null ? formatCurrency(srpPerKg) : '₱00.00' }}
    </div>

    <!-- Action Buttons -->
    <div class="button-row">
      <button class="action-button" @click="handleSubmit">Submit</button>
      <button class="action-button" @click="handleAddMore">Add More</button>
    </div>

    <!-- Modals except ItemSelection -->
    <ValidationDialog v-if="showValidationDialog" @close="closeValidationDialog" />
    <ConfirmDialog v-if="showConfirmDialog" :items="batchItems" @confirm="confirmSubmission" @close="closeConfirmDialog" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '@/lib/supabase';
import ValidationDialog from '@/components/ValidationDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const router = useRouter();
const route = useRoute();
const farmerId = route.params.farmerId;
const farmerName = ref(''); // fetched from Supabase

// State variables
const selectedItem = ref(null);
const quantity = ref(null);
const srpPerKg = ref(null);
const batchItems = ref([]);
const showQuantityInput = ref(false);
const showValidationDialog = ref(false);
const showConfirmDialog = ref(false);

// Fetch farmer name
const fetchFarmerName = async () => {
  const { data } = await supabase.from('farmer').select('name').eq('id', farmerId).single();
  if (data) farmerName.value = data.name;
};
fetchFarmerName();

// Receive selected item from route query (when navigated back from ItemSelection)
onMounted(() => {
  if (route.query.selectedItem) {
    try {
      const item = JSON.parse(route.query.selectedItem);
      selectedItem.value = item;
      fetchSRP(item.id);
      // Clear the query param so it won't reapply on reload
      router.replace({ query: { ...route.query, selectedItem: undefined } });
    } catch {}
  }
  if (route.query.quantity) {
    quantity.value = parseFloat(route.query.quantity);
    router.replace({ query: { ...route.query, quantity: undefined } });
  }

});

const fetchSRP = async (itemId) => {
  const { data } = await supabase.from('item').select('srp_per_kg').eq('id', itemId).single();
  if (data) srpPerKg.value = data.srp_per_kg;
};

const goBack = () => {
  router.push('/');
};

const goToItemSelection = () => {
  // Navigate to ItemSelection page with farmerId so it knows context
  router.push({ name: 'ItemSelection', params: { farmerId } });
};

// Navigate to ItemSelection page with farmerId so it knows context
const openQuantityInput = () => {
  router.push({
    name: 'QuantityInput',
    params: { farmerId },
    query: { currentQty: quantity.value || 0 }
  });
};

const closeQuantityInput = () => {
  showQuantityInput.value = false;
};


const formatCurrency = (value) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);

const handleAddMore = () => {
  if (!selectedItem.value || !quantity.value) {
    showValidationDialog.value = true;
    return;
  }

  const totalCost = srpPerKg.value * quantity.value;
  const date = new Date().toISOString();

  batchItems.value.push({
    farmer_id: farmerId,
    item_id: selectedItem.value.id,
    item_name: selectedItem.value.name,
    qty_kg: quantity.value,
    srp_per_kg: srpPerKg.value,
    total_cost: totalCost,
    date,
  });

  selectedItem.value = null;
  quantity.value = null;
  srpPerKg.value = null;
};

const handleSubmit = () => {
  if (!selectedItem.value || !quantity.value) {
    showValidationDialog.value = true;
    return;
  }
  handleAddMore();
  showConfirmDialog.value = true;
};

const closeValidationDialog = () => {
  showValidationDialog.value = false;
};
const closeConfirmDialog = () => {
  showConfirmDialog.value = false;
};

const confirmSubmission = async () => {
  for (const item of batchItems.value) {
    await supabase.from('batch').insert({
      farmer_id: item.farmer_id,
      item_id: item.item_id,
      qty_kg: item.qty_kg,
      srp_per_kg: item.srp_per_kg,
      total_cost: item.total_cost,
      date: item.date,
    });
  }
  router.push({ name: 'ItemSummary', params: { farmerId } });
};
</script>


<style scoped>
.inventory-container {
  padding: 20px 0;
  font-family: Roboto, sans-serif;
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

.app-bar-left {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  margin-right: 10px;
}

.farmer-name {
  color: #b2d8d8;
  font-size: 32px;
}

.back-icon {
  width: 50px;
  cursor: pointer;
}

.header {
  text-align: center;
  color: #006666;
  font-size: 32px;
  margin: 20px 0 50px 0;
}

.section-title {
  text-align: center;
  color: #006666;
  font-size: 25px;
  margin: 0 0 20px 0;
}

.input-box {
  background-color: #006666;
  border-radius: 20px;
  margin: 0 20px 70px 20px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.input-text {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 20px;
  color: #b2d8d8;
}

.srp-text {
  text-align: center;
  font-size: 20px;
  color: #006666;
  margin-bottom: 50px;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 50px 0;
}

.action-button {
  height: 90px;
  width: 150px;
  background-color: #008080;
  border-radius: 50px;
  color: #b2d8d8;
  font-weight: 600;
  font-size: 20px; /* Adjusted font size */
  border: none;
  cursor: pointer;
  text-align: center;
  line-height: 1.2;
}

@media (max-width: 600px) {
  .action-button {
    height: 70px;
    width: 120px;
    font-size: 18px;
  }
}

@media (min-width: 1200px) {
  .action-button {
    height: 100px;
    width: 160px;
    font-size: 22px;
  }
}
</style>