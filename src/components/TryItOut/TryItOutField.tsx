import { observer } from 'mobx-react';
import * as React from 'react';

import { TryItOutPropertyDetailsCell, TryItOutPropertyNameCell, TryItOutUnderInput, TryItOutRequiredLabel } from './tryItOut.layout';

import { FieldModel } from '../../services/models';
import { SchemaOptions } from '../Schema/Schema';
import { TryItOutUseForm } from './TryItOutUseForm';

export interface TryItOutFieldProps extends SchemaOptions {
  className?: string;
  field: FieldModel;
  useForm: TryItOutUseForm;
}

@observer
export class TryItOutField extends React.Component<TryItOutFieldProps> {
  render() {
    const { className, field, useForm, } = this.props;
    const { name, deprecated, required, schema } = field;

    const paramName = (
      <TryItOutPropertyNameCell className={deprecated ? 'deprecated' : undefined} title={name}>
        <span>{name}</span>
        {required && <TryItOutRequiredLabel> required </TryItOutRequiredLabel>}
      </TryItOutPropertyNameCell>
    );

    const displayFormat = schema.displayFormat ? `<${schema.displayFormat}>` : '';
    return (
      <>
        <tr className={className}>
          {paramName}
          <TryItOutPropertyDetailsCell>
            <TryItOutUnderInput
              name={name}
              className={useForm?.errors[name] ? 'is-invalid' : ''}
              type={'Text'}
              defaultValue={schema?.default}
              placeholder={`${schema.displayType} ${displayFormat}`}
              ref={useForm.register({ required: field.required })} />
          </TryItOutPropertyDetailsCell>
        </tr>
      </>
    );
  }
}
