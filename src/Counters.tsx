import { IOStream, Updater, any } from "./Streams";
import { CounterState, initialCounterState, counter } from "./Counter";

export type CountersState = { counter1: CounterState; counter2: CounterState };

export const initialCountersState: CountersState = {
  counter1: initialCounterState,
  counter2: initialCounterState,
};

const validate = (s0: CountersState, s1: CountersState): CountersState =>
  s1.counter1.count === s1.counter2.count - 3 ? s0 : s1;

const countersStateUpdaters = {
  counter1:
    (_: Updater<CounterState>): Updater<CountersState> =>
    (s0) =>
      validate(s0, { ...s0, counter1: _(s0.counter1) }),
  counter2:
    (_: Updater<CounterState>): Updater<CountersState> =>
    (s0) =>
      validate(s0, { ...s0, counter2: _(s0.counter2) }),
};

export const counters: IOStream<CountersState> = (currentState) =>
  any([
    counter(currentState.counter1).map(countersStateUpdaters.counter1),
    counter(currentState.counter2).map(countersStateUpdaters.counter2),
  ]);
