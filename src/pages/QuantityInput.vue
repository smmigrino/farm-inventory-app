<template>
  <div class="quantity-input-page">
    <h2 class="title">Quantity</h2>

    <div class="quantity-display">
      {{ displayQuantity }}
    </div>

    <div class="button-grid">
      <!-- Row 1 -->
      <div class="label-cell tens-label">10's</div>
      <button class="btn minus-btn" @click="decrementTens">-</button>
      <button class="btn plus-btn" @click="incrementTens">+</button>

      <!-- Row 2 -->
      <div class="label-cell ones-label">1's</div>
      <button class="btn minus-btn" @click="decrementOnes">-</button>
      <button class="btn plus-btn" @click="incrementOnes">+</button>
    </div>

    <button class="confirm-btn" @click="confirmQuantity">Done</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const tens = ref(0);
const ones = ref(0);

// Initialize with quantity from query param (if any)
if (route.query.quantity) {
  const qty = String(route.query.quantity).padStart(2, '0');
  tens.value = Number(qty[0]);
  ones.value = Number(qty[1]);
}

const displayQuantity = computed(() => {
  return `${tens.value}${ones.value} kg`;
});

const incrementTens = () => {
  tens.value = (tens.value + 1) % 10;
};
const decrementTens = () => {
  tens.value = (tens.value - 1 + 10) % 10;
};
const incrementOnes = () => {
  ones.value = (ones.value + 1) % 10;
};
const decrementOnes = () => {
  ones.value = (ones.value - 1 + 10) % 10;
};

const confirmQuantity = () => {
  const qty = Number(`${tens.value}${ones.value}`);
  // Route back to Inventory, passing quantity as query param
  router.push({ name: 'Inventory', query: { quantity: qty } });
};
</script>

<style scoped>
.quantity-input-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  font-style: italic;
  font-size: 20px;
  margin: 200px 0 20px 0;
  text-align: center;
  color: #004C4C;
}

.quantity-display {
  height: 80px;
  width: 225px;
  background-color: #004C4C;
  border-radius: 45px;
  color: #B2D8D8;
  font-weight: bold;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  user-select: none;
}

.button-grid {
  display: grid;
  grid-template-columns: 115px 115px 115px;
  grid-template-rows: 75px 75px;
  gap: 10px 20px;
  margin-bottom: 90px;
  width: max-content;
}

/* Label cells */
.label-cell {
  font-weight: bold;
  font-size: 24px;
  color: #004C4C;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Specific label cells for spacing */
.tens-label {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-right: 25px;
}

.ones-label {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  margin-right: 25px;
}

/* Buttons */
.btn {
  border-radius: 45px;
  background-color: #004C4C;
  color: #B2D8D8;
  font-weight: bold;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  user-select: none;
}

.minus-btn {
  grid-column: 2 / 3;
  height: 75px;
  width: 115px;
}

.plus-btn {
  grid-column: 3 / 4;
  height: 75px;
  width: 115px;
}

.confirm-btn {
  font-weight: 800;
  font-size: 25px;
  color: #004C4C;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 auto 0 auto;
  padding: 0;
}
</style>
