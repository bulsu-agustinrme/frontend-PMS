import React from 'react';
import 'assets/notifications.css';

const dummyNotifications = [
  { id: 1, message: 'Vehicle with plate ZXC 1234 entered the parking area.', time: '2 mins ago', date: 'July 24, 2025' },
  { id: 2, message: 'Slot A12 is now available.', time: '10 mins ago', date: 'July 24, 2025' },
  { id: 3, message: 'User John Dela Cruz submitted feedback.', time: '30 mins ago', date: 'July 24, 2025' },
  { id: 4, message: 'A new registration is pending approval.', time: '1 hour ago', date: 'July 24, 2025' },
];

const Notifications = () => {
  return (
    <div className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <ul className="notifications-list">
        {dummyNotifications.map((notif) => (
          <li key={notif.id} className="notification-item">
            <div className="notif-message">{notif.message}</div>
            <div className="notif-meta">
              <span className="notif-date">{notif.date}</span>
              <span className="notif-time">{notif.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
