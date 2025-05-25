<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <slot />
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="text-gray-600 hover:underline">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// No extra logic, just a wrapper for reusable modals
</script>
