import styled, { css, extensionsHook } from '../styled-components';

const headerFontSize = {
  1: css`font-size: ${({ theme }) => theme.typography.headings.h1.fontSize};`,
  2: css`font-size: ${({ theme }) => theme.typography.headings.h2.fontSize};`,
  3: css`font-size: ${({ theme }) => theme.typography.headings.h3.fontSize};`,
};

const headerFontWeight = {
  1: css`font-weight: ${({ theme }) => theme.typography.headings.h1.fontWeight};`,
  2: css`font-weight: ${({ theme }) => theme.typography.headings.h2.fontWeight};`,
  3: css`font-weight: ${({ theme }) => theme.typography.headings.h3.fontWeight};`,
};

export const headerCommonMixin = (level) => css`
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  ${headerFontWeight[level]}
  ${headerFontSize[level]}
  line-height: ${({ theme }) => theme.typography.headings.lineHeight};
`;

export const H1 = styled.h1`
  ${headerCommonMixin(1)};
  color: ${({ theme }) => theme.colors.primary.main};
  ${extensionsHook('H1')};
`;

export const H2 = styled.h2`
  ${headerCommonMixin(2)};
  color: ${({ theme }) => theme.colors.secondary.main};
  ${extensionsHook('H2')};
`;

export const H3 = styled.h2`
  ${headerCommonMixin(3)};
  color: black;
  ${extensionsHook('H3')};
`;

export const RightPanelHeader = styled.h3`
  color: ${({ theme }) => theme.rightPanel.textColor};

  ${extensionsHook('RightPanelHeader')};
`;

export const UnderlinedHeader = styled.h5`
  border-bottom: 1px solid rgba(38, 50, 56, 0.3);
  margin: 1em 0 1em 0;
  color: rgba(38, 50, 56, 0.5);
  font-weight: normal;
  text-transform: uppercase;
  font-size: 0.929em;
  line-height: 20px;

  ${extensionsHook('UnderlinedHeader')};
`;
