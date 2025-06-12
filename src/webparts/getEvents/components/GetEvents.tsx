import * as React from 'react';
// import styles from './GetEvents.module.scss';
import type { IGetEventsProps } from './IGetEventsProps';
import "@pnp/graph/users";
import "@pnp/graph/calendars";
import {SPFx,graphfi} from "@pnp/graph";
// import { ContentType } from '@pnp/sp/content-types';

interface IEvent{
  subject:string;
  webLink:string;
  start:{
    dateTime:string;
  };
  end:{
    dateTime:string;
  }
} //
const GetEvents:React.FC<IGetEventsProps>=(props)=>{
  const[myEvents,setMyEvents]=React.useState<IEvent[]>([]);
  const[loading,setLoading]=React.useState<boolean>(true);

   const _getMyEvents=async()=>{
    const graph=graphfi().using(SPFx(props.context));
    // const rawevents=await graph.users.getById(props.context.pageContext.user.email).events();
      const rawevents=await graph.me.calendar.events();
    const cleanedEvents:IEvent[]=rawevents.map(ev=>({
      subject:ev.subject??'No Subject',
      webLink:ev.webLink??'',
      start:{
        dateTime:ev.end?.dateTime??''
      },
      end:{
         dateTime:ev.end?.dateTime??''
      }
    }));
    setMyEvents(cleanedEvents);
    setLoading(false);
    console.log(cleanedEvents);
   };
   const createEvents=async()=>{
    try{
    const graph=graphfi().using(SPFx(props.context));
    const eventsName=prompt("Enter event name");
    if(!eventsName) return;
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
  catch(err){
    console.error(err);
    alert('err');
  }
  }
  React.useEffect(()=>{
    _getMyEvents();
  },[]);
  return(
    <>
 <div>
  <button onClick={createEvents}>Create Event</button>
  {loading?(
    <p>
      Loading Events ...

      
    </p>
  ):(

    <ul>
      {myEvents.map((event,index)=>(
        <li key={index}>
          <strong>{event.subject}</strong>
          <br/>
          <a href={event.webLink} target='_blank' rel='noopener noreferrer'>view Event</a>
          <br/>
          Start:{event.start.dateTime}<br/>
          End:{event.end.dateTime}<br/>
          <hr/>
        </li>
      ))}
    </ul>
  )}
  </div>   
  
 
    </>
  )
}
export default GetEvents;