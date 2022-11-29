import * as React from 'react';
import { ParametersGroup } from './ParametersGroup';

import { FieldModel } from '../../services/models';

function safePush(obj, prop, item) {
  if (!obj[prop]) {
    obj[prop] = [];
  }
  obj[prop].push(item);
}

export interface ParametersProps {
  parameters?: FieldModel[];
}

const PARAM_PLACES = ['path', 'query', 'cookie', 'header', 'channel'];

export class Parameters extends React.PureComponent<ParametersProps> {
  orderParams(params: FieldModel[]): Record<string, FieldModel[]> {
    const res = {};
    params.forEach(param => {
      safePush(res, param.in, param);
    });
    return res;
  }

  render() {
    const { parameters = [] } = this.props;
    if (parameters === undefined) {
      return null;
    }

    const paramsMap = this.orderParams(parameters);

    const paramsPlaces = parameters.length > 0 ? PARAM_PLACES : [];

    return (
      <>
        {paramsPlaces.map(place => (
          <ParametersGroup key={place} place={place} parameters={paramsMap[place]} />
        ))}
      </>
    );
  }
}
