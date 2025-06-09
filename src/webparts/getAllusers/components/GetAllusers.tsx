import * as React from 'react';
// import styles from './GetAllusers.module.scss';
import type { IGetAllusersProps } from './IGetAllusersProps';
import {MSGraphClientV3} from "@microsoft/sp-http";
import { DetailsList, PrimaryButton } from '@fluentui/react';

interface Iuser{
  displayName:string;
  mail:string;
}

const GetAllusers :React.FC<IGetAllusersProps>=(props)=>{
  const[userState,setUserState]=React.useState<Iuser[]>([]);
const _getUsers=React.useCallback(()=>{
  props.graphClient.getClient('3')
  .then((msGraphClient:MSGraphClientV3)=>{
    msGraphClient.api('users').version('v1.0')
    .select('displayName,mail')
    .get((err:any,res:any)=>{
      if(err){
        console.error("Error occurred while fetching users",err);
        return;
      }
      const allusers:Iuser[]=res.value.map((result:any)=>({
        displayName:result.displayName,
        mail:result.mail
      }));
      setUserState(allusers);
    })
  })

},[props.graphClient]);

  return(
    <>
    <PrimaryButton text='Search Users' onClick={_getUsers} iconProps={{iconName:'search'}}/>
      <br/>
      <DetailsList
      items={userState}
      />
    </>
  )
}
export default GetAllusers ;
