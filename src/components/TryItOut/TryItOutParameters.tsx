import * as React from 'react';
import { TryItOutParametersGroup } from './TryItOutParametersGroup';
import { TryItOutUseForm } from './TryItOutUseForm';

import { FieldModel, RequestBodyModel } from '../../services/models';
import { TryItOutParameterBody } from './TryItOutParameterBody';
import { TryItOutParameterTarget } from './TryItOutParameterTarget';
import { OpenAPIServer } from '../../types/open-api';

function safePush(obj, prop, item) {
  if (!obj[prop]) {
    obj[prop] = [];
  }
  obj[prop].push(item);
}

export interface TryItOutParametersProps {
  servers: OpenAPIServer[];
  body?: RequestBodyModel;
  parameters?: FieldModel[];
  useForm: TryItOutUseForm;
}

const PARAM_PLACES = ['path', 'query', 'cookie', 'header'];

export class TryItOutParameters extends React.PureComponent<TryItOutParametersProps> {
  orderParams(params: FieldModel[]): Record<string, FieldModel[]> {
    const res = {};
    params.forEach((param) => {
      safePush(res, param.in, param);
    });
    return res;
  }

  render() {
    const { servers, body, parameters = [], useForm } = this.props;
    const paramsMap = this.orderParams(parameters);
    const paramsPlaces = parameters.length > 0 ? PARAM_PLACES : [];

    return (
      <>
        <TryItOutParameterTarget servers={servers} useForm={useForm} />
        {paramsPlaces.map((place) => (
          <TryItOutParametersGroup key={place} place={place} parameters={paramsMap[place]} useForm={useForm} />
        ))}
        {body && <TryItOutParameterBody body={body} useForm={useForm} />}
      </>
    );
  }
}
