import { PHONE_CODES, BANKS, FIELD_ORDER } from "../data/referenceData.js";

export function ageFromDOB(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  const t = new Date();
  let age = t.getFullYear() - d.getFullYear();
  const m = t.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < d.getDate())) age--;
  return age;
}

export function extractPANFromGST(gstValue) {
  if (gstValue.length < 12) return "";
  return gstValue.slice(2, 12);
}

export function getPhoneMeta(iso) {
  return PHONE_CODES.find((p) => p.iso === iso) || null;
}

export function findBankByIFSC(ifsc) {
  return BANKS.find((b) => b.ifsc === ifsc) || null;
}

/* Each rule is a pure function: (formData) => [isValid, message] */
export const RULES = {
  fullName: (d) => {
    const v = d.fullName.trim();
    if (!v) return [false, "Full name is required"];
    if (!/^[A-Za-z][A-Za-z .'-]{2,49}$/.test(v)) return [false, "Letters and spaces only, at least 3 characters"];
    return [true, "Looks good"];
  },
  dob: (d) => {
    if (!d.dob) return [false, "Date of birth is required"];
    const age = ageFromDOB(d.dob);
    if (age === null) return [false, "Enter a valid date"];
    if (age < 18 || age > 60) return [false, "Age must be between 18 and 60 years"];
    return [true, "Age " + age + " — eligible"];
  },
  gender: (d) => (d.gender ? [true, "Selected: " + d.gender] : [false, "Select a gender"]),
  bloodGroup: (d) => (d.bloodGroup ? [true, "Selected"] : [false, "Select a blood group"]),
  phone: (d) => {
    const c = getPhoneMeta(d.phoneCountry);
    if (!c) return [false, "Select a country"];
    if (!d.phoneNumber) return [false, "Enter a " + c.nsn + "-digit " + c.name + " number"];
    if (d.phoneNumber.length !== c.nsn)
      return [false, c.name + " numbers need " + c.nsn + " digits — this has " + d.phoneNumber.length];
    return [true, "Valid " + c.code + " number"];
  },
  addr1: (d) => {
    const v = d.addr1.trim();
    if (!v) return [false, "Address line 1 is required"];
    if (v.length < 5) return [false, "Enter a fuller address"];
    return [true, "Looks good"];
  },
  addr2: (d) => [true, d.addr2.trim() ? "Looks good" : "Optional"],
  country: (d) => (d.country ? [true, "Selected"] : [false, "Select a country"]),
  state: (d) => (d.state ? [true, "Selected"] : [false, "Select a state"]),
  city: (d) => (d.city ? [true, "Selected"] : [false, "Select a city"]),
  pincode: (d) => (d.pincode ? [true, "Selected"] : [false, "Select a pincode"]),
  pan: (d) => {
    const v = d.pan.toUpperCase();
    if (!v) return [false, "PAN is required"];
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v)) return [false, "Format: ABCDE1234F"];
    return [true, "Valid PAN format"];
  },
  gst: (d) => {
    const v = d.gst.toUpperCase();
    if (!v) return [false, "GSTIN is required"];
    if (v.length < 15) return [false, "Incomplete — GSTIN is 15 characters"];
    if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(v)) return [false, "Invalid GSTIN format"];
    return [true, "Valid GSTIN format"];
  },
  passport: (d) => {
    const v = d.passport.toUpperCase();
    if (!v) return [false, "Passport number is required"];
    if (!/^[A-Z][0-9]{7}$/.test(v)) return [false, "Format: A1234567"];
    return [true, "Valid format"];
  },
  license: (d) => {
    const v = d.license.toUpperCase();
    if (!v) return [false, "Driving license number is required"];
    if (!/^[A-Z]{2}[0-9]{13}$/.test(v)) return [false, "Format: TN0120210001234"];
    return [true, "Valid format"];
  },
  voterId: (d) => {
    const v = d.voterId.toUpperCase();
    if (!v) return [false, "Voter ID is required"];
    if (!/^[A-Z]{3}[0-9]{7}$/.test(v)) return [false, "Format: ABC1234567"];
    return [true, "Valid EPIC format"];
  },
  aadhaar: (d) => {
    const v = d.aadhaar.join("");
    if (!v) return [false, "Aadhaar number is required"];
    if (v.length !== 12) return [false, v.length + " of 12 digits entered"];
    return [true, "Valid length"];
  },
  ifsc: (d) => {
    const v = d.ifsc;
    if (!v) return [false, "IFSC code is required"];
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v)) return [false, "Invalid IFSC format"];
    return [true, findBankByIFSC(v) ? "Match found — bank details filled in" : "Valid format, no local record"];
  },
  bankAccount: (d) => {
    const v = d.bankAccount;
    if (!v) return [false, "Bank account number is required"];
    if (v.length < 9 || v.length > 18) return [false, "Must be 9 to 18 digits"];
    return [true, "Looks good"];
  },
  esi: (d) => {
    const v = d.esi;
    if (!v) return [false, "ESI number is required"];
    if (!/^[0-9]{17}$/.test(v)) return [false, "ESI number must be exactly 17 digits"];
    return [true, "Valid ESI number"];
  },
  pf: (d) => {
    const v = d.pf.toUpperCase();
    if (!v) return [false, "PF number is required"];
    if (!/^[A-Z0-9]{10,22}$/.test(v)) return [false, "10–22 characters, letters and digits only"];
    return [true, "Valid PF number"];
  },
  uan: (d) => {
    const v = d.uan;
    if (!v) return [false, "UAN is required"];
    if (!/^[0-9]{12}$/.test(v)) return [false, "UAN must be exactly 12 digits"];
    return [true, "Valid UAN"];
  },
  ptax: (d) => {
    const v = d.ptax.toUpperCase();
    if (!v) return [false, "Professional tax number is required"];
    if (!/^[A-Z0-9]{5,15}$/.test(v)) return [false, "5–15 characters, letters and digits only"];
    return [true, "Looks valid"];
  },
};

export function validateField(name, formData) {
  return RULES[name](formData);
}

export function validateAll(formData) {
  const results = {};
  FIELD_ORDER.forEach((name) => {
    results[name] = validateField(name, formData);
  });
  return results;
}
