<template>
  <div class="flex flex-col items-center p-6">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-green-700 mb-4">Items</h1>

    <!-- Item Selection Button -->
    <div
      class="w-64 text-center py-3 px-4 bg-white rounded-lg border cursor-pointer mb-8"
      @click="showItemSelection = true"
    >
      {{ selectedItem?.name || 'Select an item' }}
    </div>

    <!-- Quantity Title -->
    <h2 class="text-2xl font-semibold text-green-700 mb-4">Quantity</h2>

    <!-- Quantity Selection Button -->
    <div
      class="w-64 text-center py-3 px-4 bg-white rounded-lg border cursor-pointer mb-8"
      @click="showQuantityInput = true"
    >
      {{ quantity || 'Enter quantity' }}
    </div>

    <!-- SRP per KG -->
    <div v-if="selectedItem?.srp_per_kg" class="text-lg text-gray-700 mb-10">
      SRP per kg: ₱{{ selectedItem.srp_per_kg }}
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-5">
      <button
        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        @click="confirmSubmit"
      >
        Submit
      </button>

      <button
        class="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
        @click="addMoreItems"
      >
        Add More
      </button>
    </div>

    <!-- Modals -->
    <ItemSelection v-if="showItemSelection" @item-selected="handleItemSelected" @close="showItemSelection = false" />
    <QuantityInput v-if="showQuantityInput" @quantity-selected="handleQuantitySelected" @close="showQuantityInput = false" />
    <!-- ConfirmDialog to be added later -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ItemSelection from '../components/ItemSelection.vue'
import QuantityInput from '../components/QuantityInput.vue'
// import ConfirmDialog from '../components/ConfirmDialog.vue'

const showItemSelection = ref(false)
const showQuantityInput = ref(false)

const selectedItem = ref(null)
const quantity = ref(null)

function handleItemSelected(item) {
  selectedItem.value = item
  showItemSelection.value = false
}

function handleQuantitySelected(qty) {
  quantity.value = qty
  showQuantityInput.value = false
}

function confirmSubmit() {
  // Open confirm dialog (to be built)
  alert('Submit clicked (ConfirmDialog goes here)')
}

function addMoreItems() {
  // Logic to accumulate and reset inputs
  alert('Add more clicked (will store item + qty)')
}
</script>
