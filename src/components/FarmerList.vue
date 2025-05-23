<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-green-700">Choose Your Profile</h1>

    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="farmer in farmers"
        :key="farmer.id"
        @click="$emit('select-farmer', farmer.id)"
        class="cursor-pointer bg-white shadow-md rounded-xl p-5 border hover:bg-green-50 transition"
      >
        <div class="flex items-center space-x-4">
          <div class="text-green-600 text-3xl">
            🧑‍🌾
          </div>
          <div>
            <p class="text-lg font-semibold">{{ farmer.name }}</p>
            <p class="text-sm text-gray-500">Tap to manage inventory</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  farmers: {
    type: Array,
    required: true,
  }
})
</script>

<style scoped>
.card:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>
