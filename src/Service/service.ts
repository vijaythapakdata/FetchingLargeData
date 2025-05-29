import {sp,ICamlQuery} from "@pnp/sp/presets/all";
import { IHandlingLargeDataState } from "../webparts/handlingLargeData/components/IHandlingLargedataState";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export class service{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }
    //get list

    public async _getListItems(ListName:string):Promise<IHandlingLargeDataState[]>{
        try{
const items=await sp.web.lists.getByTitle(ListName).items.getAll();
return items.map((item:any)=>({
    Title:item.Title
}));
        }
        catch(err){
console.log(err);
throw err;
        }
    }
    //Get CamlQuery
    public async _getPaginationItems(ListName:string):Promise<IHandlingLargeDataState[]>{
        const _allItems:IHandlingLargeDataState[]=[];
        let position:any; // to store next page information
        do{
            const camlQuery:ICamlQuery={
                ViewXml:`
                <View>
                <Query>
                <Where>
                <IsNotNull>
                <FieldRef Name='Title'/>
                </IsNotNull>
                </Where>
                </Query>
                <RowLimit>2000</RowLimit>
                </View>
                `
            }
            // fetching items woth pagination
            const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
            console.log(`Fetched batch of ${response.length} items`);
            _allItems.push(...response.map((item:any)=>({
                Title:item.Title
            })));
        }
        while(position){
            console.log(`Total items fetched ${_allItems.length}`);
            return _allItems;
        }
    }
}