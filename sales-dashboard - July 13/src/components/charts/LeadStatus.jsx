import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./LeadStatus.css";

const data = [
  {
    name: "Very Interested",
    value: 52,
    color: "#4CAF50",
  },
  {
    name: "Interested",
    value: 34,
    color: "#2196F3",
  },
  {
    name: "Neutral",
    value: 18,
    color: "#FF9800",
  },
  {
    name: "Not Interested",
    value: 8,
    color: "#FFC107",
  },
  {
    name: "Expired",
    value: 5,
    color: "#7E57C2",
  },
];

function LeadStatus() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="lead-status">

      <h3>Lead Status</h3>

      <div className="lead-content">

        <div className="chart-wrapper">

          <ResponsiveContainer width={220} height={220}>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
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

          <div className="chart-center">
            <h4>Overall</h4>
            <p>{total}</p>
          </div>

        </div>

        <div className="lead-legend">

          {data.map((item) => (

            <div className="legend-row" key={item.name}>

              <div className="legend-left">

                <span
                  className="color-box"
                  style={{
                    background: item.color,
                  }}
                ></span>

                {item.name}

              </div>

              <span>{item.value}</span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default LeadStatus;