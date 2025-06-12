import * as React from 'react';
// import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
import { FormikServiceClass } from '../../../FormikService/formikservice';
import { IFormValidationState } from './IFormValidationState';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from '@pnp/sp';
import * as yup from 'yup';
import { Formik,FormikProps} from
'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { Label, Stack, TextField } from '@fluentui/react';
import { Dropdown } from 'antd';
const stackTokens={
  childrenGap:20
}
const  FormValidation:React.FC<IFormValidationProps>=(props)=>{

  const [service,setService]=React.useState<FormikServiceClass|null>(null);

  React.useEffect(()=>{
    sp.setup({spfxContext:props.context as any})
    setService(new FormikServiceClass(props.siteurl))
  },[props.context,props.siteurl]);

  //validation forms

  const _validate=yup.object().shape({
name:yup.string().required("Task Name is required"),
details:yup.string().min(15,"Minimum 15 characters are required").required("Task details is required"),
startdDate:yup.date().required("Start Date is required"),
endDate:yup.date().required("End Date is required"),
projectName:yup.string().required("Project Name is required"),

  });
  //formik field helpers

  const getFieldProps=(formik:FormikProps<any>,filed:string)=>({
    ...formik.getFieldProps(filed),errorMessage:formik.errors[filed] as string
  });

  const createRecord=async(record:any)=>{
    try{

      const item=await service?._createItems(props.ListName,{
        Title:record.name,
        TaskDetails:record.details,
        StartDate:new Date(record.startDate),
        EndDate:new Date(record.endDate),
        ProjectName:record.projectName
      });
      console.log(item);
      Dialog.alert("Item has successfully saved");
    }
    catch(err){

      console.error(err);
    }
  }
  return(

    <>
    <Formik
    initialValues={{
      name:"",
      details:"",
      projectName:"",
      startDate:null,
      endDate:null
    }}
    validationSchema={_validate}
    onSubmit={(values,helpers)=>{
      createRecord(values).then(()=>helpers.resetForm()
    )
    }}
    >

{
  (
    formik:FormikProps<any>
  )=>(
    <div>
<Stack tokens={stackTokens}>
  <Label>

    <PeoplePicker
    context={props.context as any}
    ensureUser={true}
    personSelectionLimit={1}
    webAbsoluteUrl={props.siteurl}
    defaultSelectedUsers={[props.context.pageContext.user.displayName as any]}
    disabled={true}
    principalTypes={[PrincipalType.User]}
    />
  </Label>

  <Label>
    Task Name
  </Label>
  <TextField
  {
    ...getFieldProps(formik,'name')
  }
  />
  <Label>
    Project Name
  </Label>
  <Dropdown
  
  />
</Stack>
    </div>
  )
}

    </Formik>
    
    </>
  )
}
export default  FormValidation;