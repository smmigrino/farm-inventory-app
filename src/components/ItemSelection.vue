<template>
  <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 font-roboto">
    <div class="bg-white p-6 rounded-xl shadow-lg w-96 max-h-[80vh]">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Select an Item</h2>
      <ul class="overflow-y-auto max-h-60 divide-y divide-gray-200">
        <li
          v-for="item in items"
          :key="item.id"
          class="h-12 flex items-center px-4 hover:bg-gray-100 cursor-pointer"
          @click="selectItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')" class="text-gray-500 hover:underline">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

const items = ref([])

async function fetchItems() {
  const { data, error } = await supabase.from('item').select('id, name')
  if (error) {
    console.error('Failed to fetch items:', error)
  } else {
    items.value = data
  }
}

function selectItem(item) {
  emit('item-selected', item)
  emit('close')
}

onMounted(fetchItems)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
