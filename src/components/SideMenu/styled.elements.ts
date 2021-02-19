import * as classnames from 'classnames';
import { darken } from 'polished';

import { deprecatedCss, ShelfIcon } from '../../common-elements';
import styled, { css } from '../../styled-components';

export const OperationBadge = styled.span.attrs((props: { type: string }) => ({
  className: `operation-type ${props.type}`,
})) <{ type: string }>`
  width: 9ex;
  display: inline-block;
  height: ${(props) => props.theme.typography.code.fontSize};
  line-height: ${(props) => props.theme.typography.code.fontSize};
  background-color: #333;
  border-radius: ${(props) => props.theme.border.radius};
  background-repeat: no-repeat;
  background-position: 6px 4px;
  font-size: 7px;
  font-family: Verdana, sans-serif; // web-safe
  color: white;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  vertical-align: middle;
  margin-right: 6px;
  margin-top: 2px;

  &.get {
    background-color: ${(props) => props.theme.colors.http.get};
  }

  &.post {
    background-color: ${(props) => props.theme.colors.http.post};
  }

  &.put {
    background-color: ${(props) => props.theme.colors.http.put};
  }

  &.options {
    background-color: ${(props) => props.theme.colors.http.options};
  }

  &.patch {
    background-color: ${(props) => props.theme.colors.http.patch};
  }

  &.delete {
    background-color: ${(props) => props.theme.colors.http.delete};
  }

  &.pub {
    background-color: ${(props) => props.theme.colors.http.pub};
  }

  &.sub {
    background-color: ${(props) => props.theme.colors.http.sub};
  }

  &.basic {
    background-color: ${(props) => props.theme.colors.http.basic};
  }

  &.link {
    background-color: ${(props) => props.theme.colors.http.link};
  }

  &.head {
    background-color: ${(props) => props.theme.colors.http.head};
  }

  &.hook {
    background-color: ${(props) => props.theme.colors.primary.main};
  }
`;

export const MenuItemUl = styled.ul<{ expanded: boolean }>`
  margin: 0;
  padding: 0;

  & & {
    font-size: 0.929em;
  }

  ${(props) => (props.expanded ? '' : 'display: none;')};
`;

export const MenuItemLi = styled.li<{ depth: number }>`
  list-style: none inside none;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  ${(props) => (props.depth === 0 ? 'margin-top: 15px' : '')};
`;

export const menuItemDepth = {
  0: css`
    opacity: ${({ theme }) => theme.sidebar.opacity};
    font-size: ${({ theme }) => theme.sidebar.fontSize};
    font-weight: ${({ theme }) => theme.sidebar.fontWeight};
    padding-bottom: 0;
    cursor: default;
    text-transform: ${({ theme }) => theme.sidebar.level0Items.textTransform};
    &:hover {
      color: ${(props) => props.theme.sidebar.level0Items.hover.color};
    }
  `,
  1: css`
    font-size: ${({ theme }) => theme.sidebar.fontSize};
    font-weight: ${({ theme }) => theme.sidebar.fontWeight};
    text-transform: ${({ theme }) => theme.sidebar.level1Items.textTransform};
    &:hover {
      color: ${(props) => props.theme.sidebar.level1Items.hover.color};
    }
  `,
  2: css`
    text-transform: ${({ theme }) => theme.sidebar.level2Items.textTransform};
    &:hover {
      color: ${(props) => props.theme.sidebar.level2Items.hover.color};
    }
  `,
};

export interface MenuItemLabelType {
  depth: number;
  active: boolean;
  deprecated?: boolean;
  type?: string;
}

export const MenuItemLabel = styled.label.attrs((props: MenuItemLabelType) => ({
  role: 'menuitem',
  className: classnames('-depth' + props.depth, {
    active: props.active,
  }),
})) <MenuItemLabelType>`
  cursor: pointer;
  color: ${(props) =>
    props.active
      ? props.theme.sidebar[`level${props.depth}Items`].active.color
      : props.theme.sidebar[`level${props.depth}Items`].color};
  margin: 0;
  padding: ${(props) => props.theme.sidebar.padding} ${(props) => props.theme.spacing.unit * 4}px;
  ${({ depth, type, theme }) =>
    (type === 'section' && depth > 1 && 'padding-left: ' + theme.spacing.unit * 8 + 'px;') || ''}
  display: flex;
  justify-content: space-between;
  font-family: ${(props) => props.theme.typography.headings.fontFamily};
  ${(props) => menuItemDepth[props.depth]};
  background-color: ${(props) =>
    props.active
      ? props.theme.sidebar[`level${props.depth}Items`].active.backgroundColor
      : props.theme.sidebar[`level${props.depth}Items`].backgroundColor};

  ${(props) => (props.deprecated && deprecatedCss) || ''};

  &:hover {
    color: ${(props) =>
    props.active
      ? props.theme.sidebar[`level${props.depth}Items`].active.color
      : props.theme.sidebar[`level${props.depth}Items`].hover.color};
    background-color: ${(props) =>
    props.active
      ? props.theme.sidebar[`level${props.depth}Items`].active.backgroundColor
      : props.theme.sidebar[`level${props.depth}Items`].hover.backgroundColor};
  }

  ${ShelfIcon} {
    height: ${(props) => props.theme.sidebar[`level${props.depth}Items`].arrow.size};
    width: ${(props) => props.theme.sidebar[`level${props.depth}Items`].arrow.size};
    polygon {
      fill: ${(props) => props.theme.sidebar[`level${props.depth}Items`].arrow.color};
    }
  }
`;

export const MenuItemTitle = styled.span<{ width?: string }>`
  display: inline-block;
  vertical-align: middle;
  width: ${(props) => (props.width ? props.width : 'auto')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RedocAttribution = styled.div`
  ${({ theme }) => `
  font-size: 0.8em;
  margin-top: ${theme.spacing.unit * 2}px;
  padding: 0 ${theme.spacing.unit * 4}px;
  text-align: left;

  opacity: 0.7;

  a,
  a:visited,
  a:hover {
    color: ${theme.sidebar.level0Items.color} !important;
    border-top: 1px solid ${darken(0.1, theme.sidebar.level0Items.backgroundColor)};
    padding: ${theme.spacing.unit}px 0;
    display: block;
  }
`};
`;
