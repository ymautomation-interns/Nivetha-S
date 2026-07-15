import { useEffect, useState } from "react";
import Field from "./Field.jsx";
import { GENDERS_FALLBACK } from "../data/referenceData.js";
import { fetchGenders } from "../utils/api.js";
export default function GenderField({
  value,
  onChange,
  touched,
  valid,
  message,
}) {
  const [genders, setGenders] = useState(null);
  const [genderListError, setGenderListError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchGenders()
      .then((list) => {
        if (!cancelled) setGenders(list);
      })
      .catch(() => {
        if (!cancelled) {
          setGenderListError(true);
          setGenders(GENDERS_FALLBACK);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Field
      name="gender"
      label="Gender"
      required
      full
      touched={touched}
      valid={valid}
      message={message}
    >
      <select
        id="gender"
        value={value}
        disabled={genders === null}
        onChange={(e) => onChange("gender", e.target.value)}
      >
        <option value="">
          {genders === null ? "Loading from API..." : "Select Gender"}
        </option>

        {(genders || []).map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>

      {genderListError && (
        <p className="api-status error">
          API unavailable — showing offline list
        </p>
      )}
    </Field>
  );
}