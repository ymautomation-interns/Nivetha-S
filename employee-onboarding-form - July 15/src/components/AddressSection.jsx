import { useEffect, useState } from "react";
import TextField from "./TextField.jsx";
import SelectField from "./SelectField.jsx";

import {
  COUNTRIES_FALLBACK,
  HINTS,
} from "../data/referenceData.js";

import {
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchPincodes,
} from "../utils/api.js";

export default function AddressSection({
  formData,
  touched,
  results,
  onChange,
  onBlur,
}) {
  const [countries, setCountries] = useState(null);
  const [countryError, setCountryError] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  // Load Countries
  useEffect(() => {
    let cancelled = false;

    fetchCountries()
      .then((list) => {
        if (!cancelled) setCountries(list);
      })
      .catch(() => {
        if (!cancelled) {
          setCountryError(true);
          setCountries(COUNTRIES_FALLBACK);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Load States
  useEffect(() => {
    if (!formData.country || !countries) {
      setStates([]);
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.code === formData.country
    );

    if (!selectedCountry) return;

    fetchStates(selectedCountry.name)
      .then(setStates)
      .catch(() => setStates([]));
  }, [formData.country, countries]);

  // Load Cities
  useEffect(() => {
    if (!formData.country || !formData.state || !countries) {
      setCities([]);
      return;
    }

    const selectedCountry = countries.find(
      (country) => country.code === formData.country
    );

    if (!selectedCountry) return;

    fetchCities(selectedCountry.name, formData.state)
      .then(setCities)
      .catch(() => setCities([]));
  }, [formData.country, formData.state, countries]);

  // Load Pincodes
  useEffect(() => {
    if (!formData.city) {
      setPincodes([]);
      return;
    }

    fetchPincodes(formData.city)
      .then(setPincodes)
      .catch(() => setPincodes([]));
  }, [formData.city]);

  return (
    <section className="part" id="partB">
  <div className="part-head">
    <h2 className="part-title">Residential address</h2>
  </div>

  <p className="part-note">
    Country, state, city and pincode are loaded dynamically using free APIs.
  </p>

  <div className="grid">

    <TextField
      name="addr1"
      label="Address line 1"
      required
      full
      placeholder="Flat / House No., Street"
      value={formData.addr1}
      onChange={onChange}
      onBlur={onBlur}
      touched={!!touched.addr1}
      valid={results.addr1[0]}
      message={touched.addr1 ? results.addr1[1] : HINTS.addr1}
    />

    <TextField
      name="addr2"
      label="Address line 2"
      optional
      full
      placeholder="Landmark / Area"
      value={formData.addr2}
      onChange={onChange}
      onBlur={onBlur}
      touched={!!touched.addr2}
      valid={results.addr2[0]}
      message={HINTS.addr2}
    />

    <SelectField
      name="country"
      label="Country"
      required
      placeholder={countries ? "Select Country" : "Loading Countries..."}
      value={formData.country}
      disabled={!countries}
      options={(countries || []).map((country) => ({
        value: country.code,
        label: country.name,
      }))}
      onChange={onChange}
      touched={!!touched.country}
      valid={results.country[0]}
      message={
        touched.country
          ? results.country[1]
          : countryError
          ? "API unavailable. Using offline list."
          : HINTS.country
      }
    />

    <SelectField
      name="state"
      label="State"
      required
      placeholder="Select State"
      value={formData.state}
      options={states.map((state) => ({
        value: state.name,
        label: state.name,
      }))}
      disabled={!formData.country}
      onChange={onChange}
      touched={!!touched.state}
      valid={results.state[0]}
      message={
        touched.state
          ? results.state[1]
          : formData.country
          ? HINTS.state
          : "Choose a country first"
      }
    />

    <SelectField
      name="city"
      label="City"
      required
      placeholder="Select City"
      value={formData.city}
      options={cities.map((city) => ({
        value: city,
        label: city,
      }))}
      disabled={!formData.state}
      onChange={onChange}
      touched={!!touched.city}
      valid={results.city[0]}
      message={
        touched.city
          ? results.city[1]
          : formData.state
          ? HINTS.city
          : "Choose a state first"
      }
    />

    <SelectField
      name="pincode"
      label="Pincode"
      required
      mono
      placeholder="Select Pincode"
      value={formData.pincode}
      options={pincodes.map((pin) => ({
        value: pin,
        label: pin,
      }))}
      disabled={!formData.city}
      onChange={onChange}
      touched={!!touched.pincode}
      valid={results.pincode[0]}
      message={
        touched.pincode
          ? results.pincode[1]
          : formData.city
          ? HINTS.pincode
          : "Choose a city first"
      }
    />

  </div>
</section>
  );
}
