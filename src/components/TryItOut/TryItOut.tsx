import * as React from 'react';
import { useForm } from "react-hook-form";

import { OperationModel } from '../../services';
import { TryItOutParameters } from './TryItOutParameters';
import { TryItOutSubmit } from './tryItOut.layout';

export interface TryItOutProps {
  operation: OperationModel
}

export default function TryItOut(props: TryItOutProps) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TryItOutParameters parameters={props.operation.parameters} body={props.operation.requestBody} useForm={{ register, errors }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TryItOutSubmit type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
