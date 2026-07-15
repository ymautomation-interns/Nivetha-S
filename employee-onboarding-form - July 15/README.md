# Employee Onboarding Form

A React (Vite) rebuild of the Employee Onboarding personnel-file form, split into
one component/module per file.

## Project structure

```
employee-onboarding-form/
├── index.html                       # Vite entry HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                     # Mounts <App /> into #root
    ├── App.jsx                      # Root component — owns state & handlers
    ├── data/
    │   └── referenceData.js         # COUNTRIES, STATES, CITIES, BANKS, HINTS, etc.
    ├── utils/
    │   └── validators.js            # RULES (per-field validators) + helper functions
    ├── styles/
    │   └── form.css                 # All styling, scoped under .eo-form
    └── components/
        ├── Field.jsx                 # Shared label/hint/error wrapper
        ├── TextField.jsx
        ├── SelectField.jsx
        ├── GenderField.jsx
        ├── PhoneField.jsx
        ├── AadhaarField.jsx
        ├── IfscField.jsx
        ├── PersonalDetailsSection.jsx
        ├── AddressSection.jsx
        ├── IdentitySection.jsx
        ├── BankingSection.jsx
        ├── Masthead.jsx
        ├── ProgressRail.jsx
        ├── ErrorBanner.jsx
        ├── SuccessPanel.jsx
        └── FormFooter.jsx
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## How it fits together

- **`App.jsx`** holds all form state (`formData`, `touched`, `submitted`) and the
  handler functions: `handleChange`, `handleBlur`, `handleSubmit`, `handleReset`.
  These are passed down as props to the section components.
- **`data/referenceData.js`** has no logic — just the lookup tables and constants
  (countries, states/cities/pincodes, banks, section/field definitions, hints).
- **`utils/validators.js`** has no UI — just pure functions. `RULES` is an object
  of one validator per field, each called as `RULES[fieldName](formData)`.
- **`components/`** are presentational + a few local handlers (e.g. Aadhaar
  auto-advance, IFSC lookup) that call back up to `App.jsx` via props.

All original behavior is preserved: GSTIN → PAN auto-extraction, IFSC → bank/branch
autofill, Aadhaar auto-advancing input boxes, cascading country/state/city/pincode
selects, and per-country phone digit validation.
