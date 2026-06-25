import { useEffect, useMemo, useState } from 'react'
import { fetchEmployees, removeEmployee } from '../services/api.js'
import Loader from '../components/Loader.jsx'
import EmployeeCard from '../components/EmployeeCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pagination from '../components/Pagination.jsx'
import { toast } from 'react-toastify'

const RECORDS_PER_PAGE = 10

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (err) {
        setError('Unable to fetch employees.')
      } finally {
        setLoading(false)
      }
    }

    loadEmployees()
  }, [])

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        employee.name.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower)

      const matchesFilter = filterBy ? employee.department === filterBy : true
      return matchesSearch && matchesFilter
    })
  }, [employees, searchTerm, filterBy])

  const totalPages = Math.ceil(filteredEmployees.length / RECORDS_PER_PAGE)
  const currentEmployees = filteredEmployees.slice((currentPage - 1) * RECORDS_PER_PAGE, currentPage * RECORDS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDelete = (employee) => {
    setDeleteTarget(employee)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    try {
      await removeEmployee(deleteTarget.id)
      setEmployees((prev) => prev.filter((emp) => emp.id !== deleteTarget.id))
      toast.success('Employee removed successfully.')
      setDeleteTarget(null)
    } catch (err) {
      toast.error('Unable to delete employee.')
    }
  }

  return (
    <div className="container py-5">
      <div className="section-header mb-4">
        <h2 className="fw-bold">Employees</h2>
        <p className="text-muted">List of employee records with search, filter, and pagination.</p>
      </div>

      <div className="card p-4 mb-4 shadow-sm">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} filterBy={filterBy} onFilterChange={setFilterBy} />
      </div>

      {loading && <Loader />}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <div className="card p-3 shadow-sm">
            {currentEmployees.length === 0 ? (
              <div className="p-4 text-center text-muted">No employees match your search.</div>
            ) : (
              currentEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} onDelete={handleDelete} />
              ))
            )}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employees
