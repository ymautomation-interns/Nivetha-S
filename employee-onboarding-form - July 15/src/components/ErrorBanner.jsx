export default function ErrorBanner({ invalidCount }) {
  if (invalidCount <= 0) return null;
  return (
    <div className="error-banner show">
      <b>
        {invalidCount} field{invalidCount === 1 ? "" : "s"}
      </b>{" "}
      need your attention before this file can be submitted.
    </div>
  );
}
