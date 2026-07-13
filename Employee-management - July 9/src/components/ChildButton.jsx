import { memo } from "react";

const ChildButton = memo(({ onClick }) => {
  console.log("Child Rendered");

  return (
    <button onClick={onClick}>
      Child Button
    </button>
  );
});

export default ChildButton;