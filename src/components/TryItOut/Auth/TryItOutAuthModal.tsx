import * as React from 'react';
import { useAuthState, TryItOutAuthStorerAuthState } from './TryItOutAuthStorer'
import Modal from 'react-modal';

import { OperationModel } from '../../../services';
import { RightPanelHeader } from '../../../common-elements';
import { SecurityScheme } from '../../../services/models/SecurityRequirement';
import { OpenAPISecuritySchemeEnum } from '../../../types/open-api';
import TryItOutAuthApiKey from './TryItOutAuthApiKey';
import { TryItOutAuthProps } from './TryItOutAuthProps';

Modal.setAppElement('redoc');

const supportedSchemes: Record<string, (props: TryItOutAuthProps) => JSX.Element> = {
  [`${OpenAPISecuritySchemeEnum.apiKey}|`]: (props) => <TryItOutAuthApiKey scheme={props.scheme} state={props.state} onCloseAuthorization={props.onCloseAuthorization} />,
  [`${OpenAPISecuritySchemeEnum.http}|bearer`]: (props) => <TryItOutAuthApiKey scheme={props.scheme} state={props.state} onCloseAuthorization={props.onCloseAuthorization} />
};

export interface TryItOutAuthModalProps {
  operation: OperationModel;
  isOpen: boolean;
  onCloseAuthorization: () => void;
}

export default function TryItOutAuthModal(props: TryItOutAuthModalProps) {
  const authState = useAuthState();
  const onCloseAuthorization = () => { props.onCloseAuthorization(); };

  const schemes: SecurityScheme[] = props.operation.security?.reduce((current, acc) => [...current, ...acc.schemes], []);
  const renderSchemes = schemes.map(scheme => {
    const tryItOutAuthStorerAuthItem = authState.items.find(i => TryItOutAuthStorerAuthState.compare(i, scheme));
    const element: JSX.Element | undefined = supportedSchemes[`${scheme.type}|${scheme.scheme}`] ?
      supportedSchemes[`${scheme.type}|${scheme.scheme}`]({
        scheme,
        onCloseAuthorization,
        state: tryItOutAuthStorerAuthItem ? tryItOutAuthStorerAuthItem.value : undefined
      }) :
      undefined;
    return { scheme, element };
  });

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
      {renderSchemes.map(renderScheme =>
        renderScheme ? (
          <div key={renderScheme.scheme.name || renderScheme.scheme.id} style={{ padding: '10px 20px', borderBottom: '1px solid #ebebeb' }}>
            {renderScheme.element}
          </div>
        ) : (
            <span>NOT SUPPORTED</span>
          )
      )}
    </Modal>
  );
}
