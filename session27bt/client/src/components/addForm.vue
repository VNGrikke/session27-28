<template>
    <div>
      <h1>Thêm mới nhân viên</h1>
      <form @submit.prevent="addEmployee">
        <div>
          <label for="name">Tên nhân viên</label><br />
          <input type="text" id="name" v-model="employee.name"/>
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>
        <div>
          <label for="date">Ngày sinh</label><br />
          <input type="date" id="date" v-model="employee.dob"/>
          <span v-if="errors.dob" class="error">{{ errors.dob }}</span>
        </div>
        <div>
          <label for="email">Email</label><br />
          <input type="email" id="email" v-model="employee.email"/>
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div>
          <label for="address">Địa chỉ</label><br />
          <input type="text" id="address" v-model="employee.address"/>
          <span v-if="errors.address" class="error">{{ errors.address }}</span>
        </div>
        <button type="submit">Thêm nhân viên</button>
        <button type="button" @click="closeForm">Đóng</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  import { useStore } from "vuex";
  
  const emit = defineEmits();
  const store = useStore();
  const employee = ref({
    name: "",
    dob: "",
    email: "",
    address: "",
    status: true,
  });
  const errors = ref({});
  
  const resetForm = () => {
    employee.value = {
      name: "",
      dob: "",
      email: "",
      address: "",
      status: true,
    };
    errors.value = {};
  };
  
  const validateForm = () => {
    errors.value = {};
    let isValid = true;
  
    if (!employee.value.name) {
      errors.value.name = "Tên nhân viên là bắt buộc.";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(employee.value.name)) {
      errors.value.name = "Tên chỉ chứa chữ cái.";
      isValid = false;
    }
  
    if (!employee.value.dob) {
      errors.value.dob = "Ngày sinh là bắt buộc.";
      isValid = false;
    } else if (new Date(employee.value.dob) >= new Date()) {
      errors.value.dob = "Ngày sinh phải là trong quá khứ.";
      isValid = false;
    }
  
    if (!employee.value.email) {
      errors.value.email = "Email là bắt buộc.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.value.email)) {
      errors.value.email = "Email không hợp lệ.";
      isValid = false;
    }
  
    if (!employee.value.address) {
      errors.value.address = "Địa chỉ là bắt buộc.";
      isValid = false;
    } else if (employee.value.address.length < 5) {
      errors.value.address = "Địa chỉ phải có ít nhất 5 ký tự.";
      isValid = false;
    }
  
    return isValid;
  };
  
  const addEmployee = async () => {
    if (validateForm()) {
      await store.dispatch("addEmployee", employee.value);
      resetForm();
      emit("close");
    }
  };
  
  const closeForm = () => {
    resetForm();
    emit("close");
  };
  </script>
  
  <style>
  .error {
    color: red;
    font-size: 0.9em;
  }
  </style>
  