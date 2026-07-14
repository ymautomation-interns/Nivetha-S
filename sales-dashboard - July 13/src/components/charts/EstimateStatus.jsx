import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./EstimateStatus.css";

const accepted = 191;
const rejected = 48;

const total = accepted + rejected;
const percentage = ((accepted / total) * 100).toFixed(1);

const data = [
  {
    name: "Accepted",
    value: accepted,
    color: "#4CAF50",
  },
  {
    name: "Rejected",
    value: rejected,
    color: "#F97316",
  },
];

function EstimateStatus() {
  return (
    <div className="estimate-status">

      <h3>Estimate Status</h3>

      <div className="gauge-wrapper">

        <ResponsiveContainer width="100%" height={270}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="68%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

        <div className="gauge-center">
          <h1>{percentage}%</h1>
        </div>

      </div>

      <div className="estimate-footer">

        <div className="estimate-box">

          <div className="estimate-title">
            <span className="square green"></span>
            <span className="label">Accepted</span>
          </div>

          <div className="estimate-number">
            {accepted}
          </div>

        </div>

        <div className="estimate-box">

          <div className="estimate-title">
            <span className="square orange"></span>
            <span className="label">Rejected</span>
          </div>

          <div className="estimate-number">
            {rejected}
          </div>

        </div>

      </div>

    </div>
  );
}

export default EstimateStatus;