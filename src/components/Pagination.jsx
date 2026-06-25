function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = []
  for (let page = 1; page <= totalPages; page += 1) {
    items.push(
      <li className="page-item" key={page}>
        <button className={`page-link ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
          {page}
        </button>
      </li>
    )
  }

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center mt-4 mb-0">{items}</ul>
    </nav>
  )
}

export default Pagination
