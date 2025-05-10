import React from 'react';
import EmployeeList from './components/EmployeeList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">🌟 Employee Management</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
