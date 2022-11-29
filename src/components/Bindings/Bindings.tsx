// import { transparentize } from 'polished';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import styled from '../../styled-components';
import { UnderlinedHeader } from '../../common-elements';
import { PropertiesTable } from '../../common-elements/fields-layout';
import { MimeLabel } from '../../common-elements/Dropdown';
import { ShelfIcon } from '../../common-elements/shelfs';

import { mapWithLast } from '../../utils';
import {
  PropertyBullet,
  PropertyDetailsCell,
  PropertyNameCell,
} from '../../common-elements/fields-layout';

const TypeName = styled.span`
  color: ${props => props.theme.schema.typeNameColor};
  font-size: ${props => props.theme.typography.code.fontSize};
  font-family: ${props => props.theme.typography.code.fontFamily};
`;

const BindingsHeader = styled(UnderlinedHeader)`
  cursor: pointer;
`;

export interface BindingsProps {
  bindingGroupHeader: string;
  bindingGroupName?: string;
  bindings: any[];
}

export interface BindingsState {
  expanded: boolean;
}

export class Bindings extends React.PureComponent<BindingsProps, BindingsState> {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <BindingsHeader
          onClick={() => {
            this.setState({ expanded: !expanded });
          }}
        >
          {this.props.bindingGroupHeader}: <MimeLabel>{this.props.bindingGroupName}</MimeLabel>
          <ShelfIcon float={'right'} direction={expanded ? 'down' : 'right'} />
        </BindingsHeader>
        <Collapse isOpened={expanded}>
          <PropertiesTable>
            <tbody>
              {mapWithLast(this.props.bindings, (b, isLast) => (
                <tr key={b.key} className={isLast ? 'last' : ''}>
                  <PropertyNameCell title={b.key}>
                    <PropertyBullet />
                    <span>{b.key}</span>
                  </PropertyNameCell>
                  <PropertyDetailsCell>
                    <TypeName>{b.value.toString()}</TypeName>
                  </PropertyDetailsCell>
                </tr>
              ))}
            </tbody>
          </PropertiesTable>
        </Collapse>
      </div>
    );
  }
}
