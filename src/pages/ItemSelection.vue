<template>
  <div class="item-selection-container">
    <h2 class="title">Select an Item</h2>
    <div class="divider"></div>
    <div class="item-list">
      <div
        v-for="item in items"
        :key="item.id"
        class="item"
        @click="selectItem(item)"
      >
        <div class="divider"></div>
        <div class="item-name">{{ item.name }}</div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabase';

const router = useRouter();
const items = ref([]);

onMounted(async () => {
  const { data, error } = await supabase.from('item').select('id, name');
  if (data) {
    items.value = data;
  }
});

const selectItem = (item) => {
  // Navigate back to Inventory page passing selected item as route state or query param
  router.push({ 
    name: 'Inventory', 
    query: { selectedItem: JSON.stringify(item) } 
  });
};
</script>

<style scoped>
.item-selection-container {
  padding: 0;
  font-family: Roboto, sans-serif;
}

.title {
  text-align: center;
  font-size: 15px;
  color: #006666;
  margin: 60px 0;
}

/* Divider between title/items */
.divider {
  height: 3px;
  background-color: #d9d9d9;
  margin: 0 20px;
  border-radius: 5px;
}

/* Each item block */
.item {
  cursor: pointer;
}

/* Item name styling */
.item-name {
  text-align: center;
  color: #006666;
  font-size: 40px;
  margin: 25px 30px;
  word-wrap: break-word;
}
</style>
