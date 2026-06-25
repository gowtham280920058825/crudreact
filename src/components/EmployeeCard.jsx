import { Link } from 'react-router-dom'

function EmployeeCard({ employee, onDelete }) {
  return (
    <div className="card card-table mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-8 px-4 py-3">
          <h5 className="mb-2">{employee.name}</h5>
          <p className="mb-1 text-muted">{employee.designation} • {employee.department}</p>
          <p className="mb-1 small text-muted">Email: {employee.email}</p>
          <p className="mb-0 small text-muted">Phone: {employee.phone}</p>
        </div>
        <div className="col-md-4 text-end px-4 py-3">
          <Link to={`/view/${employee.id}`} className="btn btn-sm btn-outline-primary me-2 mb-2">
            View
          </Link>
          <Link to={`/edit/${employee.id}`} className="btn btn-sm btn-outline-success me-2 mb-2">
            Edit
          </Link>
          <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => onDelete(employee)} className="btn btn-sm btn-outline-danger mb-2">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
