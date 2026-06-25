function SearchBar({ searchTerm, onSearch, filterBy, onFilterChange }) {
  return (
    <div className="row gy-2 align-items-center">
      <div className="col-md-6">
        <input
          type="search"
          className="form-control"
          placeholder="Search by name, email or department"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <select className="form-select" value={filterBy} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar
