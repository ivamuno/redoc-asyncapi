import * as React from 'react';
import { DropdownOrLabel } from '../DropdownOrLabel/DropdownOrLabel';

import { UnderlinedHeader } from '../../common-elements';

import { MediaContentModel } from '../../services';
import { RequestBodyModel } from '../../services/models';
import { MediaTypesSwitch } from '../MediaTypeSwitch/MediaTypesSwitch';
import { Schema } from '../Schema';

import { Markdown } from '../Markdown/Markdown';

export interface ParameterBodyProps {
  body?: RequestBodyModel;
}

export class ParameterBody extends React.PureComponent<ParameterBodyProps> {
  render() {
    const { body } = this.props;
    if (body === undefined) {
      return null;
    }

    const bodyContent = body && body.content;

    const bodyDescription = body && body.description;

    return (
      <>{bodyContent && <BodyContent content={bodyContent} description={bodyDescription} />}</>
    );
  }
}

function DropdownWithinHeader(props) {
  return (
    <UnderlinedHeader key="header">
      Request Body schema: <DropdownOrLabel {...props} />
    </UnderlinedHeader>
  );
}

export function BodyContent(props: {
  content: MediaContentModel;
  description?: string;
}): JSX.Element {
  const { content, description } = props;
  return (
    <MediaTypesSwitch content={content} renderDropdown={DropdownWithinHeader}>
      {({ schema }) => {
        return (
          <>
            {description !== undefined && <Markdown source={description} />}
            <Schema skipReadOnly={true} key="schema" schema={schema} />
          </>
        );
      }}
    </MediaTypesSwitch>
  );
}
