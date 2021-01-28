import * as React from 'react';
import { useForm } from "react-hook-form";

import { OperationModel } from '../../services';
import { TryItOutParameters } from './TryItOutParameters';
import { TryItOutSubmit } from './tryItOut.layout';
import { Tab, TabList, TabPanel, Tabs } from '../../common-elements';

export interface TryItOutProps {
  operation: OperationModel
}

const renderRequest = (operation: OperationModel, useForm) => {
  const { register, handleSubmit, errors } = useForm;
  const onSubmit = data => console.log(data);
  return (<div style={{ padding: '2px' }}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TryItOutParameters servers={operation.servers} parameters={operation.parameters} body={operation.requestBody} useForm={{ register, errors }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TryItOutSubmit type="submit" value="Submit" />
      </div>
    </form>
  </div>);
}

const renderResponse = (_props, _useForm) => {
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
          {tab.render(props.operation, useForm())}
        </TabPanel>
      ))}
    </Tabs>
  );
}
