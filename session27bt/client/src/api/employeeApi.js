import axios from "axios";

export const getEmployees = async () => {
    const response = await axios.get('http://localhost:3000/employees');
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post('http://localhost:3000/employees', employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:3000/employees/${id}`);
};

export const updateEmployeeStatus = async (id, status) => {
    const response = await axios.patch(`http://localhost:3000/employees/${id}`, { status });
    return response.data;
};