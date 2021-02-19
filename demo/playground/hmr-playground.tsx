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
  colors: {
    primary: { main: '#3237be' },
    secondary: { main: '#007364' },
    success: { main: '#00cd78' },
    warning: { main: '#ffc882' },
    error: { main: '#be3c50' },
    text: { primary: '#000000' },
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
  schema: { nestedBackground: '#f6f8fa', },
  typography: {
    fontFamily: 'Founders, sans-serif',
    headings: {
      fontFamily: 'Founders, sans-serif',
      fontWeight: '300',
      h2: { fontWeight: '600', },
    },
    code: {
      fontSize: '14px',
      color: '#be3c50',
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
      fontSize: 'medium',
      active: {
        color: ({ sidebar }) => sidebar.groupItems.color,
        backgroundColor: ({ sidebar }) => sidebar.groupItems.backgroundColor
      },
      hover: {
        color: ({ sidebar }) => sidebar.groupItems.color,
        backgroundColor: ({ sidebar }) => sidebar.groupItems.backgroundColor
      },
      textTransform: 'uppercase',
      arrow: {
        size: '1.5em',
        color: ({ sidebar }) => sidebar.groupItems.color,
      },
    },
    level2Items: {
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
      textTransform: 'none'
    },
  },
  border: { radius: '0' },
  dropdown: {
    color: (theme) => theme.colors.primary.main,
    focus: {
      boxShadow: `0px 0px 0px 0px ${(props) => props.theme.colors.primary.main}`,
      backgroundColor: '#b9dcff'
    }
  },
  donwloadButton: { hover: { color: '#b9dcff' } },
  markdown: {
    table: {
      border: { color: '#e5e7ea', },
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
