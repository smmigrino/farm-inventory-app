<template>
  <div>
    <FarmerList :farmer="farmer" @select-farmer="goToInventory" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import FarmerList from '../components/FarmerList.vue'

const farmers = ref([])
const router = useRouter()

onMounted(async () => {
  const { data, error } = await supabase.from('farmer').select()
  if (error) {
    console.error('Failed to fetch farmer:', error.message)
  } else {
    farmer.value = data
  }
})

function goToInventory(farmerId) {
  router.push(`/inventory/${farmerId}`)
}
</script>
