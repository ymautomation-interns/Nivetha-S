import { useState } from "react";
import "./styles/form.css";

import Masthead from "./components/Masthead.jsx";
import ProgressRail from "./components/ProgressRail.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import SuccessPanel from "./components/SuccessPanel.jsx";
import FormFooter from "./components/FormFooter.jsx";
import PersonalDetailsSection from "./components/PersonalDetailsSection.jsx";
import AddressSection from "./components/AddressSection.jsx";
import IdentitySection from "./components/IdentitySection.jsx";
import BankingSection from "./components/BankingSection.jsx";

import { FIELD_ORDER, INITIAL_FORM_DATA } from "./data/referenceData.js";
import { validateAll, extractPANFromGST, getPhoneMeta } from "./utils/validators.js";

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const results = validateAll(formData);
  const verifiedCount = FIELD_ORDER.filter((f) => results[f][0]).length;
  const allValid = verifiedCount === FIELD_ORDER.length;
  const invalidCount = FIELD_ORDER.length - verifiedCount;

  // Generic field updater, with the side effects the original form had
  // (GSTIN -> PAN extraction, phone digit trimming, code uppercasing, etc.)
  function handleChange(name, rawValue) {
    setFormData((prev) => {
      const next = { ...prev };

      switch (name) {
        case "gst": {
          const v = rawValue.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 15);
          next.gst = v;
          const extracted = extractPANFromGST(v);
          next.pan = extracted || prev.pan;
          break;
        }
        case "pan":
        case "passport":
        case "license":
        case "voterId":
        case "ptax":
        case "pf": {
          next[name] = rawValue.toUpperCase();
          break;
        }
        case "ifsc": {
          next.ifsc = rawValue.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 11);
          break;
        }
        case "bankAccount": {
          next.bankAccount = rawValue.replace(/\D/g, "").slice(0, 18);
          break;
        }
        case "esi": {
          next.esi = rawValue.replace(/\D/g, "").slice(0, 17);
          break;
        }
        case "uan": {
          next.uan = rawValue.replace(/\D/g, "").slice(0, 12);
          break;
        }
        case "phoneNumber": {
          const meta = getPhoneMeta(prev.phoneCountry);
          next.phoneNumber = rawValue.replace(/\D/g, "").slice(0, meta ? meta.nsn : 15);
          break;
        }
        case "phoneCountry": {
          // Switching country resets the number box entirely so a partially
          // typed number for one country's format can never leak into another's.
          next.phoneCountry = rawValue;
          next.phoneNumber = "";
          break;
        }
        case "country": {
          next.country = rawValue;
          next.state = "";
          next.city = "";
          next.pincode = "";
          break;
        }
        case "state": {
          next.state = rawValue;
          next.city = "";
          next.pincode = "";
          break;
        }
        case "city": {
          next.city = rawValue;
          next.pincode = "";
          break;
        }
        default: {
          next[name] = rawValue;
        }
      }

      return next;
    });

    // cascading selects get touched immediately for quicker feedback
    if (["country", "state", "city", "pincode", "bloodGroup"].includes(name)) {
      markTouched(name);
    }

    // switching phone country clears the stale validity state of the old number
    if (name === "phoneCountry") {
      setTouched((prev) => ({ ...prev, phone: false }));
    }
  }

  function markTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleBlur(name) {
    markTouched(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitAttempted(true);
    const allTouched = {};
    FIELD_ORDER.forEach((f) => (allTouched[f] = true));
    setTouched(allTouched);

    if (allValid) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
      const firstInvalid = FIELD_ORDER.find((f) => !results[f][0]);
      const el = firstInvalid && document.querySelector('[data-field="' + firstInvalid + '"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector("input,select");
        if (input) input.focus();
      }
    }
  }

  function handleReset() {
    setFormData(INITIAL_FORM_DATA);
    setTouched({});
    setSubmitAttempted(false);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="eo-form">
      <div className="sheet">
        <Masthead complete={allValid} />
        <ProgressRail results={results} />

        <form className="body-wrap" onSubmit={handleSubmit}>
          {submitAttempted && !allValid && <ErrorBanner invalidCount={invalidCount} />}

          <PersonalDetailsSection formData={formData} touched={touched} results={results} onChange={handleChange} onBlur={handleBlur} />
          <AddressSection formData={formData} touched={touched} results={results} onChange={handleChange} onBlur={handleBlur} />
          <IdentitySection formData={formData} touched={touched} results={results} onChange={handleChange} onBlur={handleBlur} />
          <BankingSection formData={formData} touched={touched} results={results} onChange={handleChange} onBlur={handleBlur} />

          <SuccessPanel show={submitted} totalFields={FIELD_ORDER.length} />

          <FormFooter
            verifiedCount={verifiedCount}
            totalFields={FIELD_ORDER.length}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
