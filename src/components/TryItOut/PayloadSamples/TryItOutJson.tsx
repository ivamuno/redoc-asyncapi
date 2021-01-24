  import * as React from 'react';
import { TryItOutCodeMirror } from './tryItOut.styled.elements';

export interface TryItOutJsonProps {
  data: any;
  className?: string;
}

export class TryItOutJson extends React.PureComponent<TryItOutJsonProps> {
  render() {
    return (<TryItOutCodeMirror
      className={'material'}
      value={JSON.stringify(this.props.data, null, 2)}
      options={{
        mode: "application/json",
        theme: 'material'
      }} />);
  }
}
