import * as React from 'react';
// import styles from './GraphAPiProfileCard.module.scss';
import type { IGraphAPiProfileCardProps } from './IGraphAPiProfileCardProps';
// import { IGraphAPiProfileCardState } from './IGraphClientApiProfileCardState';
import {GraphError,ResponseType} from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { Link, Persona, PersonaSize } from '@fluentui/react';

const GraphAPiProfileCard:React.FC<IGraphAPiProfileCardProps>=(props)=>{
  const[name,setName]=React.useState('');
  const[email,setEmail]=React.useState('');
  const[image,setImage]=React.useState('');
  const[phone,setPhone]=React.useState('');

  React.useEffect(()=>{
//get user basic infor
props.graphClient.api('me')
.get((err:GraphError,user:MicrosoftGraph.User)=>{
  if(!err&&user){
    setName(user.displayName||'');
    setEmail(user.mail||'');
    setPhone(user.businessPhones?.[0]||'');
  }
});
//Fetch the User PRofile Picture
props.graphClient.api('me/photo/$value')
.responseType(ResponseType.BLOB)
.get((err:GraphError,photoResponse:Blob)=>{
  const bloburl=URL.createObjectURL(photoResponse);
  setImage(bloburl);
})
  },[props.graphClient]);

const renderEmail=():React.ReactNode=>{
  return email?<Link href={`mailto:${email}`}>{email}</Link>:<div/>
}
const renderPhone=():React.ReactNode=>{
  return email?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
}
  return (
    <>
    <Persona
  text={name}
    secondaryText={email}
    onRenderSecondaryText={renderEmail
    }
    tertiaryText={phone}
    onRenderTertiaryText={renderPhone}
    imageUrl={image}
    size={PersonaSize.size100}
    />
    </>
  )
}
export default GraphAPiProfileCard;
