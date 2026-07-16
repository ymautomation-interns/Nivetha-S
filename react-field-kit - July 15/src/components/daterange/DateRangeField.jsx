import { useEffect, useRef, useState } from "react";
import Calendar from "./Calendar/Calendar";
import useClickOutside from "../../hooks/useClickOutside";
import { formatDate, isSameDay } from "../../utils/dateUtils";
import "./DateRangeField.css";

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.5" width="14" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8.5H17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 2.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 2.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * DateRangeField — start-date / end-date picker built on top of the
 * reusable Calendar component. Drop-in for FieldKit's type="daterange".
 *
 * value:    { start: Date|null, end: Date|null }
 * onChange: (nextValue) => void   — receives the plain { start, end }
 *           object directly (there's no single native <input> here).
 */
function DateRangeField({
  id,
  value = { start: null, end: null },
  onChange,
  error,
  disabled = false,
}) {
  const { start, end } = value || {};
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setIsOpen(false), isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleSelect = (date) => {
    if (!start || (start && end)) {
      onChange({ start: date, end: null });
      return;
    }
    if (isSameDay(date, start)) {
      onChange({ start, end: date });
      setIsOpen(false);
      return;
    }
    if (date < start) {
      onChange({ start: date, end: start });
    } else {
      onChange({ start, end: date });
    }
    setIsOpen(false);
  };

  let displayValue = "";
  if (start && end) {
    displayValue = `${formatDate(start)}  →  ${formatDate(end)}`;
  } else if (start) {
    displayValue = `${formatDate(start)}  →  ...`;
  }

  return (
    <div className="fk-daterange" ref={wrapperRef}>
      <button
        type="button"
        id={id}
        className={
          "fk-daterange__trigger" +
          (isOpen ? " fk-daterange__trigger--open" : "") +
          (error ? " fk-daterange__trigger--error" : "")
        }
        onClick={() => !disabled && setIsOpen((open) => !open)}
        disabled={disabled}
      >
        <span className="fk-daterange__icon">
          <CalendarIcon />
        </span>
        <span
          className={
            "fk-daterange__text" +
            (!displayValue ? " fk-daterange__text--placeholder" : "")
          }
        >
          {displayValue || "Select start & end date"}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fk-daterange__backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="fk-daterange__popup">
            <div className="fk-daterange__row">
              <div className="fk-daterange__col">
                <span className="fk-daterange__col-label">Start Date</span>
                <Calendar
                  rangeStart={start}
                  rangeEnd={end}
                  minDate={start && !end ? start : null}
                  onSelectDate={handleSelect}
                />
              </div>
              <div className="fk-daterange__divider" aria-hidden="true" />
              <div className="fk-daterange__col">
                <span className="fk-daterange__col-label">End Date</span>
                <Calendar
                  rangeStart={start}
                  rangeEnd={end}
                  minDate={start && !end ? start : null}
                  onSelectDate={handleSelect}
                  initialMonthOffset={1}
                />
              </div>
            </div>

            <div className="fk-daterange__footer">
              <span className="fk-daterange__hint">
                {start && !end ? "Now pick the end date" : "Pick a start date"}
              </span>
              {start && end && (
                <button
                  type="button"
                  className="fk-daterange__done"
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DateRangeField;
