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
    const { useForm, data } = this.props;
    const name = 'body';

    return (<div>
      <textarea readOnly
        name={name}
        ref={useForm.register({
          required: true,
          validate: {
            isJson: value => {
              try {
                JSON.parse(value)
              } catch (error) {
                return error.message
              }
            }
          }
        })}
        value={this.state.data}
        style={{ display: 'none' }} />
      <TryItOutCodeMirror
        className={useForm?.errors[name] ? 'is-invalid' : ''}
        value={JSON.stringify(data, null, 2)}
        options={{
          mode: "application/json"
        }}
        onChange={this.onCodeMirrorChange}
      />
    </div>);
  }
}
