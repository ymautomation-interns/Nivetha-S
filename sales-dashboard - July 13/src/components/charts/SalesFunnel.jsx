import "./SalesFunnel.css";

const salesData = [
  {
    stage: "Lead",
    value: 602,
  },
  {
    stage: "Estimate Sent",
    value: 425,
  },
  {
    stage: "Sales Order",
    value: 245,
  },
  {
    stage: "Invoice",
    value: 175,
  },
  {
    stage: "Payment Received",
    value: 125,
  },
];

function SalesFunnel() {
  const maxValue = Math.max(...salesData.map((item) => item.value));

  return (
    <div className="sales-funnel">

      <div className="sales-header">
        <h3>Sales Funnel</h3>
        <span>Conversion: 68%</span>
      </div>

      {salesData.map((item) => (

        <div key={item.stage} className="sales-item">

          <div className="sales-title">

            <span>{item.stage}</span>

            <span>{item.value}</span>

          </div>

          <div className="progress-bg">

            <div
              className="progress-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
              }}
            ></div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default SalesFunnel;