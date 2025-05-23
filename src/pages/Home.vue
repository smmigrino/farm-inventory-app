<template>
  <div>
    <FarmerList :farmers="farmers" @select-farmer="goToInventory" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase' // Use @ alias if supported
import { useRouter } from 'vue-router'
import FarmerList from '../components/FarmerList.vue'

const farmers = ref([])
const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.from('farmer').select('id, name') // ✨ Select only needed fields
  if (error) {
    console.error('Failed to fetch farmers:', error.message)
  } else {
    farmers.value = data
  }
})

function goToInventory(farmerId) {
  router.push(`/inventory/${farmerId}`)
}
</script>
