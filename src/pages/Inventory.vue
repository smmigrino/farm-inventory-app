<template>
  <div>
    <!-- App Bar -->
    <div class="app-bar">
      <div class="left-bar">
        <div class="avatar-circle">
          <img :src="farmerAvatar" alt="avatar" class="avatar-img" />
        </div>
        <span class="farmer-name">{{ farmerName }}</span>
      </div>
      <img src="@/assets/back-arrow.png" class="back-icon" @click="goBack" />
    </div>

    <!-- Page Title -->
    <h1 class="page-title">Log to Inventory</h1>

    <!-- Add Item -->
    <h2 class="section-title">Add Item</h2>
    <div class="input-box" @click="goToItemSelection">
      <span class="input-text">
        {{ selectedItem.name ? selectedItem.name : 'Item Name' }}
      </span>
    </div>

    <!-- Quantity -->
    <h2 class="section-title">Quantity</h2>
    <div class="input-box" @click="goToQuantityInput">
      <span class="input-text">
        {{ quantity ? quantity + 'kg' : '00kg' }}
      </span>
    </div>

    <!-- SRP per KG -->
    <h2 class="section-title">SRP per KG</h2>
    <p class="srp-text">{{ srp ? `₱${parseFloat(srp).toFixed(2)}` : '₱00.00' }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import farmerAvatar from '@/assets/farmer-avatar.png'


const route = useRoute()
const router = useRouter()

const farmerId = route.params.farmerId
const farmerName = ref('')
const selectedItem = ref({ id: null, name: '' })
const quantity = ref(null)
const srp = ref(null)

const goBack = () => {
  router.push('/')
}

const goToItemSelection = () => {
  router.push({
    name: 'ItemSelection',
    query: { from: 'inventory', farmerId }
  })
}

const goToQuantityInput = () => {
  router.push({
    name: 'QuantityInput',
    query: { from: 'inventory', farmerId }
  })
}

onMounted(async () => {
  // Get farmer name
  const { data, error } = await supabase
    .from('farmer')
    .select('name')
    .eq('id', farmerId)
    .single()

  if (!error && data) {
    farmerName.value = data.name
  }

  // For now, SRP will be fetched once item is selected (you can refactor if needed)
  // This is placeholder logic — later when returning from ItemSelection.vue,
  // you should set selectedItem and fetch SRP again
})
</script>

<style scoped>
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #006666;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 105px;
}

.left-bar {
  display: flex;
  align-items: center;
}

.avatar-circle {
  background: white;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: auto;
}

.back-icon {
  width: 50px;
  height: auto;
  cursor: pointer;
}

.farmer-name {
  font-family: Roboto;
  font-size: 32px;
  color: #b2d8d8;
}

.page-title {
  text-align: center;
  font-size: 32px;
  color: #006666;
  margin: 20px 0 50px 0;
}

.section-title {
  text-align: center;
  font-size: 25px;
  color: #006666;
  margin: 0 0 20px 0;
}

.input-box {
  background: #006666;
  border-radius: 20px;
  margin: 0 auto 70px auto;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.input-text {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  color: #b2d8d8;
  text-align: center;
}

.srp-text {
  text-align: center;
  font-size: 20px;
  color: #004c4c;
}
</style>
