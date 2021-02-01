import * as React from 'react';
import { Loading } from '..';
import { TryItOutPropertiesTable, TryItOutUnderlinedHeader } from './tryItOut.layout';

export interface TryItOutResponseProps {
  loading: boolean;
  response: any;
}

export default function TryItOutResponse(props: TryItOutResponseProps) {
  return (
    <div>
      {props.loading ?
        <Loading color={'white'} />
        :
        <>
          <TryItOutUnderlinedHeader>Headers</TryItOutUnderlinedHeader>
          <TryItOutPropertiesTable>
            <tbody>
              {Object.keys(props.response?.headers || {}).map(key =>
                <span key={key}>{key}-{props.response.headers[key]}</span>
              )}
            </tbody>
          </TryItOutPropertiesTable>
          <span>{JSON.stringify(props.response, null, 2)}</span>
        </>
      }
    </div>
  );
}
