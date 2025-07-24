import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'assets/userlist.css';

const UserList = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [activeRole, setActiveRole] = useState('Student');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/drivers')
      .then(response => setDrivers(response.data))
      .catch(error => console.error('Error fetching drivers:', error));
  }, []);

  const roleCount = {
    Student: 0,
    Faculty: 0,
    Personnel: 0,
    Guard: 0,
  };

  drivers.forEach(driver => {
    if (roleCount[driver.position] !== undefined) {
      roleCount[driver.position]++;
    }
  });

  const filteredData = drivers.filter(driver =>
    driver.position === activeRole &&
    driver.id.toString().includes(search.toLowerCase()) // assuming id is DriverID
  );

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h2>User List</h2>
        <div className="role-buttons">
          {['Student', 'Faculty', 'Personnel', 'Guard'].map(role => (
            <button
              key={role}
              className={activeRole === role ? 'active' : ''}
              onClick={() => setActiveRole(role)}
            >
              {role === 'Faculty' ? 'Faculty' : `${role}s`}: {roleCount[role]}
            </button>
          ))}
        </div>
      </div>

      <div className="userlist-actions">
        <div className="role-buttons">
          <button className="add">Add</button>
          <button
            className="pending"
            onClick={() => navigate('/pendinglist')}
          >
            Pending
          </button>
        </div>

        <div className="right-actions">
          <input
            type="text"
            placeholder="Search by Driver ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>

      <table className="userlist-table">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>User ID</th>
            <th>QR Code ID</th>
            <th>Position</th>
            <th>Department</th>
            <th>Driver License</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((driver, index) => (
            <tr key={index}>
              <td>{driver.id}</td>
              <td>{driver.user_id}</td>
              <td>{driver.qr_code}</td>
              <td>{driver.position}</td>
              <td>{driver.department}</td>
              <td>{driver.driver_license}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
