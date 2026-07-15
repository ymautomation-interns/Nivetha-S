// Used only if the live API calls (see src/utils/api.js) fail —
// keeps the form usable offline / if a network request is blocked.
export const GENDERS_FALLBACK = ["Male", "Female", "Other"];
export const BLOOD_GROUPS_FALLBACK = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const COUNTRIES_FALLBACK = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
];

export const PHONE_CODES = [
  { name: "India", code: "+91", iso: "IN", nsn: 10 },
  { name: "United States", code: "+1", iso: "US", nsn: 10 },
  { name: "United Kingdom", code: "+44", iso: "GB", nsn: 10 },
  { name: "Australia", code: "+61", iso: "AU", nsn: 9 },
  { name: "Germany", code: "+49", iso: "DE", nsn: 10 },
  { name: "Canada", code: "+1", iso: "CA", nsn: 10 },
  { name: "China", code: "+86", iso: "CN", nsn: 11 },
  { name: "Japan", code: "+81", iso: "JP", nsn: 10 },
  { name: "France", code: "+33", iso: "FR", nsn: 9 },
  { name: "Brazil", code: "+55", iso: "BR", nsn: 11 },
  { name: "Nigeria", code: "+234", iso: "NG", nsn: 10 },
  { name: "South Africa", code: "+27", iso: "ZA", nsn: 9 },
  { name: "Mexico", code: "+52", iso: "MX", nsn: 10 },
  { name: "Russia", code: "+7", iso: "RU", nsn: 10 },
];

export const STATES = {
  IN: [
    { code: "TN", name: "Tamil Nadu" },
    { code: "KA", name: "Karnataka" },
    { code: "MH", name: "Maharashtra" },
  ],
  US: [
    { code: "CA", name: "California" },
    { code: "TX", name: "Texas" },
  ],
  AU: [
    { code: "NSW", name: "New South Wales" },
    { code: "VIC", name: "Victoria" },
  ],
  DE: [
    { code: "BY", name: "Bavaria" },
    { code: "BE", name: "Berlin" },
  ],
};

export const CITIES = {
  TN: ["Coimbatore", "Chennai", "Madurai"],
  KA: ["Bengaluru", "Mysuru"],
  MH: ["Mumbai", "Pune"],
  CA: ["Los Angeles", "San Francisco"],
  TX: ["Austin", "Houston"],
  NSW: ["Sydney"],
  VIC: ["Melbourne"],
  BY: ["Munich"],
  BE: ["Berlin"],
};

export const PINCODES = {
  Coimbatore: ["641001", "641002", "641004", "641018", "641037"],
  Chennai: ["600001", "600002", "600005", "600020", "600028"],
  Madurai: ["625001", "625002", "625014", "625020"],
  Bengaluru: ["560001", "560002", "560025", "560068", "560095"],
  Mysuru: ["570001", "570005", "570009"],
  Mumbai: ["400001", "400008", "400050", "400070"],
  Pune: ["411001", "411004", "411014", "411038"],
  "Los Angeles": ["90001", "90012", "90028", "90045"],
  "San Francisco": ["94102", "94103", "94110", "94118"],
  Austin: ["73301", "78701", "78704"],
  Houston: ["77001", "77002", "77019"],
  Sydney: ["2000", "2010", "2020"],
  Melbourne: ["3000", "3006", "3121"],
  Munich: ["80331", "80333", "80798"],
  Berlin: ["10115", "10117", "10437"],
};

export const BANKS = [
  { ifsc: "SBIN0001234", bankName: "State Bank of India", branch: "Coimbatore Main" },
  { ifsc: "HDFC0000123", bankName: "HDFC Bank", branch: "Anna Nagar, Chennai" },
  { ifsc: "ICIC0001111", bankName: "ICICI Bank", branch: "MG Road, Bengaluru" },
  { ifsc: "AXIS0002222", bankName: "Axis Bank", branch: "Andheri East, Mumbai" },
  { ifsc: "PUNB0003333", bankName: "Punjab National Bank", branch: "Madurai Central" },
  { ifsc: "KKBK0004444", bankName: "Kotak Mahindra Bank", branch: "RS Puram, Coimbatore" },
  { ifsc: "YESB0005555", bankName: "Yes Bank", branch: "Whitefield, Bengaluru" },
];

export const SECTIONS = [
  { id: "partA", label: "Personal", fields: ["fullName", "dob", "gender", "bloodGroup", "phone"] },
  { id: "partB", label: "Address", fields: ["addr1", "addr2", "country", "state", "city", "pincode"] },
  { id: "partC", label: "Identity", fields: ["gst", "pan", "passport", "license", "voterId", "aadhaar"] },
  { id: "partD", label: "Banking", fields: ["ifsc", "bankAccount", "esi", "pf", "uan", "ptax"] },
];

export const FIELD_ORDER = SECTIONS.flatMap((s) => s.fields);

export const HINTS = {
  fullName: "Letters and spaces only, as printed on your ID.",
  dob: "Must indicate an age between 18 and 60.",
  gender: "Required",
  bloodGroup: "Required",
  phone: "Digit count is checked automatically for the selected country.",
  addr1: "Required",
  addr2: "Optional",
  country: "Required",
  state: "Choose a country first",
  city: "Choose a state first",
  pincode: "Choose a city first",
  gst: "15-character GSTIN — PAN is extracted from this",
  pan: "Auto-filled once GSTIN is complete",
  passport: "Format: A1234567",
  license: "Format: TN0120210001234",
  voterId: "Format: ABC1234567",
  aadhaar: "12 digits, auto-advances between boxes",
  ifsc: "11-character branch code",
  bankAccount: "9 to 18 digits",
  esi: "Exactly 17 digits",
  pf: "10–22 alphanumeric characters",
  uan: "Exactly 12 digits",
  ptax: "5–15 alphanumeric characters",
};

export const INITIAL_FORM_DATA = {
  fullName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  phoneCountry: "IN",
  phoneNumber: "",
  addr1: "",
  addr2: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  gst: "",
  pan: "",
  passport: "",
  license: "",
  voterId: "",
  aadhaar: ["", "", ""],
  ifsc: "",
  bankAccount: "",
  esi: "",
  pf: "",
  uan: "",
  ptax: "",
};
