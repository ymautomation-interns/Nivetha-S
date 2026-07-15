import { useRef } from "react";
import Field from "./Field.jsx";

export default function AadhaarField({ value, onChange, onBlur, touched, valid, message }) {
  const refs = [useRef(null), useRef(null), useRef(null)];

  function handleBoxChange(idx, raw) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    const next = value.slice();
    next[idx] = digits;
    onChange(next);
    if (digits.length === 4 && refs[idx + 1] && refs[idx + 1].current) {
      refs[idx + 1].current.focus();
    }
  }

  function handleKeyDown(idx, e) {
    if (e.key === "Backspace" && value[idx] === "" && refs[idx - 1] && refs[idx - 1].current) {
      refs[idx - 1].current.focus();
    }
  }

  return (
    <Field name="aadhaar" label="Aadhaar number" required touched={touched} valid={valid} message={message}>
      <div className="aadhaar-row">
        {[0, 1, 2].map((idx) => {
          const boxTouched = touched && value[idx].length > 0;
          const boxValid = value[idx].length === 4;
          const boxClass =
            "mono" + (boxTouched ? (boxValid ? " box-valid" : " box-error") : "");
          return (
            <span key={idx} style={{ display: "contents" }}>
              <input
                ref={refs[idx]}
                type="text"
                className={boxClass}
                maxLength={4}
                inputMode="numeric"
                placeholder={idx === 0 ? "1234" : idx === 1 ? "5678" : "9012"}
                value={value[idx]}
                onChange={(e) => handleBoxChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onBlur={onBlur}
              />
              {idx < 2 && <span>—</span>}
            </span>
          );
        })}
      </div>
    </Field>
  );
}
