/**
 * All network calls used by the form live here.
 *
 * APIs Used
 * ----------
 * Gender Prediction : https://api.genderize.io
 * Countries         : https://restcountries.com
 * States            : https://countriesnow.space
 * Cities            : https://countriesnow.space
 * Pincodes          : https://api.postalpincode.in
 * IFSC              : https://ifsc.razorpay.com
 *
 * Blood Group & Gender List
 * -------------------------
 * Currently loaded from local JSON because there is NO free public API
 * that provides only blood groups or gender options.
 */

/* -------------------- Blood Groups -------------------- */

export async function fetchBloodGroups() {
  const res = await fetch("/api/blood-groups.json");

  if (!res.ok) {
    throw new Error("Could not load blood groups");
  }

  const data = await res.json();

  return data.map((item) => item.type);
}

/* -------------------- Gender List -------------------- */

export async function fetchGenders() {
  const res = await fetch("/api/genders.json");

  if (!res.ok) {
    throw new Error("Could not load genders");
  }

  const data = await res.json();

  return data.map((item) => item.label);
}

/* -------------------- Gender Prediction -------------------- */

export async function fetchGenderGuess(name) {
  const first = name.trim().split(/\s+/)[0];

  if (!first || first.length < 2) {
    return null;
  }

  const res = await fetch(
    `https://api.genderize.io/?name=${encodeURIComponent(first)}`
  );

  if (!res.ok) {
    throw new Error("Gender lookup failed");
  }

  const data = await res.json();

  if (!data.gender) {
    return null;
  }

  return {
    gender: data.gender === "male" ? "Male" : "Female",
    probability: Math.round((data.probability || 0) * 100),
  };
}

/* -------------------- Countries -------------------- */

export async function fetchCountries() {
  const res = await fetch(
    "https://countriesnow.space/api/v0.1/countries/positions"
  );

  if (!res.ok) {
    throw new Error("Could not load countries");
  }

  const json = await res.json();

  return json.data
    .map((country) => ({
      code: country.iso2,
      name: country.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
/* -------------------- States -------------------- */

export async function fetchStates(countryName) {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: countryName,
      }),
    }
  );

  const json = await response.json();

  if (!json.error && json.data) {
    return json.data.states.map((state) => ({
      name: state.name,
      code: state.state_code || state.name,
    }));
  }

  return [];
}

/* -------------------- Cities -------------------- */

export async function fetchCities(countryName, stateName) {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/state/cities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: countryName,
        state: stateName,
      }),
    }
  );

  const json = await response.json();

  if (!json.error) {
    return json.data;
  }

  return [];
}

/* -------------------- Pincodes -------------------- */

export async function fetchPincodes(city) {
  const response = await fetch(
    `https://api.postalpincode.in/postoffice/${encodeURIComponent(city)}`
  );

  const json = await response.json();

  if (
    json[0].Status === "Success" &&
    json[0].PostOffice
  ) {
    return [
      ...new Set(
        json[0].PostOffice.map((item) => item.Pincode)
      ),
    ];
  }

  return [];
}
/* -------------------- IFSC -------------------- */

export async function fetchIfscDetails(ifsc) {
  const res = await fetch(
    `https://ifsc.razorpay.com/${encodeURIComponent(ifsc)}`
  );

  if (!res.ok) {
    throw new Error("IFSC code not found");
  }

  return await res.json();
}