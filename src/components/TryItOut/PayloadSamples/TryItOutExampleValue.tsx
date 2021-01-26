import * as React from 'react';

import { isJsonLike, langFromMime } from '../../../utils/openapi';
import { TryItOutJson } from './TryItOutJson';
import { SourceCodeWithCopy } from '../../SourceCode/SourceCode';
import { TryItOutUseForm } from '../TryItOutUseForm';

export interface TryItOutExampleValueProps {
  value: any;
  mimeType: string;
  useForm: TryItOutUseForm;
}

export function TryItOutExampleValue({ value, mimeType, useForm }: TryItOutExampleValueProps) {
  if (isJsonLike(mimeType)) {
    return <TryItOutJson data={value} useForm={useForm} />;
  }

  if (typeof value === 'object') {
    // just in case example was cached as json but used as non-json
    value = JSON.stringify(value, null, 2);
  }

  return <SourceCodeWithCopy lang={langFromMime(mimeType)} source={value} />;
}
