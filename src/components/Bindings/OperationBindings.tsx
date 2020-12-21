// import { transparentize } from 'polished';
import * as React from 'react';
import { Bindings } from './Bindings';

export interface OperationBindingsProps {
  bindings: Record<string, any>;
}

export class OperationBindings extends React.PureComponent<OperationBindingsProps> {
  render() {
    const amqp = this.props.bindings.amqp;
    if (!amqp) {
      return null;
    }

    let bindings: any[] = [];
    for (const [key, value] of Object.entries(amqp)) {
      let textValue = value;
      if (key === 'deliveryMode') {
        textValue = value == '1' ? 'transient' : 'persistent';
      }

      bindings.push({ key: key, value: textValue });
    }

    return <Bindings bindingGroupHeader="Properties" bindings={bindings} />;
  }
}
