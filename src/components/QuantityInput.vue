<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 class="text-xl font-semibold mb-4 text-green-700">Enter Quantity</h2>
      <input
        v-model="tempQuantity"
        type="number"
        min="1"
        class="w-full px-4 py-2 border rounded mb-4"
        placeholder="Enter quantity"
      />
      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="text-gray-600 hover:underline">Cancel</button>
        <button @click="submitQuantity" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tempQuantity = ref(1)

function submitQuantity() {
  // Emit the entered quantity back to the parent
  if (tempQuantity.value && tempQuantity.value > 0) {
    // Optional: Validate or adjust value here
    emit('quantity-selected', tempQuantity.value)
    emit('close')
  }
}
</script>
