import * as React from 'react';
import { DropdownOrLabel } from '../DropdownOrLabel/DropdownOrLabel';

import { TryItOutUnderlinedHeader } from './tryItOut.layout';

import { MediaContentModel } from '../../services';
import { RequestBodyModel } from '../../services/models';
import { MediaTypesSwitch } from '../MediaTypeSwitch/MediaTypesSwitch';
import { TryItOutUseForm } from './TryItOutUseForm';
import { TryItOutMediaTypeSamples } from './PayloadSamples/TryItOutMediaTypeSamples';
import { TryItOutInvertedSimpleDropdown, TryItOutMimeLabel } from './PayloadSamples/tryItOut.styled.elements';

export interface TryItOutParameterBodyProps {
  body?: RequestBodyModel;
  useForm: TryItOutUseForm;
}

export class TryItOutParameterBody extends React.PureComponent<TryItOutParameterBodyProps> {
  render() {
    const { body, useForm } = this.props;
    if (body === undefined) {
      return null;
    }

    const bodyContent = body && body.content;

    return (
      <>
        {bodyContent && <BodyContent content={bodyContent} useForm={useForm} />}
      </>
    );
  }
}

const renderDropdown = (props) => {
  return <DropdownOrLabel Label={TryItOutMimeLabel} Dropdown={TryItOutInvertedSimpleDropdown} {...props} />;
};

export function BodyContent(props: { content: MediaContentModel, useForm: TryItOutUseForm }): JSX.Element {
  const { content, useForm } = props;

  return (
    <>
      <TryItOutUnderlinedHeader key="header">Request Body</TryItOutUnderlinedHeader>
      <div style={{ marginTop: '12px' }}>
        <MediaTypesSwitch content={content} renderDropdown={renderDropdown} withLabel={true}>
          {(mediaType) => (
            <TryItOutMediaTypeSamples
              key="tryItOutSamples"
              mediaType={mediaType}
              renderDropdown={renderDropdown}
              useForm={useForm}
            />
          )}
        </MediaTypesSwitch>
      </div>
    </>
  );
}
