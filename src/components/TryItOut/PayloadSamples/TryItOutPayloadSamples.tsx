import { observer } from 'mobx-react';
import * as React from 'react';
import { TryItOutMediaTypeSamples } from './TryItOutMediaTypeSamples';

import { MediaContentModel } from '../../../services/models';
import { DropdownOrLabel } from '../../DropdownOrLabel/DropdownOrLabel';
import { MediaTypesSwitch } from '../../MediaTypeSwitch/MediaTypesSwitch';
import { TryItOutInvertedSimpleDropdown, TryItOutMimeLabel } from './tryItOut.styled.elements';
import { TryItOutUseForm } from '../TryItOutUseForm';

export interface TryItOutPayloadSamplesProps {
  content: MediaContentModel;
  useForm: TryItOutUseForm;
}

@observer
export class TryItOutPayloadSamples extends React.Component<TryItOutPayloadSamplesProps> {
  render() {
    const mimeContent = this.props.content;
    if (mimeContent === undefined) {
      return null;
    }

    return (
      <MediaTypesSwitch content={mimeContent} renderDropdown={this.renderDropdown} withLabel={true}>
        {(mediaType) => (
          <TryItOutMediaTypeSamples
            key="samples"
            mediaType={mediaType}
            renderDropdown={this.renderDropdown}
            useForm={this.props.useForm}
          />
        )}
      </MediaTypesSwitch>
    );
  }

  private renderDropdown = (props) => {
    return <DropdownOrLabel Label={TryItOutMimeLabel} Dropdown={TryItOutInvertedSimpleDropdown} {...props} />;
  };
}
