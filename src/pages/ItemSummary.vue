<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Item Summary</h1>

    <div v-if="items.length > 0">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Item Name</th>
            <th class="p-2 border">Quantity (kg)</th>
            <th class="p-2 border">SRP / kg</th>
            <th class="p-2 border">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50">
            <td class="p-2 border">{{ item.item_name }}</td>
            <td class="p-2 border">{{ item.qty_kg }}</td>
            <td class="p-2 border">₱{{ formatCurrency(item.srp_per_kg) }}</td>
            <td class="p-2 border font-semibold">₱{{ formatCurrency(item.total_cost) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4 text-right text-lg font-bold">
        Grand Total: ₱{{ formatCurrency(grandTotal) }}
      </div>
    </div>
    <div v-else>
      <p>No items to show. 😕</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const items = ref([]);

onMounted(() => {
  const stored = localStorage.getItem('batchItems');
  if (stored) {
    try {
      items.value = JSON.parse(stored);
    } catch {
      items.value = [];
    }
  }
});

const formatCurrency = (value) => {
  return Number(value).toFixed(2);
};

const grandTotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.total_cost, 0)
);
</script>

<style scoped>
table {
  border: 1px solid #ccc;
}
</style>
