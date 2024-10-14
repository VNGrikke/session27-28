<template>
  <div>
    <h1>Nhân Viên</h1>
    <button @click="showAddForm = true">Thêm mới nhân viên</button>
    <div>
      <input
        type="text"
        placeholder="Nhập email tìm kiếm"
        v-model="searchEmail"
      />
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in filteredEmployees" :key="employee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.dob }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.address }}</td>
            <td>{{ employee.status ? "Hoạt động" : "Không hoạt động" }}</td>
            <td>
              <button @click="toggleEmployeeStatus(employee)">
                {{ employee.status ? "Chặn" : "Bỏ chặn" }}
              </button>
              <button @click="editEmployee(employee.id)">Sửa</button>
              <button @click="showDeleteConfirmation(employee.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddForm v-if="showAddForm" @close="showAddForm = false" />
    <DeleteModal
      v-if="showDeleteModal"
      :employeeId="employeeToDelete"
      @confirm="deleteEmployee"
      @close="showDeleteModal = false"
    />
  </div>
</template>
  
  <script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import AddForm from "./addForm.vue";
import DeleteModal from "./deleteModal.vue";

const store = useStore();
const employees = computed(() => store.getters.employees);
const showAddForm = ref(false);
const showDeleteModal = ref(false);
const employeeToDelete = ref(null);
const searchEmail = ref("");

onMounted(() => {
  store.dispatch("getAllEmployee");
});

const filteredEmployees = computed(() => {
  return employees.value.filter((employee) =>
    employee.email.toLowerCase().includes(searchEmail.value.toLowerCase())
  );
});

const showDeleteConfirmation = (id) => {
  employeeToDelete.value = id;
  showDeleteModal.value = true;
};

const deleteEmployee = async (id) => {
  await store.dispatch("deleteEmployee", id);
  showDeleteModal.value = false;
};

const toggleEmployeeStatus = async (employee) => {
  const newStatus = !employee.status;
  await store.dispatch("updateEmployeeStatus", {
    id: employee.id,
    status: newStatus,
  });
};
</script>
  
  
<style>
</style>
  