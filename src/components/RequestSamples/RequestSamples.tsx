import { observer } from 'mobx-react';
import * as React from 'react';
import { isPayloadSample, isTryItOutSample, OperationModel, RedocNormalizedOptions } from '../../services';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
import TryItOut from '../TryItOut/TryItOut';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

import { RightPanelHeader, Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';

export interface RequestSamplesProps {
  operation: OperationModel;
}

@observer
export class RequestSamples extends React.Component<RequestSamplesProps> {
  static contextType = OptionsContext;
  context: RedocNormalizedOptions;
  operation: OperationModel;

  renderSampleType(sample) {
    if (isPayloadSample(sample)) {
      return <div><PayloadSamples content={sample.requestBodyContent} /></div>;
    }

    if (isTryItOutSample(sample)) {
      return (<TryItOut operation={sample.operationModel} />);
    }

    return <SourceCodeWithCopy lang={sample.lang} source={sample.source} />;
  }

  render() {
    const { operation } = this.props;
    const samples = operation.codeSamples;

    const hasSamples = samples.length > 0;
    const hideTabList = samples.length === 1 ? this.context.hideSingleRequestSampleTab : false;
    return (
      (hasSamples && (
        <div>
          <RightPanelHeader> Request samples </RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList hidden={hideTabList}>
              {samples.map((sample) => (
                <Tab key={sample.lang + '_' + (sample.label || '')}>
                  {sample.label !== undefined ? sample.label : sample.lang}
                </Tab>
              ))}
            </TabList>
            {samples.map((sample) => (
              <TabPanel key={sample.lang + '_' + (sample.label || '')}>
                {this.renderSampleType(sample)}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
