import React, { useState } from 'react';
import { FiArrowRight, FiCalendar, FiClock, FiFileText, FiUserPlus, FiActivity, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import './NotificationSidebar.css';

const NotificationSidebar = ({ addNotification }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const patientNotifications = {
    accept: {
      title: "Appointment Accepted",
      description: "Rahul Kumar's cardiology appointment has been accepted by Dr. Priya Sharma."
    },
    complete: {
      title: "Treatment Completed",
      description: "Sneha Reddy's treatment has been completed successfully."
    },
    admit: {
      title: "Patient Admitted",
      description: "Vikram Sharma has been admitted to General Ward, Room No. 204."
    },
    lab: {
      title: "Lab Report Ready",
      description: "Meera Nair's blood test report is ready and uploaded in the system."
    },
    emergency: {
      title: "Emergency Alert",
      description: "Ananya Patel has been shifted to ICU due to unstable vital signs."
    },
    surgery: {
      title: "Surgery Scheduled",
      description: "Ramesh Kumar's angioplasty surgery has been scheduled for 3:00 PM in OT-2."
    },
    admission: {
      title: "Patient Admissions",
      description: "5 new patients have been admitted today and are awaiting room allocation."
    },
    labResults: {
      title: "Lab Results",
      description: "12 laboratory reports are ready for doctors to review."
    },
    emergencyCases: {
      title: "Emergency Cases",
      description: "3 emergency patients require immediate medical attention."
    },
    surgeries: {
      title: "Surgeries",
      description: "2 surgeries are scheduled today in Operation Theatre 1."
    },
    discharges: {
      title: "Patient Discharges",
      description: "8 patients have been discharged successfully today."
    },
    appointments: {
      title: "Appointments",
      description: "23 patient appointments have been confirmed for today."
    }
  };

  const showNotification = (type) => {
    const data = patientNotifications[type];
    addNotification(data.title, data.description, "success");
  };

  const approvals = [
    { title: "Patient Admissions", count: 5, type: "admission" },
    { title: "Lab Results", count: 12, type: "labResults" },
    { title: "Emergency Cases", count: 3, type: "emergencyCases" },
    { title: "Surgeries", count: 2, type: "surgeries" },
    { title: "Discharges", count: 8, type: "discharges" },
    { title: "Appointments", count: 23, type: "appointments" }
  ];

  return (
    <div className="notification-sidebar">
      {/* Permission Chart */}
      <div className="sidebar-section permission-chart">
        <h3>Permission Chart</h3>
        <div className="chart-bar">
          <div className="chart-fill" style={{ width: '50%' }}></div>
        </div>
        <div className="chart-info">
          <span>Used 2 Hrs</span>
          <span>2/4 Hr</span>
        </div>
        <div className="leave-balance">
          <span>Leave Balance</span>
          <strong>15</strong>
        </div>
      </div>

      {/* Approvals */}
      <div className="sidebar-section">
        <h3>Pending Approvals</h3>
        <div className="approvals-list">
          {approvals.map((item, index) => (
            <div
              className="approval-card"
              key={index}
              onClick={() => showNotification(item.type)}
            >
              <h4>{item.title}</h4>
              <span>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="sidebar-section reminders">
        <h3>Reminder</h3>
        <div className="calendar-widget">
          <div className="calendar-header">
            <span>July 2026</span>
          </div>
          <div className="calendar-grid">
            <div className="calendar-day">Mon</div>
            <div className="calendar-day">Tue</div>
            <div className="calendar-day">Wed</div>
            <div className="calendar-day">Thu</div>
            <div className="calendar-day">Fri</div>
            <div className="calendar-day">Sat</div>
            <div className="calendar-day">Sun</div>
            
            <div className="calendar-date empty"></div>
            <div className="calendar-date empty"></div>
            <div className="calendar-date">1</div>
            <div className="calendar-date active">2</div>
            <div className="calendar-date">3</div>
            <div className="calendar-date">4</div>
            <div className="calendar-date">5</div>
            
            <div className="calendar-date">6</div>
            <div className="calendar-date">7</div>
            <div className="calendar-date">8</div>
            <div className="calendar-date">9</div>
            <div className="calendar-date">10</div>
            <div className="calendar-date">11</div>
            <div className="calendar-date">12</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSidebar;
