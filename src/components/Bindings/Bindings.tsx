// import { transparentize } from 'polished';
import * as React from 'react';
import styled from '../../styled-components';
import { UnderlinedHeader } from '../../common-elements';
import { PropertiesTable } from '../../common-elements/fields-layout';
import { MimeLabel } from '../../common-elements/dropdown';

import { mapWithLast } from '../../utils';
import {
  PropertyBullet,
  PropertyDetailsCell,
  PropertyNameCell,
} from '../../common-elements/fields-layout';

const TypeName = styled.span`
  color: ${(props) => props.theme.schema.typeNameColor};
  font-size: 13px;
`;

export interface BindingsProps {
  bindingGroupHeader: string;
  bindingGroupName?: string;
  bindings: any[];
}

export class Bindings extends React.PureComponent<BindingsProps> {
  render() {
    return (
      <div>
        <UnderlinedHeader>
          {this.props.bindingGroupHeader}: <MimeLabel>{this.props.bindingGroupName}</MimeLabel>
        </UnderlinedHeader>
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
      </div>
    );
  }
}
