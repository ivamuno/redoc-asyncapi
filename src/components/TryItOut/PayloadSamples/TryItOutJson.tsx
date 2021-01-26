import * as React from 'react';
import { TryItOutUseForm } from '../TryItOutUseForm';
import { TryItOutCodeMirror } from './tryItOut.styled.elements';

export interface TryItOutJsonProps {
  data: any;
  name?: string;
  useForm: TryItOutUseForm;
}

export interface TryItOutJsonState {
  data: any;
}

export class TryItOutJson extends React.PureComponent<TryItOutJsonProps, TryItOutJsonState> {
  state = {
    data: JSON.stringify(this.props.data, null, 2)
  };

  onCodeMirrorChange = (_editor, _data, value) => {
    this.setState({ data: value });
  }

  render() {
    const { useForm } = this.props;
    const name = 'body';
    return (<div>
      <textarea name={name} ref={useForm.register({ required: true })} value={this.state.data} readOnly style={{ display: 'none' }} />
      <TryItOutCodeMirror
        className={useForm?.errors[name] ? 'is-invalid' : ''}
        value={this.state.data}
        options={{
          mode: "application/json"
        }}
        onChange={this.onCodeMirrorChange}
      />
    </div>);
  }
}
