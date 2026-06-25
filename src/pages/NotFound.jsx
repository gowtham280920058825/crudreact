import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm rounded-4 p-5">
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead">Page not found. The route may be incorrect or the resource is unavailable.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
