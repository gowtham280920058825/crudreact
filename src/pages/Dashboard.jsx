import { useEffect, useState } from 'react'
import { fetchEmployees } from '../services/api.js'
import Loader from '../components/Loader.jsx'

function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (err) {
        setError('Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()
  }, [])

  const totalSalary = employees.reduce((sum, employee) => sum + Number(employee.salary || 0), 0)

  return (
    <div className="container py-5">
      <div className="section-header text-center mb-5">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">Overview of employee activity and records.</p>
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card dashboard-card p-4 bg-white text-center h-100">
              <h6 className="text-uppercase text-muted mb-3">Total Employees</h6>
              <h2 className="fw-bold">{employees.length}</h2>
              <p className="text-muted mb-0">Active records in the system</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card dashboard-card p-4 bg-white text-center h-100">
              <h6 className="text-uppercase text-muted mb-3">Total Salary</h6>
              <h2 className="fw-bold">${totalSalary.toLocaleString()}</h2>
              <p className="text-muted mb-0">Combined employee payroll</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card dashboard-card p-4 bg-white text-center h-100">
              <h6 className="text-uppercase text-muted mb-3">Top Department</h6>
              <h2 className="fw-bold">{employees.length ? employees[0].department : 'N/A'}</h2>
              <p className="text-muted mb-0">Recently added employee category</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
