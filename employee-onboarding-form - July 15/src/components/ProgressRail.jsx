import { SECTIONS } from "../data/referenceData.js";

export default function ProgressRail({ results }) {
  function isSectionComplete(fields) {
    return fields.every((f) => results[f][0]);
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="progress-rail">
      {SECTIONS.map((s) => (
        <div
          key={s.id}
          className={"rail-step" + (isSectionComplete(s.fields) ? " done" : "")}
          onClick={() => scrollToSection(s.id)}
        >
          <span className="seal">✓</span>
          <span className="label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
