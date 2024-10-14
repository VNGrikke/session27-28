import { getEmployees, addEmployee, deleteEmployee, updateEmployeeStatus } from "@/api/employeeApi";

const employee = {
    state: {
        employees: []
    },
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees;
        },
        addEmployee(state, newEmployee) {
            state.employees.push(newEmployee);
        },
        removeEmployee(state, id) {
            state.employees = state.employees.filter(employee => employee.id !== id);
        },
        updateEmployeeStatus(state, updatedEmployee) {
            const index = state.employees.findIndex(emp => emp.id === updatedEmployee.id);
            if (index !== -1) {
                state.employees[index].status = updatedEmployee.status;
            }
        }
    },
    actions: {
        async getAllEmployee({ commit }) {
            const employees = await getEmployees();
            commit('setEmployees', employees);
        },
        async addEmployee({ commit }, newEmployee) {
            const addedEmployee = await addEmployee(newEmployee);
            commit('addEmployee', addedEmployee);
        },
        async deleteEmployee({ commit }, id) {
            await deleteEmployee(id);
            commit('removeEmployee', id);
        },
        async updateEmployeeStatus({ commit }, { id, status }) {
            const updatedEmployee = await updateEmployeeStatus(id, status);
            commit('updateEmployeeStatus', updatedEmployee);
        }
    },
    getters: {
        employees: state => state.employees
    }
}

export default employee;
