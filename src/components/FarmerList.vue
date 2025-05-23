<template>
  <div class="farmer-list">
    <h2>Select Your Profile</h2>
    <div class="farmers">
      <button
        v-for="farmer in farmers"
        :key="farmer.id"
        @click="$emit('select-farmer', farmer.id)"
        class="farmer-card"
      >
        👨‍🌾 {{ farmer.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['farmers'])
defineEmits(['select-farmer'])
</script>

<style scoped>
.farmer-list {
  text-align: center;
}
.farmer-card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: #f0f8ff;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
