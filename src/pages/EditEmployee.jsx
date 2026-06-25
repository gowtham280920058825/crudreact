import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchEmployeeById, updateEmployee } from '../services/api.js'
import EmployeeForm from '../components/EmployeeForm.jsx'
import Loader from '../components/Loader.jsx'
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

function EditEmployee() {
  const { id } = useParams()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id)
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          department: data.department || '',
          designation: data.designation || '',
          salary: data.salary || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          country: data.country || '',
        })
      } catch (err) {
        setError('Unable to load employee details.')
      } finally {
        setLoading(false)
      }
    }

    loadEmployee()
  }, [id])

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
      await updateEmployee(id, formData)
      toast.success('Employee updated successfully.')
      navigate('/employees')
    } catch (err) {
      toast.error('Failed to update employee.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h2 className="fw-bold">Edit Employee</h2>
        <p className="text-muted">Update the employee information and save the changes.</p>
      </div>
      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="card shadow-sm p-4">
          <EmployeeForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} errors={errors} submitLabel={submitting ? 'Updating...' : 'Update Employee'} />
        </div>
      )}
    </div>
  )
}

export default EditEmployee
