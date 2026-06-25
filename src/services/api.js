import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchEmployees = async () => {
  const response = await api.get('/employees')
  return response.data
}

export const fetchEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`)
  return response.data
}

export const createEmployee = async (employee) => {
  const response = await api.post('/employees', employee)
  return response.data
}

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/employees/${id}`, employee)
  return response.data
}

export const removeEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`)
  return response.data
}

export default api
