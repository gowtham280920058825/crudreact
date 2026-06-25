function EmployeeForm({ formData, onChange, onSubmit, errors, submitLabel }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={onChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={onChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={onChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Salary</label>
          <input
            type="number"
            name="salary"
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
            value={formData.salary}
            onChange={onChange}
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Department</label>
          <select
            name="department"
            className={`form-select ${errors.department ? 'is-invalid' : ''}`}
            value={formData.department}
            onChange={onChange}
          >
            <option value="">Select department</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
          </select>
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
            value={formData.designation}
            onChange={onChange}
          />
          {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address}
            onChange={onChange}
            rows="2"
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
            value={formData.city}
            onChange={onChange}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
            value={formData.state}
            onChange={onChange}
          />
          {errors.state && <div className="invalid-feedback">{errors.state}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
            value={formData.country}
            onChange={onChange}
          />
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>
      </div>
      <div className="mt-4 text-end">
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm
