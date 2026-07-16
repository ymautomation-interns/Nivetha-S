import { useState } from "react";
import FieldKit from "../components/FieldKit";

function Playground() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [validity, setValidity] = useState({ start: null, end: null });
  const [notes, setNotes] = useState("");
  const [remark, setRemark] = useState("Looks good, pending manager approval.");

  return (
    <div className="playground">
      <div className="playground__card">
        <p className="playground__section">Personal details</p>

        <FieldKit
          type="text"
          id="name"
          label="Employee name"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          blockNumbers
        />

        <FieldKit
          type="number"
          id="account"
          label="Bank account number"
          placeholder="Enter account number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          helperText="9 to 18 digits"
          validLengths={[9, 12]}
        />

        <p className="playground__section">Account tenure</p>

        <FieldKit
          type="daterange"
          id="validity"
          label="Account Validity Period"
          value={validity}
          onChange={setValidity}
          required
          helperText="Select the account opening and validity end date"
        />

        <p className="playground__section">Additional info</p>

        <FieldKit
          type="textarea"
          id="notes"
          label="Additional Notes"
          placeholder="Add any notes about the account holder"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          showCounter
        />

        <FieldKit type="remark" label="Remark" value={remark} />
      </div>
    </div>
  );
}

export default Playground;
