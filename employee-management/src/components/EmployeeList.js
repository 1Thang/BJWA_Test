import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [direction, setDirection] = useState('asc');

  const [form, setForm] = useState({
    id: null,
    name: '',
    age: '',
    salary: '',
    bloodGroup: '',
    department: null,
    photoBase64: ''
  });

  const fetchEmployees = async () => {
    const res = await axios.get('http://localhost:8080/api/employees', {
      params: { keyword, page, sortBy, direction }
    });
    setEmployees(res.data.content);
    setTotalPages(res.data.totalPages);
  };

  const fetchDepartments = async () => {
    const res = await axios.get('http://localhost:8080/api/departments');
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, [keyword, page, sortBy, direction]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchEmployees();
    }
  };

  const handleEdit = (emp) => {
    setForm({ ...emp });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`http://localhost:8080/api/employees/${form.id}`, form);
    } else {
      await axios.post('http://localhost:8080/api/employees', form);
    }
    setForm({ id: null, name: '', age: '', salary: '', bloodGroup: '', department: null, photoBase64: '' });
    fetchEmployees();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, photoBase64: reader.result.split(',')[1] });
    reader.readAsDataURL(file);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setDirection('asc');
    }
  };

  const handleClear = () => {
    setForm({ id: null, name: '', age: '', salary: '', bloodGroup: '', department: null, photoBase64: '' });
  };

  return (
    <div className="container mt-5">

      {/* Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-4 border p-4 rounded shadow bg-white">
        <div className="col-md-6">
          <input className="form-control" placeholder="Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="Age" value={form.age}
            onChange={e => setForm({ ...form, age: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="Salary" value={form.salary}
            onChange={e => setForm({ ...form, salary: e.target.value })} required />
        </div>
        <div className="col-md-6">
          <select className="form-select" value={form.bloodGroup}
            onChange={e => setForm({ ...form, bloodGroup: e.target.value })} required>
            <option value="">Select Blood Group</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="O">O</option>
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={form.department?.id || ''}
            onChange={e => {
              const selected = departments.find(d => d.id === parseInt(e.target.value));
              setForm({ ...form, department: selected });
            }} required>
            <option value="">Select Department</option>
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nameDepartment}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
        </div>

        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary w-50">
            {form.id ? 'Update' : 'Add'} Employee
          </button>
          <button type="button" onClick={handleClear} className="btn btn-secondary w-50">
            Clear
          </button>
        </div>
      </form>

      {/* Search */}
      <input
        className="form-control mb-3"
        placeholder="Search by name, blood group, or department..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />

      {/* Table */}
      <div className="table-responsive shadow rounded bg-white">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID</th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Blood Group</th>
              <th>Department</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.bloodGroup}</td>
                <td>{emp.department?.nameDepartment}</td>
                <td>
                  {emp.photoBase64 && (
                    <img src={`data:image/jpeg;base64,${emp.photoBase64}`} alt="photo" className="img-thumbnail" width="60" />
                  )}
                </td>
                <td>
                  <button onClick={() => handleEdit(emp)} className="btn btn-warning btn-sm me-2">✏️</button>
                  <button onClick={() => handleDelete(emp.id)} className="btn btn-danger btn-sm">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="btn btn-outline-primary">Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page + 1 === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-outline-primary">Next</button>
      </div>
    </div>
  );
}
