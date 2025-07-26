import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Commented for local test only
import { useNavigate } from 'react-router-dom';
import 'assets/userlist.css';

const sampleDrivers = [
  {
    id: 1001,
    user_id: 'U001',
    qr_code: 'QR1001',
    position: 'Student',
    department: 'College of Engineering',
    driver_license: 'DL1001'
  },
  {
    id: 1005,
    user_id: 'U005',
    qr_code: 'QR1005',
    position: 'Faculty',
    department: 'College of Arts',
    driver_license: 'DL1005'
  },
  {
    id: 1003,
    user_id: 'U003',
    qr_code: 'QR1003',
    position: 'Student',
    department: 'College of Nursing',
    driver_license: 'DL1003'
  },
  {
    id: 1002,
    user_id: 'U002',
    qr_code: 'QR1002',
    position: 'Personnel',
    department: 'College of Business',
    driver_license: 'DL1002'
  },
  {
    id: 1004,
    user_id: 'U004',
    qr_code: 'QR1004',
    position: 'Guard',
    department: 'Security Office',
    driver_license: 'DL1004'
  },
  {
    id: 1006,
    user_id: 'U006',
    qr_code: 'QR1006',
    position: 'Student',
    department: 'College of Technology',
    driver_license: 'DL1006'
  }
];

const UserList = () => {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [activeRole, setActiveRole] = useState('Student');

  const navigate = useNavigate();

  // --- MOCK FETCH DATA FOR TESTING ---
  useEffect(() => {
    // axios.get('http://localhost:8000/api/drivers')
    //   .then(response => setDrivers(response.data))
    //   .catch(error => console.error('Error fetching drivers:', error));
    setDrivers(sampleDrivers); // Use mock data instead of API
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

  const filteredData = drivers
    .filter(driver =>
      driver.position === activeRole &&
      driver.id.toString().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'newest') return b.id - a.id;
      else return a.id - b.id;
    });

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
          {/* Removed Add button */}
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
