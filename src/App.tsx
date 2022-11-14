import React from "react";
import { StateContainer } from "./Streams";
import { initialCountersState, counters } from "./Counters";

function App() {
  return (
    <StateContainer
      initialState={initialCountersState}
      onStateChange={console.log}
      innerStream={counters}
    />
  );
}

export default App;
