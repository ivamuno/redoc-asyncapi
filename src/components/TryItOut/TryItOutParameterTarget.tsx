import * as React from 'react';
import { OpenAPIServer } from '../../types';
import {
  TryItOutPropertiesTable,
  TryItOutPropertyDetailsCell,
  TryItOutPropertyNameCell,
  TryItOutRequiredLabel,
  TryItOutUnderlinedHeader,
  TryItOutUnderSelect
} from './tryItOut.layout';
import { TryItOutUseForm } from './TryItOutUseForm';

export interface TryItOutParameterTargetProps {
  servers: OpenAPIServer[];
  className?: string;
  useForm: TryItOutUseForm;
}

export class TryItOutParameterTarget extends React.PureComponent<TryItOutParameterTargetProps> {
  render() {
    const { servers, className, useForm } = this.props;
    const name = 'url';

    return (
      <>
        <TryItOutUnderlinedHeader>Target</TryItOutUnderlinedHeader>
        <TryItOutPropertiesTable>
          <tbody>
            <tr key={name} className={className}>
              <TryItOutPropertyNameCell title={name}>
                <span>{name}</span>
                {<TryItOutRequiredLabel> required </TryItOutRequiredLabel>}
              </TryItOutPropertyNameCell>
              <TryItOutPropertyDetailsCell>
                <TryItOutUnderSelect
                  ref={useForm.register({ required: true })}
                  name={name}
                  className={useForm?.errors[name] ? 'is-invalid' : ''}>
                  {servers.map(s => (<option key={s.url} value={s.url}>{`${s.url} - ${s.description}`}</option>))}
                </TryItOutUnderSelect>
              </TryItOutPropertyDetailsCell>
            </tr>
          </tbody>
        </TryItOutPropertiesTable>
      </>
    );
  }
}
