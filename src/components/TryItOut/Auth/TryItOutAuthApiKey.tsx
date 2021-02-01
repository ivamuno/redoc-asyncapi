import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthDispatch, TryItOutAuthReducerEnum, TryItOutAuthStorerApiKeyItemValue } from './TryItOutAuthStorer'
import Modal from 'react-modal';

import {
  TryItOutButton,
  TryItOutPropertiesTable,
  TryItOutPropertyDetailsCell,
  TryItOutPropertyNameCell,
  TryItOutRequiredLabel,
  TryItOutUnderInput,
  TryItOutUnderlinedHeader
} from '../tryItOut.layout';
import { TryItOutAuthProps } from './TryItOutAuthProps';

Modal.setAppElement('redoc');

enum SubmitAction {
  Authorize,
  Logout,
  Close
}

const apiKeyInputName = 'apiKey';

const submitActionHandler = {
  [SubmitAction.Authorize]: (data, dispatchAuth) => dispatchAuth(TryItOutAuthReducerEnum.Change, data[apiKeyInputName]),
  [SubmitAction.Logout]: (data, dispatchAuth) => dispatchAuth(TryItOutAuthReducerEnum.Clear, data[apiKeyInputName])
}

export default function TryItOutAuthModal(props: TryItOutAuthProps) {
  const dispatch = useAuthDispatch();
  const { register: registerAuth, handleSubmit: handleSubmitAuth, errors: errorsAuth } = useForm();
  const dispatchAuth = (type, key: string) => {
    let keyString = key ?? '';
    if (props.scheme.scheme === 'bearer' && !keyString.startsWith('Bearer ')){
      keyString = `Bearer ${keyString}`;
    }

    dispatch({
      type,
      item: {
        id: props.scheme.id,
        type: props.scheme.type,
        scheme: props.scheme.scheme,
        value: {
          key: keyString
        }
      }
    });
  }

  const handleAuthorize = handleSubmitAuth(data => {
    data.action = SubmitAction.Authorize;
    handleFormSubmit(data);
  });
  const handleLogout = handleSubmitAuth(data => {
    data.action = SubmitAction.Logout;
    handleFormSubmit(data);
  });
  const handleClose = () => {
    props.onCloseAuthorization();
  };

  const handleFormSubmit = data => {
    submitActionHandler[data.action](data, dispatchAuth);
    props.onCloseAuthorization();
  };

  const scheme = props.scheme;
  const authItem = (props.state as TryItOutAuthStorerApiKeyItemValue)?.key;
  const authValue = authItem ?? '';

  return (
    <div key={scheme.name || scheme.id} /*style={{ padding: '10px 20px', borderBottom: '1px solid #ebebeb' }}*/>
      <TryItOutUnderlinedHeader>{scheme.name || scheme.id}</TryItOutUnderlinedHeader>
      <div style={{ padding: '10px 0px' }}>
        <form>
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
                      name={apiKeyInputName}
                      className={errorsAuth[apiKeyInputName] ? 'is-invalid' : ''}
                      type={'Text'}
                      defaultValue={authValue}
                      disabled={!!props.state}
                      ref={registerAuth({ required: true })} />
                  </TryItOutPropertyDetailsCell>
                </tr>
              </tbody>
            </TryItOutPropertiesTable>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {!props.state
              ? <TryItOutButton type="button" value='Authorize' onClick={handleAuthorize} />
              : <TryItOutButton type="button" value="Logout" onClick={handleLogout} />
            }
            <TryItOutButton type="button" value="Close" onClick={handleClose} />
          </div>
        </form>
      </div >
    </div >
  );
}
