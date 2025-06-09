import * as React from 'react';
// import styles from './GetEvents.module.scss';
import type { IGetEventsProps } from './IGetEventsProps';
import "@pnp/graph/users";
import "@pnp/graph/calendars";
import {SPFx,graphfi} from "@pnp/graph";
import { ContentType } from '@pnp/sp/content-types';

interface IEvent{
  subject:string;
  webLink:string;
  start:{
    dateTime:string;
  };
  end:{
    dateTime:string;
  }
}
const GetEvents:React.FC<IGetEventsProps>=(props)=>{
  const[myEvents,setMyEvents]=React.useState<IEvent[]>([]);
  const[loading,setLoading]=React.useState<boolean>(true);

   const _getMyEvents=async()=>{
    const graph=graphfi().using(SPFx(props.context));
    const events=await graph.users.getById(props.context.pageContext.user.email).events();
    setMyEvents(events);
    setLoading(false);
    console.log(events);
   };
   const createEvents=async()=>{
    const graph=graphfi().using(SPFx(props.context));
    const eventsName=prompt("Enter event name");
    const eventDate:any={
      subject:eventsName,
      body:{
        contentType:'HTML',
        content:'Does late morning work for you?'
      },
      start:{
        dateTime:'2025-06-25T12:00:00',
        timeZone:'Pacific Standard Time'
      },
      end:{
        dateTime:'2025-06-26T14:00:00',
        timeZone:'Pacific Standard Time'
      },
      location:{
        displayName:'New York'
      }
   
    };
    await graph.users.getById(props.context.pageContext.user.email).calendar.events.add(eventDate);
    _getMyEvents();
  }
  React.useEffect(()=>{
    _getMyEvents();
  },[]);
  return(
    <></>
  )
}
export default GetEvents;