import * as React from 'react';
;
import { OperationModel } from '../../services';
import { Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import TryItOutRequest from './TryItOutRequest';
import TryItOutResponse from './TryItOutResponse';

export interface TryItOutProps {
  operation: OperationModel
}

export interface TryItOutState {
  selectedIndex: number;
  loadingReponse: boolean;
  response: any;
}

const initialState: TryItOutState = {
  selectedIndex: 0,
  loadingReponse: false,
  response: {}
}

export default function TryItOut(props: TryItOutProps) {
  const [state, setState] = React.useState(initialState);
  const onLoading = () => {
    setState({ loadingReponse: true, selectedIndex: 1, response: {} });
  }
  const onLoaded = r => {
    setState({ loadingReponse: false, selectedIndex: 1, response: r });
  }

  return (
    <Tabs selectedIndex={state.selectedIndex} onSelect={index => setState({ ...state, selectedIndex: index })} >
      <TabList hidden={false}>
        <Tab key='Request' style={{ border: '1px solid white' }}>Request</Tab>
        <Tab key='Response' style={{ border: '1px solid white' }}>Response</Tab>
      </TabList>
      <TabPanel key='Request'>
        <TryItOutRequest operation={props.operation} onLoading={onLoading} onLoaded={onLoaded} />
      </TabPanel>
      <TabPanel key='Response'>
        <TryItOutResponse loading={state.loadingReponse} response={state.response} />
      </TabPanel>
    </Tabs>
  );
}
