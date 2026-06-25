import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchEmployeeById } from '../services/api.js'
import Loader from '../components/Loader.jsx'

function ViewEmployee() {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id)
        setEmployee(data)
      } catch (err) {
        setError('Unable to load employee details.')
      } finally {
        setLoading(false)
      }
    }

    loadEmployee()
  }, [id])

  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h2 className="fw-bold">View Employee</h2>
        <p className="text-muted">Employee detailed profile and contact information.</p>
      </div>
      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && employee && (
        <div className="card shadow-sm p-4">
          <div className="row gy-3">
            <div className="col-md-6">
              <h5 className="mb-3">{employee.name}</h5>
              <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
              <p className="mb-1"><strong>Phone:</strong> {employee.phone}</p>
              <p className="mb-1"><strong>Department:</strong> {employee.department}</p>
              <p className="mb-1"><strong>Designation:</strong> {employee.designation}</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><strong>Salary:</strong> ${Number(employee.salary).toLocaleString()}</p>
              <p className="mb-1"><strong>Address:</strong> {employee.address}</p>
              <p className="mb-1"><strong>City:</strong> {employee.city}</p>
              <p className="mb-1"><strong>State:</strong> {employee.state}</p>
              <p className="mb-1"><strong>Country:</strong> {employee.country}</p>
              <p className="mb-0"><strong>Created At:</strong> {employee.createdAt}</p>
            </div>
          </div>
          <div className="mt-4 text-end">
            <Link to="/employees" className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewEmployee
