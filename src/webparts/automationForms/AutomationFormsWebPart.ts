// polyfills
import 'core-js/es6/array';
import 'core-js/es6/date';
import 'core-js/es6/function';
import 'core-js/es6/map';
import 'core-js/es6/math';
import 'core-js/es6/number';
import 'core-js/es6/object';
import 'core-js/es6/parse-float';
import 'core-js/es6/parse-int';
import 'core-js/es6/regexp';
import 'core-js/es6/set';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es6/weak-map';
import 'core-js/es7/array';
import 'core-js/es7/object';
import 'core-js/es7/promise';
// end polyfills

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  WebPartContext
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'AutomationFormsWebPartStrings';

require('./main.scss');

// Importing Vue.js
import Vue from 'vue';

import store from './store';
// Importing Vue.js SFC
import AutomationFormsComponent from './components/AutomationForms.vue';

import { sp } from "@pnp/sp";

export interface IAutomationFormsWebPartProps {
  description: string;
}

export default class AutomationFormsWebPart extends BaseClientSideWebPart<IAutomationFormsWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    let el = new Vue({
      el: `#${id}`,
      store,
      render: h => h(AutomationFormsComponent, {
        props: {
          description: this.properties.description
        }
      })
    });

    (<HTMLElement>document.querySelector("div[class*='pageTitle']")).style.display = 'none'; 
    (<HTMLElement>document.querySelector(".ms-compositeHeader")).style.display = 'none'; 
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      sp.setup({
        spfxContext: this.context
      });
      
    });
  }
}
