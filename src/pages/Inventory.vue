<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
    <!-- Title -->
    <h1 class="text-2xl sm:text-3xl font-bold text-green-700 mb-4">Items</h1>

    <!-- Item Selection Button -->
    <div
      class="w-full max-w-sm text-center py-3 px-4 bg-white rounded-lg border cursor-pointer shadow-sm mb-6"
      @click="showItemSelection = true"
    >
      {{ selectedItem?.name || 'Select an item' }}
    </div>

    <!-- Quantity Title -->
    <h2 class="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Quantity</h2>

    <!-- Quantity Selection Button -->
    <div
      class="w-full max-w-sm text-center py-3 px-4 bg-white rounded-lg border cursor-pointer shadow-sm mb-6"
      @click="showQuantityInput = true"
    >
      {{ quantity || 'Enter quantity' }}
    </div>

    <!-- SRP per KG -->
    <div v-if="selectedItem?.srp_per_kg" class="text-base text-gray-700 mb-8">
      SRP per kg: ₱{{ selectedItem.srp_per_kg }}
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
      <button
        class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        @click="confirmSubmit"
      >
        Submit
      </button>
      <button
        class="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        @click="addMoreItems"
      >
        Add More
      </button>
    </div>

    <!-- Modals -->
    <ItemSelection
      v-if="showItemSelection"
      @item-selected="handleItemSelected"
      @close="showItemSelection = false"
    />
    <QuantityInput
      v-if="showQuantityInput"
      @quantity-selected="handleQuantitySelected"
      @close="showQuantityInput = false"
    />
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
  alert('Submit clicked (ConfirmDialog goes here)')
}

function addMoreItems() {
  alert('Add more clicked (will store item + qty)')
}
</script>
