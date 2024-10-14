<template>
  <div class="confirmation-modal">
    <h1>Xác nhận</h1>
    <div>
      <p>Bạn có chắc chắn muốn xóa nhân viên này?</p>
    </div>
    <div>
      <button @click="confirmDelete">Xóa</button>
      <button @click="cancelDelete">Hủy</button>
    </div>
  </div>
</template>
  
  <script setup>
import { defineProps } from "vue";

const props = defineProps({
  employeeId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits();

const confirmDelete = () => {
  emit("confirm", props.employeeId); 
};

const cancelDelete = () => {
  emit("close");
};
</script>
  
<style>

</style>
  