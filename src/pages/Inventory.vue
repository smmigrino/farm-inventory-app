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
    <div class="input-box" @click="openItemSelection">
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

    <!-- Modals -->
    <ItemSelection v-if="showItemSelection" @select="handleItemSelect" @close="closeItemSelection" />
    <QuantityInput v-if="showQuantityInput" @input="handleQuantityInput" @close="closeQuantityInput" />
    <ValidationDialog v-if="showValidationDialog" @close="closeValidationDialog" />
    <ConfirmDialog v-if="showConfirmDialog" :items="batchItems" @confirm="confirmSubmission" @close="closeConfirmDialog" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '@/lib/supabase';
import ItemSelection from '@/components/ItemSelection.vue';
import QuantityInput from '@/components/QuantityInput.vue';
import ValidationDialog from '@/components/ValidationDialog.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const router = useRouter();
const route = useRoute();
const farmerId = route.params.farmerId;
const farmerName = ref(''); // Fetch from Supabase based on farmerId

// State variables
const selectedItem = ref(null);
const quantity = ref(null);
const srpPerKg = ref(null);
const batchItems = ref([]);
const showItemSelection = ref(false);
const showQuantityInput = ref(false);
const showValidationDialog = ref(false);
const showConfirmDialog = ref(false);

// Fetch farmer name on component mount
const fetchFarmerName = async () => {
  const { data, error } = await supabase
    .from('farmer')
    .select('name')
    .eq('id', farmerId)
    .single();
  if (data) {
    farmerName.value = data.name;
  }
};
fetchFarmerName();

// Navigation
const goBack = () => {
  router.push('/');
};

// Open modals
const openItemSelection = () => {
  showItemSelection.value = true;
};
const openQuantityInput = () => {
  showQuantityInput.value = true;
};

// Close modals
const closeItemSelection = () => {
  showItemSelection.value = false;
};
const closeQuantityInput = () => {
  showQuantityInput.value = false;
};
const closeValidationDialog = () => {
  showValidationDialog.value = false;
};
const closeConfirmDialog = () => {
  showConfirmDialog.value = false;
};

// Handle selections
const handleItemSelect = async (item) => {
  selectedItem.value = item;
  showItemSelection.value = false;

  // Fetch SRP per KG
  const { data, error } = await supabase
    .from('item')
    .select('srp_per_kg')
    .eq('id', item.id)
    .single();
  if (data) {
    srpPerKg.value = data.srp_per_kg;
  }
};

const handleQuantityInput = (qty) => {
  quantity.value = qty;
  showQuantityInput.value = false;
};

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value);
};

// Handle Add More
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

  // Reset selections
  selectedItem.value = null;
  quantity.value = null;
  srpPerKg.value = null;
};

// Handle Submit
const handleSubmit = () => {
  if (!selectedItem.value || !quantity.value) {
    showValidationDialog.value = true;
    return;
  }

  handleAddMore();
  showConfirmDialog.value = true;
};

// Confirm Submission
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

  // Navigate to ItemSummary.vue
  router.push({ name: 'ItemSummary', params: { farmerId } });
};
</script>

<style scoped>
.inventory-container {
  padding: 20px;
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
  margin: 0 0 70px 0;
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
  height: 50px;
  width: 90px;
  background-color: #008080;
  border-radius: 25px;
  color: #b2d8d8;
  font-weight: 600;
  font-size: 35px;
  border: none;
  cursor: pointer;
}
</style>
