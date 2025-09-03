import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import 'assets/userlist.css';

const roleIcons = {
  Student: <FaUserGraduate style={{ color: 'black', marginRight: '6px' }} />,
  Faculty: <FaChalkboardTeacher style={{ color: 'black', marginRight: '6px' }} />,
  Personnel: <FaUserTie style={{ color: 'black', marginRight: '6px' }} />,
  Guard: <FaShieldAlt style={{ color: 'black', marginRight: '6px' }} />,
};

const UserList = () => {
  const [drivers, setDrivers] = useState([]); // no sample data
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [activeRole, setActiveRole] = useState('Student');

  const navigate = useNavigate();

  useEffect(() => {
    setDrivers([]); 
  }, []);

  const roleCount = {
    Student: 0,
    Faculty: 0,
    Personnel: 0,
    Guard: 0,
  };

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h2>Pending List</h2>
        <div className="role-buttons">
          {['Student', 'Faculty', 'Personnel', 'Guard'].map(role => (
            <button
              key={role}
              className={activeRole === role ? 'active' : ''}
              onClick={() => setActiveRole(role)}
            >
              {roleIcons[role]} {role === 'Faculty' ? role : `${role}s`}: {roleCount[role]}
            </button>
          ))}
        </div>
      </div>

      <div className="userlist-actions">
        <div className="left-actions">
          <button className="pending-btn" onClick={() => navigate('/userlist')}>
            User
          </button>
        </div>

        <div className="right-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Driver ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
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
          {/* Table body left empty intentionally */}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
