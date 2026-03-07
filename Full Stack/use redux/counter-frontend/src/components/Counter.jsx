import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchCounter,
  incrementCounter,
  decrementCounter,
} from "../features/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCounter());
  }, []);

  return (
    <div>
      {" "}
      <h2>Counter: {count}</h2>{" "}
      <button onClick={() => dispatch(incrementCounter())}> Increment </button>{" "}
      <button onClick={() => dispatch(decrementCounter())}>
        {" "}
        Decrement{" "}
      </button>{" "}
    </div>
  );
}
export default Counter;
