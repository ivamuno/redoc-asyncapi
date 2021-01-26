import * as React from 'react';

import { StyledPre } from './tryItOut.styled.elements';
import { ExampleModel } from '../../../services/models';
import { TryItOutExampleValue } from './TryItOutExampleValue';
import { useExternalExample } from '../../PayloadSamples/exernalExampleHook';
import { TryItOutUseForm } from '../TryItOutUseForm';

export interface TryItOutExampleProps {
  example: ExampleModel;
  mimeType: string;
  useForm: TryItOutUseForm;
}

export function TryItOutExample({ example, mimeType, useForm }: TryItOutExampleProps) {
  if (example.value === undefined && example.externalValueUrl) {
    return <ExternalExample example={example} mimeType={mimeType} useForm={useForm} />;
  } else {
    return <TryItOutExampleValue value={example.value} mimeType={mimeType} useForm={useForm} />;
  }
}

export function ExternalExample({ example, mimeType, useForm }: TryItOutExampleProps) {
  const value = useExternalExample(example, mimeType);

  if (value === undefined) {
    return <span>Loading...</span>;
  }

  if (value instanceof Error) {
    return (
      <StyledPre>
        Error loading external example: <br />
        <a
          className={'token string'}
          href={example.externalValueUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {example.externalValueUrl}
        </a>
      </StyledPre>
    );
  }

  return <TryItOutExampleValue value={value} mimeType={mimeType} useForm={useForm} />;
}
