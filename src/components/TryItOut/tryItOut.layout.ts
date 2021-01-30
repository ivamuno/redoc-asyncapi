// import { transparentize } from 'polished';

import styled, { extensionsHook, media } from '../../styled-components';
import { deprecatedCss } from '../../common-elements/mixins';

import { InnerPropertiesWrap } from '../../common-elements/fields-layout';
import { FieldLabel } from '../../common-elements/fields';

export const TryItOutRequiredLabel = styled(FieldLabel.withComponent('div'))`
  color: rgb(255,99,71);
  font-size: ${(props) => props.theme.schema.labelsTextSize};
  font-weight: normal;
  line-height: 1;
`;

export const TryItOutUnderSelect = styled.select`
  display: block;
  border-width: 1px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 10px;
  transition: all .3s;

  &.is-invalid {
    border-width: 1px 1px 1px 10px;
    border-style: solid;
    border-color: #d41f1c;
    background: rgb(251, 236, 242)
  }

  ${extensionsHook('TryItOutUnderSelect')};
`;

export const TryItOutUnderInput = styled.input`
  display: block;
  border-width: 1px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 10px;
  transition: all .3s;

  &.is-invalid {
    border-width: 1px 1px 1px 10px;
    border-style: solid;
    border-color: #d41f1c;
    background: rgb(251, 236, 242)
  }

  ${extensionsHook('TryItOutUnderInput')};
`;

export const TryItOutButton = styled.input`
  padding: 5px 15px;
  text-transform: uppercase;
  cursor: pointer;
  text-align: center;
  background-color: rgb(50, 50, 159);
  font-weight: bold;
  font-size: 1em;
  color: white;
  border: 0px;
  min-width: 120px;
  outline: none;
  transition: all .3s;
  margin: 10px 0px 0px 0px;
  border-radius: 4px;

  &:hover {
    background-color: rgb(65, 65, 195);
  }

  &:active {
    background-color: rgb(44, 44, 140);
  }

  &.is-authorized {
    background-color: #49cc90;
  }

  &.is-invalid {
    border-width: 1px 1px 1px 10px;
    border-style: solid;
    border-color: #d41f1c;
    background: rgb(251, 236, 242);
    color: rgba(38,50,56,0.5);
  }

  ${extensionsHook('TryItOutUnderInput')};
`;

export const TryItOutUnderlinedHeader = styled.h5`
  border-bottom: 1px solid white;
  margin: 0px 0px 2px 0px;
  color: white;
  font-weight: normal;
  text-transform: uppercase;
  font-size: 0.929em;
  line-height: 20px;

  ${extensionsHook('TryItOutUnderlinedHeader')};
`;

export const TryItOutPropertyNameCell = styled.td`
  box-sizing: border-box;
  position: relative;
  padding: 10px 10px 10px 0;

  ${media.lessThan('small')`
    display: block;
    overflow: hidden;
  `}

  vertical-align: top;
  line-height: 20px;
  white-space: nowrap;
  font-size: 13px;
  font-family: ${(props) => props.theme.typography.code.fontFamily};

  &.deprecated {
    ${deprecatedCss};
  }

  ${extensionsHook('TryItOutPropertyNameCell')};
`;

export const TryItOutPropertyDetailsCell = styled.td`
  padding: 10px 0;
  width: ${(props) => props.theme.schema.defaultDetailsWidth};
  box-sizing: border-box;

  tr.expanded & {
    border-bottom: none;
  }

  ${media.lessThan('small')`
    padding: 0 20px;
    border-bottom: none;
    border-left: 1px solid ${(props) => props.theme.schema.linesColor};

    tr.last > & {
      border-left: none;
    }
  `}

  ${extensionsHook('TryItOutPropertyDetailsCell')};
`;

export const TryItOutPropertiesTable = styled.table`
  border-collapse: separate;
  border-radius: 3px;
  font-size: ${(props) => props.theme.typography.fontSize};

  border-spacing: 0;
  width: 100%;

  > tr {
    vertical-align: middle;
  }

  ${media.lessThan('small')`
    display: block;
    > tr, > tbody > tr {
      display: block;
    }
  `}

  ${media.lessThan('small', false, ' and (-ms-high-contrast:none)')`
    td {
      float: left;
      width: 100%;
    }
  `}

  &
    ${InnerPropertiesWrap},
    &
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap},
    &
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap} {
    margin: ${({ theme }) => theme.schema.nestingSpacing};
    margin-right: 0;
    background: ${({ theme }) => theme.schema.nestedBackground};
  }

  &
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap},
    &
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap},
    &
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap}
    ${InnerPropertiesWrap} {
    background: #ffffff;
  }
`;
