import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHandlingLargeDataProps {
 ListName:string;
 siteurl:string;
 context:WebPartContext;
}
