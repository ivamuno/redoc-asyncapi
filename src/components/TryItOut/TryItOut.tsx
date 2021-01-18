import * as React from 'react';
import { OperationModel } from '../../services';
import { TryItOutParameters } from '..';

export interface TryItOutProps {
  operation: OperationModel
}

export class TryItOut extends React.PureComponent<TryItOutProps> {

  render() {
    return (
      <div>
        <span>{this.props.operation.parameters.join(',')}</span>
        <TryItOutParameters parameters={this.props.operation.parameters} />
      </div>
    );
  }
}
