import * as React from 'react';
import { ShelfIcon } from '../../common-elements';
import { OperationModel } from '../../services';
import { Markdown } from '../Markdown/Markdown';
import { OptionsContext } from '../OptionsProvider';
import { SelectOnClick } from '../SelectOnClick/SelectOnClick';

import { expandDefaultServerVariables, getBasePath } from '../../utils';
import {
  EndpointInfo,
  HttpVerb,
  OperationEndpointWrap,
  ServerItem,
  ServerPropsItem,
  ServerRelativeURL,
  ServersOverlay,
  ServerUrl,
  ServerVarName,
  ServerVarDesc,
  ServerVarValue,
} from './styled.elements';

export interface EndpointProps {
  operation: OperationModel;

  hideHostname?: boolean;
  inverted?: boolean;
  compact?: boolean;
}

export interface EndpointState {
  expanded: boolean;
}

export class Endpoint extends React.Component<EndpointProps, EndpointState> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { operation, inverted, hideHostname } = this.props;
    const { expanded } = this.state;

    // TODO: highlight server variables, e.g. https://{user}.test.com
    return (
      <OptionsContext.Consumer>
        {options => (
          <OperationEndpointWrap>
            <EndpointInfo onClick={this.toggle} expanded={expanded} inverted={inverted}>
              <HttpVerb type={operation.httpVerb} compact={this.props.compact}>
                {operation.httpVerb}
              </HttpVerb>
              <ServerRelativeURL>{operation.path}</ServerRelativeURL>
              <ShelfIcon
                float={'right'}
                color={inverted ? 'black' : 'white'}
                size={'20px'}
                direction={expanded ? 'up' : 'down'}
                style={{ marginRight: '-25px' }}
              />
            </EndpointInfo>
            <ServersOverlay expanded={expanded} aria-hidden={!expanded}>
              {operation.servers.map(server => {
                const expandDefaultServerVars = options.expandDefaultServerVariables;
                const normalizedUrl = expandDefaultServerVars
                  ? expandDefaultServerVariables(server.url, server.variables)
                  : server.url;
                const basePath = getBasePath(normalizedUrl);
                const serverVariables = server.variables || [];
                return (
                  <ServerItem key={normalizedUrl}>
                    <Markdown source={`**${(server.name || '').toUpperCase()}**`} compact={true} />
                    <Markdown source={server.description || ''} compact={true} />
                    <SelectOnClick>
                      <ServerUrl>
                        <span>
                          {hideHostname || options.hideHostname
                            ? basePath === '/'
                              ? ''
                              : basePath
                            : normalizedUrl}
                        </span>
                        {server.protocol && (
                          <ServerVarValue isVar={false}>
                            {server.protocol} {server.protocolVersion}
                          </ServerVarValue>
                        )}
                      </ServerUrl>
                    </SelectOnClick>
                    {!expandDefaultServerVars &&
                      Object.keys(serverVariables).map(key => {
                        const variable = serverVariables[key];
                        return (
                          <ServerPropsItem key={key}>
                            <ServerVarName>{key}</ServerVarName>
                            <ServerVarDesc>{variable.description}</ServerVarDesc>
                            <ServerVarValue isVar={true}>ENUM: {variable.enum}</ServerVarValue>
                            <ServerVarValue isVar={true}>
                              DEFAULT: {variable.default}
                            </ServerVarValue>
                          </ServerPropsItem>
                        );
                      })}
                  </ServerItem>
                );
              })}
            </ServersOverlay>
          </OperationEndpointWrap>
        )}
      </OptionsContext.Consumer>
    );
  }
}
