<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-xl font-semibold mb-4 text-green-700">Select an Item</h2>
      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="cursor-pointer px-4 py-2 hover:bg-green-100 rounded"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="text-gray-600 hover:underline">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Rice', srp_per_kg: 40 },
  { id: 2, name: 'Corn', srp_per_kg: 35 },
  { id: 3, name: 'Wheat', srp_per_kg: 50 },
])

function selectItem(item) {
  // Emit the selected item to the parent component
  emit('item-selected', item)
  emit('close')
}
</script>
