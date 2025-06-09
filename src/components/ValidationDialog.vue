<template>
  <div class="overlay" v-if="visible">
    <div class="dialog">
      <p class="message">Please complete Add Item and Quantity before proceeding.</p>
      <button class="close-btn" @click="emitClose">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

function emitClose() {
  emit('close');
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog {
  width: 340px;
  height: 200px;
  background-color: #B2D8D8;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.message {
  color: #004C4C;
  font-size: 18px;
  text-align: center;
  margin: 20px 0;
}

.close-btn {
  background-color: #004C4C;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: #003333;
}
</style>
