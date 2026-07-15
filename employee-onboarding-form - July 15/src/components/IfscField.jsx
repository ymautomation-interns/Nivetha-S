import { useEffect, useState } from "react";
import Field from "./Field.jsx";
import { fetchIfscDetails } from "../utils/api.js";

const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export default function IfscField({
  value,
  onChange,
  onBlur,
  touched,
  valid,
  message,
}) {
  const [status, setStatus] = useState("idle");
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    setStatus("idle");
    setBankDetails(null);
  }, [value]);

  async function handleVerify() {
    try {
      setStatus("loading");

      const data = await fetchIfscDetails(value);

      setBankDetails(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setBankDetails(null);
    }
  }

  const canVerify =
    IFSC_PATTERN.test(value) &&
    status !== "loading";

  return (
    <Field
      name="ifsc"
      label="IFSC Code"
      required
      full
      touched={touched}
      valid={valid}
      message={message}
    >
      <div className="ifsc-row">
        <input
          type="text"
          className="mono"
          placeholder="SBIN0001234"
          maxLength={11}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onBlur={onBlur}
        />

        <button
          type="button"
          className="btn-ghost verify-btn"
          disabled={!canVerify}
          onClick={handleVerify}
        >
          {status === "loading"
            ? "Verifying..."
            : "Verify"}
        </button>
      </div>

      {status === "error" && (
        <p className="api-status error">
          Invalid IFSC code or unable to connect to the bank API.
        </p>
      )}

      {status === "success" && bankDetails && (
        <div className="autofill-box">

          <div>
            <div className="mini">Bank Name</div>
            <div className="val">
              {bankDetails.BANK}
            </div>
          </div>

          <div>
            <div className="mini">Branch</div>
            <div className="val">
              {bankDetails.BRANCH}
            </div>
          </div>

          <div>
            <div className="mini">Address</div>
            <div className="val">
              {bankDetails.ADDRESS}
            </div>
          </div>

          <div>
            <div className="mini">City</div>
            <div className="val">
              {bankDetails.CITY}
            </div>
          </div>

          <div>
            <div className="mini">State</div>
            <div className="val">
              {bankDetails.STATE}
            </div>
          </div>

        </div>
      )}
    </Field>
  );
}