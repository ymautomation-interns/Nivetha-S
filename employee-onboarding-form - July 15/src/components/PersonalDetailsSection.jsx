import { useEffect, useState } from "react";
import TextField from "./TextField.jsx";
import SelectField from "./SelectField.jsx";
import GenderField from "./GenderField.jsx";
import PhoneField from "./PhoneField.jsx";
import { BLOOD_GROUPS_FALLBACK, HINTS } from "../data/referenceData.js";
import { fetchBloodGroups } from "../utils/api.js";

function todayMinus(years) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().slice(0, 10);
}

export default function PersonalDetailsSection({ formData, touched, results, onChange, onBlur }) {
  const [bloodGroups, setBloodGroups] = useState(null); // null = loading
  const [bloodGroupError, setBloodGroupError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBloodGroups()
      .then((list) => {
        if (!cancelled) setBloodGroups(list);
      })
      .catch(() => {
        if (!cancelled) {
          setBloodGroupError(true);
          setBloodGroups(BLOOD_GROUPS_FALLBACK);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="part" id="partA">
      <div className="part-head">
        <h2 className="part-title">Personal details</h2>
      </div>
      <p className="part-note">As per your official identification.</p>
      <div className="grid">
        <TextField
          name="fullName"
          label="Full name"
          required
          full
          placeholder="e.g. Priya Ramanathan"
          value={formData.fullName}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.fullName}
          valid={results.fullName[0]}
          message={touched.fullName ? results.fullName[1] : HINTS.fullName}
        />
        <TextField
          name="dob"
          label="Date of birth"
          type="date"
          required
          min={todayMinus(60)}
          max={todayMinus(18)}
          value={formData.dob}
          onChange={onChange}
          onBlur={onBlur}
          touched={!!touched.dob}
          valid={results.dob[0]}
          message={touched.dob ? results.dob[1] : HINTS.dob}
        />
        <SelectField
          name="bloodGroup"
          label="Blood group"
          required
          placeholder={bloodGroups === null ? "Loading from API…" : "Select blood group"}
          disabled={bloodGroups === null}
          value={formData.bloodGroup}
          options={(bloodGroups || []).map((g) => ({ value: g, label: g }))}
          onChange={(name, v) => onChange(name, v)}
          touched={!!touched.bloodGroup}
          valid={results.bloodGroup[0]}
          message={
            touched.bloodGroup
              ? results.bloodGroup[1]
              : bloodGroupError
              ? "API unavailable — showing offline list"
              : bloodGroups === null
              ? "Fetching blood group list from API…"
              : HINTS.bloodGroup
          }
        />
        <GenderField
          value={formData.gender}
          fullName={formData.fullName}
          onChange={onChange}
          touched={!!touched.gender}
          valid={results.gender[0]}
          message={touched.gender ? results.gender[1] : HINTS.gender}
        />
        <PhoneField
          phoneCountry={formData.phoneCountry}
          phoneNumber={formData.phoneNumber}
          onCountryChange={(v) => onChange("phoneCountry", v)}
          onNumberChange={(v) => onChange("phoneNumber", v)}
          onBlur={() => onBlur("phone")}
          touched={!!touched.phone}
          valid={results.phone[0]}
          message={touched.phone ? results.phone[1] : HINTS.phone}
        />
      </div>
    </section>
  );
}
