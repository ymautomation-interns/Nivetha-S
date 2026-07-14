import "./../styles/Dashboard.css";

import UserProfile from "../components/common/UserProfile/UserProfile";
import LeadStatus from "../components/charts/LeadStatus";
import SalesFunnel from "../components/charts/SalesFunnel";
import EstimateStatus from "../components/charts/EstimateStatus";
import UserDropdown from "../components/common/UserDropdown/UserDropdown";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <header className="dashboard-header">

        <div>
          <h2>Sales Dashboard</h2>
          <p>Welcome back, Nivetha 👋</p>
        </div>

        <UserProfile />

      </header>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        {/* Lead Status */}
        <div className="card">
          <LeadStatus />
        </div>

        {/* Sales Funnel */}
        <div className="card">
          <SalesFunnel />
        </div>

        {/* Estimate Status */}
        <div className="card">
          <EstimateStatus />
        </div>

        {/* Team Members */}
        <div className="card">

          <h3 style={{ marginBottom: "20px", color: "#2563eb" }}>
            Team Members
          </h3>

          <UserDropdown />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;