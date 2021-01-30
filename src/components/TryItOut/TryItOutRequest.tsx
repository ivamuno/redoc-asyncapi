import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from './TryItOutAuthStorer'
import Modal from 'react-modal';

import { OperationModel } from '../../services';
import { TryItOutParameters } from './TryItOutParameters';
import {
  TryItOutButton,
  TryItOutUnderInput
} from './tryItOut.layout';
import { SecurityScheme } from '../../services/models/SecurityRequirement';
import TryItOutAuthorization from './TryItOutAuthorization';

Modal.setAppElement('redoc');

export interface TryItOutRequestProps {
  operation: OperationModel
}

export default function TryItOutRequest(props: TryItOutRequestProps) {
  const authorizedValue = useAuthState().token;
  const [isAuthorizationOpen, setIsAuthorizationOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    errors
  } = useForm();

  const onSubmit = data => console.log('onSubmit', data);
  const onOpenAuthorization = () => {
    setIsAuthorizationOpen(true);
  };

  const onCloseAuthorization = () => {
    setIsAuthorizationOpen(false);
  };

  const schemes: SecurityScheme[] = props.operation.security?.reduce((current, acc) => [...current, ...acc.schemes], []);
  const hasSchemes = schemes.length > 0;

  return (
    <div style={{ padding: '2px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TryItOutParameters
            servers={props.operation.servers}
            parameters={props.operation.parameters}
            body={props.operation.requestBody}
            useForm={{ register, errors }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TryItOutUnderInput
              style={{ display: 'none' }}
              name={'auth'}
              type={'Text'}
              value={authorizedValue}
              ref={register({ required: true })} />
            {hasSchemes && <TryItOutButton type="button" value={authorizedValue ? 'Authorized' : 'Authorize'}
              className={authorizedValue ? 'is-authorized' : errors['auth'] ? 'is-invalid' : ''}
              onClick={onOpenAuthorization} />}
            <TryItOutButton type="submit" value="Submit" />
          </div>
        </div>
      </form>
      <TryItOutAuthorization operation={props.operation} onCloseAuthorization={onCloseAuthorization} isOpen={isAuthorizationOpen} />
    </div>
  );
}
