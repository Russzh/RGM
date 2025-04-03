import React, { Component } from "react";

interface CounterProps {
  initialValue: number | null;
}

interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);

    this.state = {
      count: props.initialValue || 0,
    };
  }

  increment = (): void => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  decrement = (): void => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return React.createElement(
      "div",
      {},
      React.createElement("h1", {}, `Count: ${this.state.count}`),
      React.createElement("button", { onClick: this.decrement }, "Decrement"),
      React.createElement("button", { onClick: this.increment }, "Increment"),
    );
  }
}

export default Counter;
