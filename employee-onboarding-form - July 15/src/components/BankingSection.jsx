import TextField from "./TextField.jsx";
import IfscField from "./IfscField.jsx";
import { HINTS } from "../data/referenceData.js";

export default function BankingSection({ formData, touched, results, onChange, onBlur }) {
  return (
    <section className="part" id="partD">
      <div className="part-head">
        <h2 className="part-title">Banking &amp; statutory</h2>
      </div>
      <p className="part-note">Bank name and branch resolve automatically from a valid IFSC code.</p>
      <div className="grid">
        <IfscField
          value={formData.ifsc}
          onChange={(v) => onChange("ifsc", v)}
          onBlur={() => onBlur("ifsc")}
          touched={!!touched.ifsc}
          valid={results.ifsc[0]}
          message={touched.ifsc ? results.ifsc[1] : HINTS.ifsc}
        />
        <TextField
          name="bankAccount"
          label="Bank account number"
          required
          mono
          placeholder="e.g. 123456789012"
          inputMode="numeric"
          maxLength={18}
          value={formData.bankAccount}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.bankAccount}
          valid={results.bankAccount[0]}
          message={touched.bankAccount ? results.bankAccount[1] : HINTS.bankAccount}
        />
        <TextField
          name="esi"
          label="ESI number"
          required
          mono
          placeholder="e.g. 12345678901234567"
          inputMode="numeric"
          maxLength={17}
          value={formData.esi}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.esi}
          valid={results.esi[0]}
          message={touched.esi ? results.esi[1] : HINTS.esi}
        />
        <TextField
          name="pf"
          label="PF number"
          required
          mono
          placeholder="e.g. MH0012345000012345"
          maxLength={22}
          value={formData.pf}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.pf}
          valid={results.pf[0]}
          message={touched.pf ? results.pf[1] : HINTS.pf}
        />
        <TextField
          name="uan"
          label="UAN number"
          required
          mono
          placeholder="e.g. 123456789012"
          inputMode="numeric"
          maxLength={12}
          value={formData.uan}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.uan}
          valid={results.uan[0]}
          message={touched.uan ? results.uan[1] : HINTS.uan}
        />
        <TextField
          name="ptax"
          label="Professional tax reg. no."
          required
          mono
          placeholder="e.g. PT1234567"
          maxLength={15}
          value={formData.ptax}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.ptax}
          valid={results.ptax[0]}
          message={touched.ptax ? results.ptax[1] : HINTS.ptax}
        />
      </div>
    </section>
  );
}
