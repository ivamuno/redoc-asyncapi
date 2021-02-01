import * as React from 'react';
import { Loading } from '..';
import { TryItOutJson } from './PayloadSamples/TryItOutJson';
import {
  TryItOutPropertiesTable,
  TryItOutUnderlinedHeader,
  TryItOutPropertySpan,
  TryItOutResponsePropertyNameCell,
  TryItOutResponsePropertyValueCell
} from './tryItOut.layout';

export interface TryItOutResponseProps {
  loading: boolean;
  response: any;
}

export default function TryItOutResponse(props: TryItOutResponseProps) {
  const response = props.response || {};
  const headers = response.headers || {};
  return (
    <div style={{ padding: '2px' }}>
      {props.loading ?
        <Loading color={'white'} />
        :
        (props.response && <div>
          <div>
            <TryItOutUnderlinedHeader>Request Url</TryItOutUnderlinedHeader>
            <TryItOutPropertySpan>{response.url}</TryItOutPropertySpan>
          </div>
          <div>
            <TryItOutUnderlinedHeader>Headers</TryItOutUnderlinedHeader>
            <TryItOutPropertiesTable>
              <tbody>
                {Object.keys(headers).map(key =>
                  <tr key={key}>
                    <TryItOutResponsePropertyNameCell title={key}>
                      <span>{key}</span>
                    </TryItOutResponsePropertyNameCell>
                    <TryItOutResponsePropertyValueCell>
                      <span>{headers[key]}</span>
                    </TryItOutResponsePropertyValueCell>
                  </tr>
                )}
              </tbody>
            </TryItOutPropertiesTable>
          </div>
          <div>
            <TryItOutUnderlinedHeader>Response Body</TryItOutUnderlinedHeader>
            <TryItOutJson data={response.responseBody} readOnly={true} />
          </div>
        </div>)
      }
    </div>
  );
}
