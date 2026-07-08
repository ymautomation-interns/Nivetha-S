import React, { useState } from 'react';
import { FiHome, FiCalendar, FiUsers, FiUser, FiActivity, FiFileText, FiGrid, FiBell, FiSettings, FiSearch, FiCheck, FiX } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = ({ addNotification }) => {
  const [appointments, setAppointments] = useState([
    { id: 'PT001', name: 'Rahul', doctor: 'Dr. Smith', department: 'Cardiology', time: '10:30 AM', status: 'Pending' },
    { id: 'PT002', name: 'Priya', doctor: 'Dr. John', department: 'Neurology', time: '11:00 AM', status: 'Accepted' },
    { id: 'PT003', name: 'Kumar', doctor: 'Dr. Alex', department: 'Orthopedic', time: '12:30 PM', status: 'Completed' },
  ]);

  const patientNotifications = {
    accept: {
      title: "Appointment Accepted",
      description: "Rahul's cardiology appointment has been accepted by Dr. Priya Sharma."
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

  const patients = [
    {
      id: 1,
      name: "John Anderson",
      action: "Accept",
      color: "#22c55e",
      type: "accept"
    },
    {
      id: 2,
      name: "Emma Wilson",
      action: "Complete",
      color: "#3b82f6",
      type: "complete"
    },
    {
      id: 3,
      name: "Michael Brown",
      action: "Admit",
      color: "#8b5cf6",
      type: "admit"
    },
    {
      id: 4,
      name: "Sophia Davis",
      action: "Lab Ready",
      color: "#f59e0b",
      type: "lab"
    },
    {
      id: 5,
      name: "Daniel Thomas",
      action: "Emergency",
      color: "#ef4444",
      type: "emergency"
    },
    {
      id: 6,
      name: "Olivia Martin",
      action: "Schedule Surgery",
      color: "#ec4899",
      type: "surgery"
    }
  ];

  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', active: true },
    { icon: <FiCalendar />, label: 'Appointments' },
    { icon: <FiUsers />, label: 'Patients' },
    { icon: <FiUser />, label: 'Doctors' },
    { icon: <FiActivity />, label: 'Departments' },
    { icon: <FiFileText />, label: 'Medical Records' },
    { icon: <FiGrid />, label: 'Pharmacy' },
    { icon: <FiFileText />, label: 'Billing' },
    { icon: <FiActivity />, label: 'Reports' },
    { icon: <FiBell />, label: 'Notifications' },
    { icon: <FiSettings />, label: 'Settings' },
  ];

  const cards = [
    { label: "Today's Appointments", value: 23, icon: <FiCalendar /> },
    { label: 'Total Patients', value: 150, icon: <FiUsers /> },
    { label: 'Doctors Available', value: 12, icon: <FiUser /> },
    { label: 'Emergency Cases', value: 3, icon: <FiActivity /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f59e0b';
      case 'Accepted': return '#22c55e';
      case 'Completed': return '#3b82f6';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const showNotification = (type) => {
    const data = patientNotifications[type];
    addNotification(data.title, data.description, "success");
  };

  const handleAccept = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'Accepted' } : apt
    ));
    const patient = appointments.find(apt => apt.id === id);
    addNotification(
      "Appointment Accepted",
      `Dr. Priya has accepted ${patient.name}'s appointment scheduled for ${patient.time}.`,
      "success"
    );
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'Cancelled' } : apt
    ));
    const patient = appointments.find(apt => apt.id === id);
    addNotification(
      "Appointment Cancelled",
      `${patient.name}'s appointment with ${patient.doctor} has been cancelled.`,
      "error"
    );
  };

  return (
    <div className="dashboard">
      {/* Left Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-logo">
          <h2>Medical Portal</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search patients, doctors, appointments..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><FiBell /></button>
            <button className="icon-btn"><FiSettings /></button>
            <div className="profile-avatar">
              <div className="avatar-circle">PT</div>
            </div>
          </div>
        </div>

        {/* Dashboard Top Section */}
        <div className="dashboard-top">
          <div className="dashboard-cards">
            {cards.map((card, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-info">
                  <div className="stat-label">{card.label}</div>
                  <div className="stat-value">{card.value}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Permission Chart */}
          <div className="permission-chart-card">
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
        </div>

        {/* Patient Actions */}
        <div className="appointment-section">
          <h2>Patient Actions</h2>
          <div className="patient-actions">
            {patients.map((patient) => (
              <div className="patient-card" key={patient.id}>
                <div className="patient-info">
                  <h4>{patient.name}</h4>
                </div>
                <button
                  style={{ background: patient.color }}
                  onClick={() => showNotification(patient.type)}
                >
                  {patient.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
