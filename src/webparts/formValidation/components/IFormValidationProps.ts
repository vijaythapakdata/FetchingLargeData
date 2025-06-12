import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFormValidationProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  siteurl:string;
  context:WebPartContext;
  ListName:string;
}
