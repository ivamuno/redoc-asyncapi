import * as React from 'react';

import { TryItOutUnderlinedHeader, TryItOutPropertiesTable } from './tryItOut.layout';

import { FieldModel } from '../../services/models';
import { TryItOutField } from './TryItOutField';
import { TryItOutUseForm } from './TryItOutUseForm';

export interface TryItOutParametersGroupProps {
  place: string;
  parameters: FieldModel[];
  useForm: TryItOutUseForm;
}

export class TryItOutParametersGroup extends React.PureComponent<TryItOutParametersGroupProps, any> {
  render() {
    const { place, parameters, useForm } = this.props;
    if (!parameters || !parameters.length) {
      return null;
    }

    return (
      <div key={place}>
        <TryItOutUnderlinedHeader>{place} Parameters</TryItOutUnderlinedHeader>
        <TryItOutPropertiesTable>
          <tbody>
            {parameters.map(field => (
              <TryItOutField key={field.name} field={field} useForm={useForm} />
            ))}
          </tbody>
        </TryItOutPropertiesTable>
      </div>
    );
  }
}
