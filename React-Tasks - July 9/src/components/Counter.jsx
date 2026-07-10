import { useState } from "react";

function Counter() {

  // State variable
  const [count, setCount] = useState(0);


  // Increment
  const increment = () => {
    setCount(count + 1);
  };


  // Decrement
  const decrement = () => {

    if (count > 0) {
      setCount(count - 1);
    }

  };


  // Reset
  const reset = () => {
    setCount(0);
  };


  return (
    <div>

      <h1>Counter App</h1>

      <h2>Count: {count}</h2>


      <button onClick={increment}>
        Increment
      </button>


      <button onClick={decrement}>
        Decrement
      </button>


      <button onClick={reset}>
        Reset
      </button>


    </div>
  );
}

export default Counter;