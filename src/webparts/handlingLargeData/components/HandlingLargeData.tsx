import * as React from 'react';
// import styles from './HandlingLargeData.module.scss';
import type { IHandlingLargeDataProps } from './IHandlingLargeDataProps';
// import { useState,useEffect } from 'react';
import { service } from '../../../Service/service';
import { IHandlingLargeDataState } from './IHandlingLargedataState';
import { DetailsList } from '@fluentui/react';
// import { escape } from '@microsoft/sp-lodash-subset';
const HandlingLargeData:React.FC<IHandlingLargeDataProps>=(props)=>{
  const[ListResults,setListResults]=React.useState<IHandlingLargeDataState[]>([]);
  const _service=new service(props.context);
  
  React.useEffect(()=>{
const fetchData=async()=>{
  try{
const result =await _service._getPaginationItems(props.ListName);
setListResults(result);
  }
  catch(er){
console.error('err',er);
throw er;
  }
};
fetchData();
  },[props.ListName,_service])

  return(
    <>
    <DetailsList
    items={ListResults}
    />
    </>
  )
}
export default HandlingLargeData;