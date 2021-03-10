import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RedocNormalizedOptions, RedocRawOptions } from '../services/RedocNormalizedOptions';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from './Loading/Loading';
import { Redoc } from './Redoc/Redoc';
import { StoreBuilder } from './StoreBuilder';

export interface RedocStandaloneProps {
  spec?: object;
  specUrl?: string;
  options?: RedocRawOptions;
  onLoaded?: (e?: Error) => any;
}

export class RedocStandalone extends React.PureComponent<RedocStandaloneProps> {
  errorBoundary = React.createRef<ErrorBoundary>();

  static propTypes = {
    spec: (props, _, componentName) => {
      if (!props.spec && !props.specUrl) {
        return new Error(
          `One of props 'spec' or 'specUrl' was not specified in '${componentName}'.`,
        );
      }
      return null;
    },

    specUrl: (props, _, componentName) => {
      if (!props.spec && !props.specUrl) {
        return new Error(
          `One of props 'spec' or 'specUrl' was not specified in '${componentName}'.`,
        );
      }
      return null;
    },
    options: PropTypes.any,
    onLoaded: PropTypes.any,
  };

  render() {
    const { spec, specUrl, options = {}, onLoaded } = this.props;
    const hideLoading = options.hideLoading !== undefined;

    const normalizedOpts = new RedocNormalizedOptions(options);
    if (this.errorBoundary.current?.state.error) {
      this.errorBoundary.current?.setState({ error: undefined });
    }

    return (
      <ErrorBoundary ref={this.errorBoundary}>
        <StoreBuilder spec={spec} specUrl={specUrl} options={options} onLoaded={onLoaded}>
          {({ loading, store }) =>
            !loading ? (
              <Redoc store={store!} />
            ) : hideLoading ? null : (
              <Loading color={normalizedOpts.theme.colors.primary.main} spinner={normalizedOpts.spinner} />
            )
          }
        </StoreBuilder>
      </ErrorBoundary>
    );
  }
}
