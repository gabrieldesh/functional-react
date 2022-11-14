import React from "react";
import { IOStream, stream, Updater } from "./Streams";

export type CounterState = { count: number };

export const initialCounterState: CounterState = { count: 0 };

const counterStateUpdaters = {
  count:
    (_: Updater<number>): Updater<CounterState> =>
    (s0) => ({ ...s0, count: _(s0.count) }),
};

export const counter: IOStream<CounterState> = (state) =>
  stream((onChange) => (
    <button onClick={(_) => onChange(counterStateUpdaters.count((_) => _ + 1))}>
      {state.count} +1
    </button>
  ));
