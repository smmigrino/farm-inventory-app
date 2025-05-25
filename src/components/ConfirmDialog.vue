<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 class="text-lg font-semibold text-green-700 mb-4">Confirm Submission</h2>
      <p class="mb-6 text-gray-700">Are you sure you want to submit this item and quantity?</p>
      <div class="flex justify-end gap-3">
        <button @click="$emit('close')" class="text-gray-600 hover:underline">Cancel</button>
        <button @click="$emit('confirm')" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Placeholder component logic goes here if needed
</script>
