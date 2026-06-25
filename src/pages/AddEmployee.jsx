import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../services/api.js'
import EmployeeForm from '../components/EmployeeForm.jsx'
import { toast } from 'react-toastify'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  department: '',
  designation: '',
  salary: '',
  address: '',
  city: '',
  state: '',
  country: '',
}

function AddEmployee() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!/^\+?\d[\d\s\-]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid.'
    }
    if (!formData.department) newErrors.department = 'Department is required.'
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required.'
    if (!formData.salary) {
      newErrors.salary = 'Salary is required.'
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be greater than zero.'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required.'
    if (!formData.city.trim()) newErrors.city = 'City is required.'
    if (!formData.state.trim()) newErrors.state = 'State is required.'
    if (!formData.country.trim()) newErrors.country = 'Country is required.'
    return newErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the highlighted errors.')
      return
    }

    setSubmitting(true)
    try {
      await createEmployee({ ...formData, createdAt: new Date().toISOString().split('T')[0] })
      toast.success('Employee added successfully.')
      navigate('/employees')
    } catch (err) {
      toast.error('Failed to add employee.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h2 className="fw-bold">Add Employee</h2>
        <p className="text-muted">Complete the form to add a new employee record.</p>
      </div>
      <div className="card shadow-sm p-4">
        <EmployeeForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} errors={errors} submitLabel={submitting ? 'Saving...' : 'Save Employee'} />
      </div>
    </div>
  )
}

export default AddEmployee
