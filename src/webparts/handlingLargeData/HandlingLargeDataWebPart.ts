import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'HandlingLargeDataWebPartStrings';
import HandlingLargeData from './components/HandlingLargeData';
import { IHandlingLargeDataProps } from './components/IHandlingLargeDataProps';

export interface IHandlingLargeDataWebPartProps {
 ListName: string;
}

export default class HandlingLargeDataWebPart extends BaseClientSideWebPart<IHandlingLargeDataWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IHandlingLargeDataProps> = React.createElement(
      HandlingLargeData,
      {
        ListName:this.properties.ListName,
        siteurl:this.context.pageContext.web.absoluteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }



  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
