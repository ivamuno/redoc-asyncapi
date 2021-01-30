import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthDispatch, TryItOutAuthReducerEnum } from './TryItOutAuthStorer'
import Modal from 'react-modal';

import { OperationModel } from '../../services';
import {
  TryItOutButton,
  TryItOutPropertiesTable,
  TryItOutPropertyDetailsCell,
  TryItOutPropertyNameCell,
  TryItOutRequiredLabel,
  TryItOutUnderInput,
  TryItOutUnderlinedHeader
} from './tryItOut.layout';
import { RightPanelHeader } from '../../common-elements';
import { SecurityScheme } from '../../services/models/SecurityRequirement';

Modal.setAppElement('redoc');

export interface TryItOutAuthorizationProps {
  operation: OperationModel;
  isOpen: boolean;
  onCloseAuthorization: () => void;
}

export default function TryItOutAuthorization(props: TryItOutAuthorizationProps) {
  const dispatch = useAuthDispatch();
  const { register: registerAuth, handleSubmit: handleSubmitAuth, errors: errorsAuth } = useForm();
  const onSubmitAuth = data => {
    dispatch({ type: TryItOutAuthReducerEnum.Change, token: data.api_key });
    props.onCloseAuthorization();
  };
  const onCloseAuthorization = () => { props.onCloseAuthorization(); };

  const schemes: SecurityScheme[] = props.operation.security?.reduce((current, acc) => [...current, ...acc.schemes], []);
  const isSchemeSupported = (s: SecurityScheme) => { return s.type === 'apiKey'; };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={onCloseAuthorization}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 9999
        },
        content: {
          position: 'absolute',
          inset: '50% auto auto 50%',
          width: '100%',
          minWidth: '300px',
          maxWidth: '650px',
          transform: 'translate(-50%,-50%)',
          border: '1px solid #ccc',
          padding: '0px',
          color: 'white',
          background: '#11171a',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none'
        }
      }}
    >
      <RightPanelHeader style={{ margin: '0px', padding: '10px', borderBottom: '1px solid #ebebeb' }}> Available authorizations </RightPanelHeader>
      {schemes.map(scheme => (
        <div key={scheme.name || scheme.id} style={{ padding: '10px 20px', borderBottom: '1px solid #ebebeb' }}>
          <div>
            <TryItOutUnderlinedHeader>{scheme.name || scheme.id}</TryItOutUnderlinedHeader>
            <div style={{ padding: '10px 0px' }}>
              <form onSubmit={handleSubmitAuth(onSubmitAuth)}>
                {isSchemeSupported(scheme) ? (
                  <div>
                    <TryItOutPropertiesTable>
                      <tbody>
                        <tr key={scheme.id}>
                          <TryItOutPropertyNameCell title={scheme.id}>
                            <span>{'value'}</span>
                            {<TryItOutRequiredLabel> required </TryItOutRequiredLabel>}
                          </TryItOutPropertyNameCell>
                          <TryItOutPropertyDetailsCell>
                            <TryItOutUnderInput
                              name={scheme.id}
                              className={errorsAuth[scheme.id] ? 'is-invalid' : ''}
                              type={'Text'}
                              ref={registerAuth({ required: true })} />
                          </TryItOutPropertyDetailsCell>
                        </tr>
                      </tbody>
                    </TryItOutPropertiesTable>
                  </div>
                ) : (
                    <span>NOT SUPPORTED</span>
                  )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {schemes.find(s => isSchemeSupported(s)) && <TryItOutButton type="submit" value='Authorize' />}
                  <TryItOutButton type="button" value="Close" onClick={onCloseAuthorization} />
                </div>
              </form>
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
}
