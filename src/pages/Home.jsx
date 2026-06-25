import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <div className="page-banner text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Employee Management Dashboard</h1>
          <p className="lead text-white-75">A responsive CRUD admin system with search, filters, pagination, validation, and modern UI.</p>
          <Link to="/dashboard" className="btn btn-light btn-lg mt-4">
            View Dashboard
          </Link>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 p-4 h-100">
              <h3>Manage employees efficiently</h3>
              <p>Use the employee register to add, view, update, or remove records from the central database.</p>
              <Link to="/employees" className="btn btn-primary">
                Manage Records
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm rounded-4 p-4 h-100">
              <h3>Fast search and filters</h3>
              <p>Search by name, email, or department and filter results instantly with a modern, responsive layout.</p>
              <Link to="/add" className="btn btn-outline-primary">
                Add Employee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
