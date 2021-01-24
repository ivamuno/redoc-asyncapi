import * as React from 'react';
import { TryItOutParametersGroup } from './TryItOutParametersGroup';
import { TryItOutUseForm } from './TryItOutUseForm';

import { FieldModel, RequestBodyModel } from '../../services/models';
import { TryItOutParameterBody } from './TryItOutParameterBody';

function safePush(obj, prop, item) {
  if (!obj[prop]) {
    obj[prop] = [];
  }
  obj[prop].push(item);
}

export interface TryItOutParametersProps {
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
    const { body, parameters = [], useForm } = this.props;
    if (body === undefined && parameters === undefined) {
      return null;
    }

    const paramsMap = this.orderParams(parameters);
    const paramsPlaces = parameters.length > 0 ? PARAM_PLACES : [];

    return (
      <>
        {paramsPlaces.map((place) => (
          <TryItOutParametersGroup key={place} place={place} parameters={paramsMap[place]} useForm={useForm} />
        ))}
        {body && <TryItOutParameterBody body={body} useForm={useForm} />}
      </>
    );
  }
}
