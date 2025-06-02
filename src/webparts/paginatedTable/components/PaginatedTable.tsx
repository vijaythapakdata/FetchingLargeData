import * as React from 'react';
// import styles from './PaginatedTable.module.scss';
import type { IPaginatedTableProps } from './IPaginatedTableProps';
import {Table,Input} from 'antd';
import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/lists";
const PaginatedTable :React.FC <IPaginatedTableProps>=(props)=>{
  const [items,setItems]=React.useState<any[]>([]);
  const [searchText,setSearchText]=React.useState<string>('');

  React.useEffect(()=>{
sp.setup({
  spfxContext:props.context
});
sp.web.lists.getByTitle(props.ListName).items.select('Title','EmailAddress','Age').get().then((data)=>{
  const formattedItems=data.map((item)=>({
    key:item.Id,
    Title:item.Title,
    EmailAddress:item.EmailAddress,
    Age:parseInt(item.Age)
  }));
  setItems(formattedItems);
})
.catch((err)=>{
  console.error('Error while fetching the data',err);
})
  },[props.context]);
const handleSearch=(event:React.ChangeEvent<HTMLInputElement>)=>{
setSearchText(event.target.value);
}
const columns=[
  {
    title:'Name',
    dataIndex:'Title',
    key:'Title',
    sorter:(a:any,b:any)=>a.Title.localeCompare(b.Title),
  }
  ,{
    title:'Email Address',
    dataIndex:'EmailAddress',
    key:'EmailAddress'
  },
  {
    title:'Age',
    dataIndex:'Age',
    key:'Age'
  }
]
// const filterItems=items.filter((item)=>item?.Title?.toLowerCase().includes(searchText.toLowerCase())||item.EmailAddress.toLowerCase().includes(searchText.toLowerCase()));
const filteredItems=items.filter((item)=>(item?.Title?.toLowerCase()||'').includes(searchText.toLowerCase())||
(item?.EmailAddress?.toLowerCase()||'').includes(searchText.toLowerCase())
)  
return(
    <>
    <Input
    // className={styles['']}
    placeholder='search here'
    value={searchText}
    onChange={handleSearch}
    />
<Table
dataSource={filteredItems}
columns={columns}
pagination={{pageSize:5}}
/>
    </>
  )
}
export default PaginatedTable ;