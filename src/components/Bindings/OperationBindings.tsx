import * as React from 'react';
import { Bindings } from './Bindings';

export interface OperationBindingsProps {
  bindings: Record<string, any>;
}

const normalizeBindingStrategy = [
  {
    amqp: amqpBindings => {
      const bindings: any[] = [];
      for (const [key, value] of Object.entries(amqpBindings)) {
        let textValue = value;
        if (key === 'deliveryMode') {
          textValue = value == '1' ? 'transient' : 'persistent';
        }

        bindings.push({ key: key, value: textValue });
        return bindings;
      }
    },
    kafka: kafkaBindings => {
      const bindings: any[] = [];
      for (const [key, value] of Object.entries(kafkaBindings)) {
        bindings.push({ key: key, value: JSON.stringify(value) });
      }

      return bindings;
    },
  },
];

export class OperationBindings extends React.PureComponent<OperationBindingsProps> {
  render() {
    const protocolsKeys = Object.keys(this.props.bindings);
    if (protocolsKeys.length === 0) {
      return null;
    }

    const protocolKey = protocolsKeys[0];
    const normalizeBinding = normalizeBindingStrategy[protocolKey];
    if (!normalizeBinding) {
      return null;
    }

    const binding = normalizeBinding(this.props.bindings[protocolKey]);
    return <Bindings bindingGroupHeader="Operation &amp; Message Bindings" bindings={binding} />;
  }
}
