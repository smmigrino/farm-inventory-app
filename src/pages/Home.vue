<template>
  <div>
    <div class="app-bar">Home</div>
    <h1 class="header">Choose Your Profile</h1>
    <div class="farmer-list">
      <div
        v-for="farmer in farmers"
        :key="farmer.id"
        class="farmer-card"
        @click="goToInventory(farmer.id)"
      >
        <img :src="farmerAvatar" class="avatar" />
        <p class="farmer-name">{{ farmer.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import farmerAvatar from '../assets/farmer-avatar.png';

const farmers = ref([]);
const router = useRouter();

const goToInventory = (id) => {
  router.push(`/inventory/${id}`);
};

onMounted(async () => {
  const { data, error } = await supabase.from('farmer').select('*');
  if (!error) farmers.value = data;
});
</script>

<style scoped>
.app-bar {
  background-color: #66b2b2;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  height: 105px;
  display: flex;
  align-items: flex-end;
  text-align: left;
  justify-content: flex-start;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.header {
  color: #004c4c;
  font-size: 35px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px 0px 50px 0px;
}
.farmer-list {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
}
.farmer-card {
  width: 150px;
  height: 150px;
  background-color: #66b2b2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.farmer-card:active {
  transform: scale(0.97);
  background-color: #559999;
}
.avatar {
  width: 80%;
  height: auto;
  margin-top: -30px;
  z-index: 1;
}
.farmer-name {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 0;
  padding-top: 10px;
}
</style>
