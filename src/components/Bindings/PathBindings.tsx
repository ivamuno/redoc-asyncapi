// import { transparentize } from 'polished';
import * as React from 'react';
import { Bindings } from './Bindings';

export interface PathBindingsProps {
  bindings: Record<string, any>;
}

export class PathBindings extends React.PureComponent<PathBindingsProps> {
  render() {
    const amqp = this.props.bindings.amqp;
    if (!amqp) {
      return null;
    }

    let bindings: any[] = [];
    let bindingObject = amqp.is === 'routingKey' ? amqp.exchange : amqp.queue;
    bindings.push({ key: 'is', value: amqp.is === 'routingKey' ? 'exchange' : 'queue' });
    for (const [key, value] of Object.entries(bindingObject)) {
      bindings.push({ key: key, value: value });
    }

    return <Bindings bindingGroupHeader="Protocol" bindingGroupName="AMQP" bindings={bindings} />;
  }
}
