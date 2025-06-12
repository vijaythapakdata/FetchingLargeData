// import {SPFI,spfi} from "@pnp/sp/presets/all";
import {Web} from "@pnp/sp/presets/all";
// import { WebPartContext } from "@microsoft/sp-webpart-base";

export class FormikServiceClass{
    private web:any;
    constructor(url:string){
        this.web=Web(url);
    }
    public async _createItems(ListName:string,body:any){
        try{
            let createItem=await this.web.lists.getbytitle(ListName).items.add(body);
            return createItem;
        }
        catch(err){
            console.log("Error while creating the items");
            throw err;
        }
        finally{
            console.log("I will run");
        }
    }
}