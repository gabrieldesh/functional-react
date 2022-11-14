import React from "react";

export type Fun<i, o> = (_: i) => o;

export type Callback<o> = (_: o) => void;

export type StreamRunner<o> = (onOutput: Callback<o>) => JSX.Element;

export type Stream<o> = {
  run: StreamRunner<o>;
  map: <newO>(f: Fun<o, newO>) => Stream<newO>;
};

export const stream = <o,>(run: StreamRunner<o>): Stream<o> => ({
  run: run,
  map: function <newO>(this: Stream<o>, f: Fun<o, newO>): Stream<newO> {
    return stream<newO>((onNewOutput: Callback<newO>) =>
      this.run((o: o) => onNewOutput(f(o)))
    );
  },
});

export type Updater<s> = Fun<s, s>;

export type IOStream<s> = Fun<s, Stream<Updater<s>>>;

export type StateContainerProps<s> = {
  initialState: s;
  onStateChange: Callback<s>;
  innerStream: IOStream<s>;
};

export class StateContainer<s extends {}> extends React.Component<
  StateContainerProps<s>,
  s
> {
  constructor(props: StateContainerProps<s>) {
    super(props);
    this.state = props.initialState;
  }

  render = () =>
    this.props
      .innerStream(this.state)
      .run((stateUpdater) =>
        this.setState(stateUpdater, () => this.props.onStateChange(this.state))
      );
}

export const any = <o,>(streams: Array<Stream<o>>): Stream<o> =>
  stream((onOutput) => <>{streams.map((stream) => stream.run(onOutput))}</>);
