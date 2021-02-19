import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';
import * as React from 'react';
import { render } from 'react-dom';
// tslint:disable-next-line
import { AppContainer } from 'react-hot-loader';
// import DevTools from 'mobx-react-devtools';

import { Redoc, RedocProps } from '../../src/components/Redoc/Redoc';
import { AppStore } from '../../src/services/AppStore';
import { RedocRawOptions } from '../../src/services/RedocNormalizedOptions';
import { ThemeInterface } from '../../src/theme';
import { loadAndBundleSpec } from '../../src/utils/loadAndBundleSpec';

const renderRoot = (props: RedocProps) =>
  render(
    <AppContainer>
      <Redoc {...props} />
    </AppContainer>,
    document.getElementById('example'),
  );

const big = window.location.search.indexOf('big') > -1;
const swagger = window.location.search.indexOf('swagger') > -1;

const userUrl = window.location.search.match(/url=(.*)$/);

const specUrl =
  (userUrl && userUrl[1]) || (swagger ? 'swagger.yaml' : big ? 'big-openapi.json' : 'openapi.yaml');

let store;
const payvisionTheme: ThemeInterface = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    small: '50rem',
    medium: '75rem',
    large: '105rem',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#3237be',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    secondary: {
      main: '#007364'
    },
    success: {
      main: '#00cd78',
      light: ({ colors }) => lighten(colors.tonalOffset * 2, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    warning: {
      main: '#ffc882',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    error: {
      main: '#be3c50',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
    },
    border: {
      dark: 'rgba(0,0,0, 0.1)',
      light: '#ffffff',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.success.main),
        tabTextColor: ({ colors }) => colors.responses.success.color,
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.93, colors.error.main),
        tabTextColor: ({ colors }) => colors.responses.error.color,
      },
      redirect: {
        color: ({ colors }) => colors.warning.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
        tabTextColor: ({ colors }) => colors.responses.redirect.color,
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
        tabTextColor: ({ colors }) => colors.responses.info.color,
      },
    },
    http: {
      get: '#ffc882',
      post: '#af9bff',
      put: '#95507c',
      options: '#c8ffe1',
      patch: '#ff7d6e',
      delete: '#be3c50',
      basic: '#465a64',
      link: '#00cd78',
      head: '#b9dcff',
      pub: '#3237be',
      sub: '#007364',
    },
  },
  schema: {
    linesColor: (theme) =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: (theme) => theme.colors.text.secondary,
    typeTitleColor: (theme) => theme.schema.typeNameColor,
    requireLabelColor: (theme) => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    nestedBackground: '#f6f8fa',
    arrow: {
      size: '1.1em',
      color: (theme) => theme.colors.text.secondary,
    },
  },
  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Founders, sans-serif',
    smoothing: 'antialiased',
    optimizeSpeed: true,
    headings: {
      fontFamily: 'Founders, sans-serif',
      fontWeight: '300',
      h1: {
        fontWeight: '300',
      },
      h2: {
        fontWeight: '600',
      },
      lineHeight: '1.6em',
    },
    code: {
      fontSize: '14px',
      fontFamily: 'Courier, monospace',
      lineHeight: ({ typography }) => typography.lineHeight,
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#be3c50',
      backgroundColor: 'rgba(38, 50, 56, 0.05)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.secondary.main,
      textDecoration: 'underline',
      visited: '#af9bff',
      hover: {
        color: 'inherit',
        textDecoration: 'none'
      }
    },
  },
  sidebar: {
    width: '260px',
    groupItems: {
      backgroundColor: 'white',
      color: '#FF7D6E',
      active: {
        color: ({sidebar}) => sidebar.groupItems.color,
        backgroundColor: ({sidebar}) => sidebar.groupItems.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.groupItems.color,
        backgroundColor: ({sidebar}) => sidebar.groupItems.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: '1.5em',
        color: ({sidebar}) => sidebar.groupItems.color,
      },
    },
    level1Items: {
      backgroundColor: ({sidebar}) => sidebar.groupItems.backgroundColor,
      color: ({sidebar}) => sidebar.groupItems.color,
      active: {
        color: ({sidebar}) => sidebar.groupItems.active.color,
        backgroundColor: ({sidebar}) => sidebar.groupItems.active.backgroundColor
      },
      hover: {
        color: ({sidebar}) => sidebar.groupItems.hover.color,
        backgroundColor: ({sidebar}) => sidebar.groupItems.hover.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: ({sidebar}) => sidebar.groupItems.arrow.size,
        color: ({sidebar}) => sidebar.groupItems.arrow.color
      },
    },
    level2Items: {
      backgroundColor: ({sidebar}) => sidebar.groupItems.backgroundColor,
      color: '#465a64',
      fontSize: 'medium',
      active: {
        color: 'white',
        backgroundColor: (theme) => theme.colors.primary.main
      },
      hover: {
        color: '#000000',
        backgroundColor: '#f2f2e9'
      },
      textTransform: 'none',
      arrow: {
        size: ({sidebar}) => sidebar.level1Items.arrow.size,
        color: (theme) => theme.sidebar.level2Items.color,
      },
    },
  },
  logo: {
    maxHeight: ({ sidebar }) => sidebar.width,
    maxWidth: ({ sidebar }) => sidebar.width,
    gutter: '2px',
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  },
  border: {
    radius: '0',
  },
  dropdown: {
    color: (theme) => theme.colors.primary.main,
    focus: {
      boxShadow: `0px 0px 0px 0px ${(props) => props.theme.colors.primary.main}`,
      backgroundColor: '#b9dcff'
    }
  },
  donwloadButton: {
    hover: {
      color: '#b9dcff'
    }
  },
  markdown: {
    table: {
      border: {
        color: '#e5e7ea',
      },
      backgroundColor: '#f6f8fa'
    }
  }
};

const options: RedocRawOptions = { nativeScrollbars: false, maxDisplayedEnumValues: 3, theme: payvisionTheme };

async function init() {
  const spec = await loadAndBundleSpec(specUrl);
  store = new AppStore(spec, specUrl, options);
  renderRoot({ store });
}

init();

if (module.hot) {
  const reload = (reloadStore = false) => async () => {
    if (reloadStore) {
      // create a new Store
      store.dispose();

      const state = await store.toJS();
      store = AppStore.fromJS(state);
    }

    renderRoot({ store });
  };

  module.hot.accept(['../../src/components/Redoc/Redoc'], reload());
  module.hot.accept(['../../src/services/AppStore'], reload(true));
}
