import * as React from 'react';
import Modal from 'react-modal';

import { OperationModel } from '../../services';
import { Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import TryItOutRequest from './TryItOutRequest';

Modal.setAppElement('redoc');

export interface TryItOutProps {
  operation: OperationModel
}

const renderRequest = (operation: OperationModel) => {
  return (<TryItOutRequest operation={operation} />);
}

const renderResponse = (_props) => {
  return (<><span>Response Example</span></>);
}

const tabs = [
  { name: 'Request', render: renderRequest },
  { name: 'Response', render: renderResponse }
];

export default function TryItOut(props: TryItOutProps) {
  return (
    <Tabs defaultIndex={0}>
      <TabList hidden={false}>
        {tabs.map((tab) => (<Tab key={tab.name} style={{ border: '1px solid white' }}>{tab.name}</Tab>))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.name}>
          {tab.render(props.operation)}
        </TabPanel>
      ))}
    </Tabs>
  );
}
