import * as React from 'react';

export interface TryItOutResponseProps {
  data: any;
}

export interface TryItOutResponseState {
  data: any;
}

export class TryItOutResponse extends React.PureComponent<TryItOutResponseProps, TryItOutResponseState> {
  state = {
    data: ''
  };

  render() {
    return (<div>
      <span>{this.props.data}</span>
    </div>);
  }
}
