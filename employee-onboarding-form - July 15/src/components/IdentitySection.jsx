import TextField from "./TextField.jsx";
import AadhaarField from "./AadhaarField.jsx";
import { HINTS } from "../data/referenceData.js";
import { extractPANFromGST } from "../utils/validators.js";

export default function IdentitySection({ formData, touched, results, onChange, onBlur }) {
  return (
    <section className="part" id="partC">
      <div className="part-head">
        <h2 className="part-title">Identity documents</h2>
      </div>
      <p className="part-note">Enter your GSTIN first — your PAN fills in from it automatically.</p>
      <div className="grid g3">
        <TextField
          name="gst"
          label="GSTIN"
          required
          mono
          placeholder="22ABCDE1234F1Z5"
          maxLength={15}
          value={formData.gst}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.gst}
          valid={results.gst[0]}
          message={touched.gst ? results.gst[1] : HINTS.gst}
        />
        <TextField
          name="pan"
          label="PAN"
          required
          mono
          placeholder="ABCDE1234F"
          maxLength={10}
          readOnly={formData.pan !== "" && extractPANFromGST(formData.gst) === formData.pan}
          value={formData.pan}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.pan}
          valid={results.pan[0]}
          message={touched.pan ? results.pan[1] : HINTS.pan}
        />
        <TextField
          name="passport"
          label="Passport number"
          required
          mono
          placeholder="A1234567"
          maxLength={8}
          value={formData.passport}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.passport}
          valid={results.passport[0]}
          message={touched.passport ? results.passport[1] : HINTS.passport}
        />
        <TextField
          name="license"
          label="Driving license"
          required
          mono
          placeholder="TN0120210001234"
          maxLength={15}
          value={formData.license}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.license}
          valid={results.license[0]}
          message={touched.license ? results.license[1] : HINTS.license}
        />
        <TextField
          name="voterId"
          label="Voter ID (EPIC)"
          required
          mono
          placeholder="ABC1234567"
          maxLength={10}
          value={formData.voterId}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.voterId}
          valid={results.voterId[0]}
          message={touched.voterId ? results.voterId[1] : HINTS.voterId}
        />
        <AadhaarField
          value={formData.aadhaar}
          onChange={(next) => onChange("aadhaar", next)}
          onBlur={() => onBlur("aadhaar")}
          touched={!!touched.aadhaar}
          valid={results.aadhaar[0]}
          message={touched.aadhaar ? results.aadhaar[1] : HINTS.aadhaar}
        />
      </div>
    </section>
  );
}
