import { transparentize } from 'polished';
import styled from '../../../styled-components';
import { StyledDropdown } from '../../../common-elements';
import { PrismDiv } from '../../../common-elements/PrismDiv';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

export const TryItOutCodeMirror = styled(CodeMirror)`
  transition: all .3s;
  border-radius: 4px;

  &.is-invalid {
    border-width: 1px 1px 1px 10px;
    border-style: solid;
    border-color: #d41f1c;
  }

  .CodeMirror {
    /* Set height, width, borders, and global font properties here */
    font-size: ${({ theme }) => theme.typography.code.fontSize};
    font-family: ${({ theme }) => theme.typography.code.fontFamily};
    height: 300px;
    background-color: ${({ theme }) => theme.typography.code.backgroundColor};
    color: ${({ theme }) => theme.typography.code.colors.main};
    direction: ltr;
  }

  /* PADDING */

  .CodeMirror-lines {
    padding: 4px 0; /* Vertical padding around content */
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    padding: 0 4px; /* Horizontal padding of content */
  }

  .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
    background-color: transparent; /* The little square between H and V scrollbars */
  }

  /* GUTTER */

  .CodeMirror-gutters {
    background: ${({ theme }) => theme.typography.code.backgroundColor};
    color: #546E7A;
    border: none;
    border-right: 1px solid #ddd;
    white-space: nowrap;
  }
  .CodeMirror-linenumbers {}
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }

  .CodeMirror-guttermarker,
  .CodeMirror-guttermarker-subtle,
  .CodeMirror-linenumber {
    color: ${({ theme }) => theme.typography.code.guttermarker.color};
  }

  .CodeMirror-guttermarker-subtle { color: #999; }

  /* CURSOR */

  .CodeMirror-cursor {
    border-left: 1px solid ${({ theme }) => theme.typography.code.cursor.color};
    border-right: none;
    width: 0;
  }
  /* Shown when moving in bi-directional text */
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }
  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }
  @-moz-keyframes blink {
    0% {}
    50% { background-color: transparent; }
    100% {}
  }
  @-webkit-keyframes blink {
    0% {}
    50% { background-color: transparent; }
    100% {}
  }
  @keyframes blink {
    0% {}
    50% { background-color: transparent; }
    100% {}
  }

  /* Can style cursor different in overwrite (non-insert) mode */
  .CodeMirror-overwrite .CodeMirror-cursor {}

  .cm-tab { display: inline-block; text-decoration: inherit; }

  .CodeMirror-rulers {
    position: absolute;
    left: 0; right: 0; top: -50px; bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0; bottom: 0;
    position: absolute;
  }

  /* DEFAULT THEME */

  .cm-s-default .cm-header {color: blue;}
  .cm-s-default .cm-quote {color: #090;}
  .cm-negative {color: #d44;}
  .cm-positive {color: #292;}
  .cm-header, .cm-strong {font-weight: bold;}
  .cm-em {font-style: italic;}
  .cm-link {text-decoration: underline;}
  .cm-strikethrough {text-decoration: line-through;}

  .cm-s-default .cm-keyword {
    color: ${({ theme }) => theme.typography.code.colors.keyword};
  }
  .cm-s-default .cm-atom {
    color: ${({ theme }) => theme.typography.code.colors.atom};
  }
  .cm-s-default .cm-number {
    color: ${({ theme }) => theme.typography.code.colors.number};
  }
  .cm-s-default .cm-def {
    color: ${({ theme }) => theme.typography.code.colors.def};
  }
  .cm-s-default .cm-variable {
    color: ${({ theme }) => theme.typography.code.colors.variable};
  }
  .cm-s-default .cm-punctuation,
  .cm-s-default .cm-operator {
    color: ${({ theme }) => theme.typography.code.colors.operator};
  }
  .cm-s-default .cm-variable-2 {
    color: ${({ theme }) => theme.typography.code.colors.variable2};
  }
  .cm-s-default .cm-variable-3, .cm-s-default .cm-type {
    color: ${({ theme }) => theme.typography.code.colors.type};
  }
  .cm-s-default .cm-comment {
    color: ${({ theme }) => theme.typography.code.colors.comment};
  }
  .cm-s-default .cm-string {
    color: ${({ theme }) => theme.typography.code.colors.string};
  }
  .cm-s-default .cm-string-2 {
    color: ${({ theme }) => theme.typography.code.colors.string2};
  }
  .cm-s-default .cm-meta {
    color: ${({ theme }) => theme.typography.code.colors.meta};
  }
  .cm-s-default .cm-qualifier {
    color: ${({ theme }) => theme.typography.code.colors.qualifier};
  }
  .cm-s-default .cm-builtin {
    color: ${({ theme }) => theme.typography.code.colors.builtin};
  }
  .cm-s-default .cm-bracket {
    color: ${({ theme }) => theme.typography.code.colors.bracket};
  }
  .cm-s-default .cm-tag {
    color: ${({ theme }) => theme.typography.code.colors.tag};
  }
  .cm-s-default .cm-attribute {
    color: ${({ theme }) => theme.typography.code.colors.attribute};
  }
  .cm-s-default .cm-property {
    color: ${({ theme }) => theme.typography.code.colors.property};
  }
  .cm-s-default .cm-hr {color: #999;}
  .cm-s-default .cm-link {color: #00c;}

  .cm-s-default .cm-error {
    color: rgba(255, 255, 255, 1.0);
    background-color: #FF5370;
  }
  .cm-invalidchar {color: #f00;}

  .CodeMirror-composing { border-bottom: 2px solid; }

  /* Default styles for common addons */

  div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}
  div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}
  .CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
  .CodeMirror-activeline-background {
    background: rgba(0, 0, 0, 0.5);
  }

  /* STOP */

  /* The rest of this file contains styles related to the mechanics of
    the editor. You probably shouldn't touch them. */

  .CodeMirror {
    position: relative;
    overflow: hidden;
  }

  .CodeMirror-scroll {
    overflow: scroll !important; /* Things will break if this is overridden */
    /* 50px is the magic margin used to hide the element's real scrollbars */
    /* See overflow: hidden in .CodeMirror */
    margin-bottom: -50px; margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: none; /* Prevent dragging from highlighting the element */
    position: relative;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }

  /* The fake, visible scrollbars. Used to force redraw during scrolling
    before actual scrolling happens, thus preventing shaking and
    flickering artifacts. */
  .CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 6;
    display: none;
    outline: none;
  }
  .CodeMirror-vscrollbar {
    right: 0; top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0; left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0; bottom: 0;
  }
  .CodeMirror-gutter-filler {
    left: 0; bottom: 0;
  }

  .CodeMirror-gutters {
    position: absolute; left: 0; top: 0;
    min-height: 100%;
    z-index: 3;
  }
  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -50px;
  }
  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: none !important;
    border: none !important;
  }
  .CodeMirror-gutter-background {
    position: absolute;
    top: 0; bottom: 0;
    z-index: 4;
  }
  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }
  .CodeMirror-gutter-wrapper ::selection { background-color: transparent }
  .CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px; /* prevents collapsing before first draw */
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    /* Reset some styles that the rest of the page might have set */
    -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: inherit;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }
  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    z-index: 0;
  }

  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: 0.1px; /* Force widget margins to stay inside of the container */
  }

  .CodeMirror-widget {}

  .CodeMirror-rtl pre { direction: rtl; }

  .CodeMirror-code {
    outline: none;
  }

  /* Force content-box sizing for the elements where we expect it */
  .CodeMirror-scroll,
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
  }
  .CodeMirror-measure pre { position: static; }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }
  div.CodeMirror-dragcursors {
    visibility: visible;
  }

  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }

  .CodeMirror-selected { background: ${({ theme }) => theme.typography.code.selected.background} }
  .CodeMirror-focused .CodeMirror-selected { background: ${({ theme }) => theme.typography.code.selected.background} }
  .CodeMirror-crosshair { cursor: crosshair; }
  .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: ${({ theme }) => theme.typography.code.selected.background} }
  .CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: ${({ theme }) => theme.typography.code.selected.background} }

  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255, 255, 0, .4);
  }

  /* Used to force a border model for a node */
  .cm-force-border { padding-right: .1px; }

  @media print {
    /* Hide the cursor when printing */
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden;
    }
  }
`;

export const TryItOutMimeLabel = styled.div`
  padding: 0.9em;
  background-color: ${({ theme }) => transparentize(0.6, theme.rightPanel.backgroundColor)};
  margin: 0 0 10px 0;
  display: block;
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: 0.929em;
  line-height: 1.5em;
`;

export const TryItOutDropdownLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: 12px;
  position: absolute;
  z-index: 1;
  top: -11px;
  left: 12px;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  color: ${({ theme }) => transparentize(0.3, theme.rightPanel.textColor)};
`;

export const TryItOutDropdownWrapper = styled.div`
  position: relative;
`;

export const TryItOutInvertedSimpleDropdown = styled(StyledDropdown)`
  && {
    margin-left: 10px;
    text-transform: none;
    font-size: 0.929em;
    margin: 0 0 10px 0;
    display: block;
    background-color: ${({ theme }) => transparentize(0.6, theme.rightPanel.backgroundColor)};
    font-size: 1em;
    border: none;
    padding: 0.9em 1.6em 0.9em 0.9em;
    box-shadow: none;
    &:hover,
    &:focus-within {
      border: none;
      box-shadow: none;
    }
    &:focus-within {
      background-color: ${({ theme }) => transparentize(0.3, theme.rightPanel.backgroundColor)};
    }

    .dropdown-arrow {
      border-top-color: ${({ theme }) => theme.rightPanel.textColor};
    }
    .dropdown-selector-value {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: ${({ theme }) => theme.rightPanel.textColor};
    }

    .dropdown-selector-content {
      margin: 0;
      margin-top: 2px;
      .dropdown-option {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`;

export const TryItOutNoSampleLabel = styled.div`
  font-family: ${(props) => props.theme.typography.code.fontFamily};
  font-size: 12px;
  color: #ee807f;
`;

export const StyledPre = styled(PrismDiv.withComponent('pre'))`
  font-family: ${(props) => props.theme.typography.code.fontFamily};
  font-size: ${(props) => props.theme.typography.code.fontSize};
  overflow-x: auto;
  margin: 0;

  white-space: ${({ theme }) => (theme.typography.code.wrap ? 'pre-wrap' : 'pre')};
`;
