import * as React from 'react';
import { Bindings } from './Bindings';

export interface PathBindingsProps {
  bindings: Record<string, any>;
}

const normalizeBindingStrategy = {
  ['amqp']: amqpBindings => {
    const bindings: any[] = [];
    const bindingObject =
      amqpBindings.is === 'routingKey' ? amqpBindings.exchange : amqpBindings.queue;
    bindings.push({ key: 'is', value: amqpBindings.is === 'routingKey' ? 'exchange' : 'queue' });
    for (const [key, value] of Object.entries(bindingObject)) {
      bindings.push({ key: key, value: value });
    }

    return bindings;
  },
  ['kafka']: _kafkaBindings => {
    return [];
  },
};

export class PathBindings extends React.PureComponent<PathBindingsProps> {
  render() {
    const protocolsKeys = Object.keys(this.props.bindings);
    if (protocolsKeys.length === 0) {
      return null;
    }

    const protocolKey = protocolsKeys[0];
    const normalizeBinding = normalizeBindingStrategy[protocolKey];
    if (!normalizeBinding) {
      console.log('!normalizeBinding', protocolKey);
      return null;
    }

    const bindings = normalizeBinding(this.props.bindings[protocolKey]);
    return (
      <Bindings
        bindingGroupHeader="Channel Bindings"
        bindingGroupName={protocolKey}
        bindings={bindings}
      />
    );
  }
}
