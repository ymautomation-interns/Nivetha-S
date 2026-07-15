import Field from "./Field.jsx";
import { PHONE_CODES } from "../data/referenceData.js";
import { getPhoneMeta } from "../utils/validators.js";

export default function PhoneField({
  phoneCountry,
  phoneNumber,
  onCountryChange,
  onNumberChange,
  onBlur,
  touched,
  valid,
  message,
}) {
  const meta = getPhoneMeta(phoneCountry);
  return (
    <Field name="phone" label="Phone number" required full touched={touched} valid={valid} message={message}>
      <div className="phone-row">
        <select className="mono" value={phoneCountry} onChange={(e) => onCountryChange(e.target.value)}>
          {PHONE_CODES.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
        <input
          type="text"
          className="mono"
          inputMode="numeric"
          maxLength={meta ? meta.nsn : 15}
          placeholder={meta ? "Enter " + meta.nsn + "-digit number" : "Enter number"}
          value={phoneNumber}
          onChange={(e) => onNumberChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>
    </Field>
  );
}
