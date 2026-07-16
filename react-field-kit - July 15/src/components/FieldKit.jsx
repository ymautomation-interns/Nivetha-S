import { useState } from "react";
import DateRangeField from "./daterange/DateRangeField";
import "../styles/input.css";

/**
 * FieldKit - a single, self-contained field component.
 *
 * type: "text" | "number" | "date" | "daterange" | "textarea" | "remark"
 *
 * Usage:
 * <FieldKit type="text" id="name" label="Name" value={name}
 *   onChange={(e) => setName(e.target.value)} required
 *   blockNumbers />
 *   // blockNumbers: numbers can't be typed, pasted, or dropped in at all
 *
 * <FieldKit type="number" id="account" label="Account number" value={account}
 *   onChange={(e) => setAccount(e.target.value)}
 *   validLengths={[9, 12]} />
 *   // validLengths: shows a tick mark inside the box once the digit
 *   // count matches one of the accepted lengths
 *
 * <FieldKit type="date" id="dob" label="Date of birth" value={dob}
 *   onChange={(e) => setDob(e.target.value)} required max="2026-07-15" />
 *
 * <FieldKit type="daterange" id="validity" label="Account Validity Period"
 *   value={{ start, end }} onChange={(range) => setValidity(range)} />
 *   // a two-calendar start/end date picker
 *
 * <FieldKit type="textarea" id="notes" label="Additional Notes" value={notes}
 *   onChange={(e) => setNotes(e.target.value)} showCounter />
 *   // maxLength is not hardcoded - the person filling the form sets it
 *   // themselves via the "Max characters" box that appears next to the label.
 *
 * <FieldKit type="remark" label="Status" value="Approved" />
 */
function FieldKit({
  type = "text",
  id,
  label,
  value = "",
  onChange,
  placeholder = "",
  required = false,
  helperText = "",
  error: externalError = "",
  maxLength, // optional starting value for the textarea's character limit
  showCounter = false,
  min,
  max,
  rows = 4,
  disabled = false,
  blockNumbers = false, // type="text" only: numbers can't be typed/pasted in
  validLengths, // type="number" only: e.g. [9, 12] shows a tick once value.length matches
}) {
  const [touched, setTouched] = useState(false);
  const [charLimit, setCharLimit] = useState(maxLength ? String(maxLength) : "");

  const fieldId = id || `field-${String(label || type).replace(/\s+/g, "-").toLowerCase()}`;

  // Built-in validation for the date field: required + min/max range.
  let internalError = "";
  if (type === "date" && touched) {
    if (required && !value) {
      internalError = "Please select a date.";
    } else if (value && min && value < min) {
      internalError = `Date can't be before ${min}.`;
    } else if (value && max && value > max) {
      internalError = `Date can't be after ${max}.`;
    }
  }
  if (type === "daterange" && touched && required) {
    if (!value?.start || !value?.end) {
      internalError = "Please select both a start and end date.";
    }
  }
  const charLimitNumber =
    type === "textarea" && charLimit !== "" ? Math.max(0, Number(charLimit) || 0) : null;
  if (type === "textarea" && charLimitNumber && value.length > charLimitNumber) {
    internalError = `You're exceeding the ${charLimitNumber} character limit by ${
      value.length - charLimitNumber
    }.`;
  }

  const error = externalError || internalError;
  const handleBlur = () => setTouched(true);

  // "remark" -> read-only label + value display box (not an editable input)
  if (type === "remark") {
    return (
      <div className="fk-field">
        {label && <div className="fk-label">{label}</div>}
        <div className={"fk-remark" + (!value ? " fk-remark--empty" : "")}>
          {value || placeholder || "—"}
        </div>
        {helperText && <div className="fk-helper">{helperText}</div>}
      </div>
    );
  }

  // "daterange" -> two-calendar start/end date picker
  if (type === "daterange") {
    return (
      <div className="fk-field">
        {label && (
          <label htmlFor={fieldId} className="fk-label">
            {label}
            {required && <span className="fk-required"> *</span>}
          </label>
        )}

        <DateRangeField
          id={fieldId}
          value={value}
          onChange={(next) => {
            setTouched(true);
            onChange(next);
          }}
          error={error}
          disabled={disabled}
        />

        {helperText && !error && <div className="fk-helper">{helperText}</div>}
        {error && <div className="fk-error">{error}</div>}
      </div>
    );
  }

  const isValidLength =
    type === "number" && Array.isArray(validLengths) && validLengths.includes(String(value).length);

  // Strip digits out as they're typed/pasted, so a number can never
  // end up inside a blockNumbers field in the first place.
  const handleChange = (e) => {
    if (blockNumbers && type === "text") {
      const cleaned = e.target.value.replace(/[0-9]/g, "");
      if (cleaned !== e.target.value) {
        e.target.value = cleaned;
      }
    }
    onChange(e);
  };

  const handleKeyDown = (e) => {
    if (blockNumbers && type === "text" && /^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="fk-field">
      {(label || (type === "textarea" && showCounter)) && (
        <div className="fk-field__top">
          {label && (
            <label htmlFor={fieldId} className="fk-label fk-label--inline">
              {label}
              {required && <span className="fk-required"> *</span>}
            </label>
          )}

          {type === "textarea" && showCounter && (
            <label className="fk-counter-toggle">
              Max characters
              <input
                type="number"
                min="0"
                value={charLimit}
                placeholder="No limit"
                onChange={(e) => setCharLimit(e.target.value)}
              />
            </label>
          )}
        </div>
      )}

      {type === "textarea" ? (
        <>
          <textarea
            id={fieldId}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={"fk-textarea" + (error ? " fk-textarea--error" : "")}
          />
          {showCounter && (
            <div className={"fk-counter" + (charLimitNumber && value.length > charLimitNumber ? " fk-counter--limit" : "")}>
              {value.length}
              {charLimitNumber ? ` / ${charLimitNumber} characters` : " characters"}
            </div>
          )}
        </>
      ) : (
        <div className="fk-input-wrap">
          <input
            id={fieldId}
            type={type}
            inputMode={type === "number" ? "numeric" : undefined}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={type === "number" || type === "date" ? min : undefined}
            max={type === "number" || type === "date" ? max : undefined}
            disabled={disabled}
            onWheel={type === "number" ? (e) => e.target.blur() : undefined}
            className={
              "fk-input" +
              (error ? " fk-input--error" : "") +
              (isValidLength ? " fk-input--with-tick" : "")
            }
          />
          {isValidLength && (
            <svg className="fk-input-tick" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="10" fill="currentColor" />
              <path d="M5.5 10.2 8.4 13l6-6.2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}

      {helperText && !error && <div className="fk-helper">{helperText}</div>}
      {error && <div className="fk-error">{error}</div>}

      {type === "number" && (
        <style>{`
          #${fieldId}::-webkit-outer-spin-button,
          #${fieldId}::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `}</style>
      )}
    </div>
  );
}

export default FieldKit;
