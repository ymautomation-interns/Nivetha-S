import "./RecentActivities.css";
import {
  FaUserPlus,
  FaFileInvoice,
  FaFileAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUserPlus />,
    color: "#22C55E",
    title: "New Lead Assigned",
    time: "2 minutes ago",
  },
  {
    icon: <FaFileAlt />,
    color: "#3B82F6",
    title: "Estimate Sent",
    time: "15 minutes ago",
  },
  {
    icon: <FaFileInvoice />,
    color: "#8B5CF6",
    title: "Invoice Generated",
    time: "1 hour ago",
  },
  {
    icon: <FaMoneyBillWave />,
    color: "#F97316",
    title: "Payment Received",
    time: "Today",
  },
];

function RecentActivities() {
  return (
    <div className="recent-activities">

      <div className="activity-header">
        <h3>Recent Activities</h3>
        <button>View All</button>
      </div>

      {activities.map((activity, index) => (
        <div className="activity-item" key={index}>

          <div
            className="activity-icon"
            style={{ background: activity.color }}
          >
            {activity.icon}
          </div>

          <div className="activity-info">
            <h4>{activity.title}</h4>
            <p>{activity.time}</p>
          </div>

        </div>
      ))}

    </div>
  );
}

export default RecentActivities;