import * as React from 'react';

import styled from '../../../styled-components';

import { DropdownProps } from '../../../common-elements';
import { MediaTypeModel } from '../../../services/models';
import { Markdown } from '../../Markdown/Markdown';
import { TryItOutExample } from './TryItOutExample';
import { TryItOutDropdownLabel, TryItOutDropdownWrapper, TryItOutNoSampleLabel } from './tryItOut.styled.elements';

export interface TryItOutMediaTypeSamplesProps {
  mediaType: MediaTypeModel;
  renderDropdown: (props: DropdownProps) => JSX.Element;
}

interface TryItOutMediaTypeSamplesState {
  activeIdx: number;
}

export class TryItOutMediaTypeSamples extends React.Component<TryItOutMediaTypeSamplesProps, TryItOutMediaTypeSamplesState> {
  state = {
    activeIdx: 0,
  };
  switchMedia = ({ idx }) => {
    this.setState({
      activeIdx: idx,
    });
  };
  render() {
    const { activeIdx } = this.state;
    const examples = this.props.mediaType.examples || {};
    const mimeType = this.props.mediaType.name;

    const noSample = <TryItOutNoSampleLabel>No sample</TryItOutNoSampleLabel>;

    const examplesNames = Object.keys(examples);
    if (examplesNames.length === 0) {
      return noSample;
    }

    if (examplesNames.length > 1) {
      const options = examplesNames.map((name, idx) => {
        return {
          value: examples[name].summary || name,
          idx,
        };
      });

      const example = examples[examplesNames[activeIdx]];
      const description = example.description;

      return (
        <TryItOutSamplesWrapper>
          <TryItOutDropdownWrapper>
            <TryItOutDropdownLabel>Example</TryItOutDropdownLabel>
            {this.props.renderDropdown({
              value: options[activeIdx].value,
              options,
              onChange: this.switchMedia,
              ariaLabel: 'Example',
            })}
          </TryItOutDropdownWrapper>
          <div>
            {description && <Markdown source={description} />}
            <TryItOutExample example={example} mimeType={mimeType} />
          </div>
        </TryItOutSamplesWrapper>
      );
    } else {
      const example = examples[examplesNames[0]];
      return (
        <TryItOutSamplesWrapper>
          {example.description && <Markdown source={example.description} />}
          <TryItOutExample example={example} mimeType={mimeType} />
        </TryItOutSamplesWrapper>
      );
    }
  }
}

const TryItOutSamplesWrapper = styled.div`
  margin-top: 15px;
`;
