import * as React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { TryItOutAuthStorerApiKeyItemValue, useAuthState } from './Auth/TryItOutAuthStorer';

import { OperationModel } from '../../services';
import { TryItOutParameters } from './TryItOutParameters';
import {
  TryItOutButton,
  TryItOutUnderInput
} from './tryItOut.layout';
import { SecurityScheme } from '../../services/models/SecurityRequirement';
import TryItOutAuthModal from './Auth/TryItOutAuthModal';
import { OpenAPIParameterLocation, OpenAPISecuritySchemeEnum } from '../../types';

Modal.setAppElement('redoc');

export interface TryItOutRequestProps {
  operation: OperationModel;
  onLoading: () => void;
  onLoaded: (r: any) => void;
}

export default function TryItOutRequest(props: TryItOutRequestProps) {
  const authItems = useAuthState().items;
  const authorizedValue = authItems.find(i => i.value);
  const [isAuthorizationOpen, setIsAuthorizationOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    errors
  } = useForm();

  const operation = props.operation;
  const schemes: SecurityScheme[] = operation.security?.reduce((current, acc) => [...current, ...acc.schemes], []);
  const hasSchemes = schemes.length > 0;

  const onSubmit = inputs => {
    props.onLoading();
    const headers = {
      'Content-Type': 'application/json'
    };

    const requestInfo: RequestInit = {
      method: operation.httpVerb,
      body: inputs.body,
      headers: headers
    };

    if (hasSchemes) {
      const authItem = authItems.find(item => schemes.find(s => item.id === s.id));
      if (authItem
        && (authItem.type === OpenAPISecuritySchemeEnum.apiKey
          || (authItem.type === OpenAPISecuritySchemeEnum.http && authItem.scheme === 'bearer'))
      ) {
        headers['Authorizaton'] = (authItem.value as TryItOutAuthStorerApiKeyItemValue)?.key;
      }
    }

    let operationPath = operation.path;
    for (let [paramName, paramValue] of Object.entries(inputs)) {
      const paramPathLocationPreffix = `${OpenAPIParameterLocation.path}:`;
      if (paramName.startsWith(paramPathLocationPreffix)) {
        paramName = paramName.replace(paramPathLocationPreffix, '');
        operationPath = operationPath.replace(`{${paramName}}`, paramValue as string);
      }

      const paramHeaderLocationPreffix = `${OpenAPIParameterLocation.header}:`;
      if (paramName.startsWith(paramHeaderLocationPreffix)) {
        paramName = paramName.replace(paramHeaderLocationPreffix, '');
        headers[paramName] = paramValue as string;
      }

      const paramChannelLocationPreffix = `${OpenAPIParameterLocation.channel}:`;
      if (paramName.startsWith(paramChannelLocationPreffix)) {
        throw new Error(`Paramater location: '${OpenAPIParameterLocation.channel}' is not supported.`);
      }

      const paramCookieLocationPreffix = `${OpenAPIParameterLocation.cookie}:`;
      if (paramName.startsWith(paramCookieLocationPreffix)) {
        throw new Error(`Paramater location: '${OpenAPIParameterLocation.cookie}' is not supported.`);
      }

      const paramQueryLocationPreffix = `${OpenAPIParameterLocation.query}:`;
      if (paramName.startsWith(paramQueryLocationPreffix)) {
        throw new Error(`Paramater location: '${OpenAPIParameterLocation.query}' is not supported.`);
      }
    }

    const url = `${inputs.url}${operationPath}`;
    const startTime = new Date().getTime();
    fetch(url, requestInfo)
      .then(response => {
        const headers: any = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const duration = new Date().getTime() - startTime;
        response.text().then(text => {
          let requestBody: any = text;
          try {
            requestBody = JSON.parse(requestBody);
          }
          catch { }

          props.onLoaded({
            headers: headers,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            redirected: response.redirected,
            responseBody: requestBody,
            duration: duration
          });
        });
      });
  }

  const onOpenAuthorization = () => {
    setIsAuthorizationOpen(true);
  };

  const onCloseAuthorization = () => {
    setIsAuthorizationOpen(false);
  };

  return (
    <div style={{ padding: '2px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TryItOutParameters
            servers={operation.servers}
            parameters={operation.parameters}
            body={operation.requestBody}
            useForm={{ register, errors }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TryItOutUnderInput readOnly
              style={{ display: 'none' }}
              name={'auth'}
              type={'Text'}
              value={authorizedValue || !hasSchemes ? 'valid' : ''}
              ref={register({ required: true })} />
            <TryItOutButton type="button"
              style={{ visibility: hasSchemes ? 'visible' : 'hidden' }}
              value={authorizedValue ? 'Authorized' : 'Authorize'}
              className={authorizedValue ? 'is-authorized' : errors['auth'] ? 'is-invalid' : ''}
              onClick={onOpenAuthorization} />
            <TryItOutButton type="submit" value="Submit" />
          </div>
        </div>
      </form>
      <TryItOutAuthModal operation={props.operation} onCloseAuthorization={onCloseAuthorization} isOpen={isAuthorizationOpen} />
    </div>
  );
}
