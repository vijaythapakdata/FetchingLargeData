import * as React from 'react';
import styles from './FormValidation.module.scss';
import type { IFormValidationProps } from './IFormValidationProps';
import { FormikServiceClass } from '../../../FormikService/formikservice';
// import { IFormValidationState } from './IFormValidationState';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { sp } from '@pnp/sp';
import * as yup from 'yup';
import { Formik,FormikProps} from
'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { Label, Stack, TextField,Dropdown, DatePicker, PrimaryButton} from
'@fluentui/react';
// import { Dropdown } from 'antd';
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
startdDate:yup.date().required("Start Date is required")||null,
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
    <form onSubmit={formik.handleSubmit}>
    <div className={styles.formValidation}>
<Stack tokens={stackTokens}>
  <Label className={styles.lblForm}>
    User Name
    </Label>

    <PeoplePicker
    context={props.context as any}
    ensureUser={true}
    personSelectionLimit={1}
    webAbsoluteUrl={props.siteurl}
    defaultSelectedUsers={[props.context.pageContext.user.displayName as any]}
    disabled={true}
    principalTypes={[PrincipalType.User]}
    />
  

  <Label className={styles.lblForm}>
    Task Name
  </Label>
  <TextField
  {
    ...getFieldProps(formik,'name')
  }
  />
  <Label className={styles.lblForm}>
    Project Name
  </Label>
  <Dropdown
  options={
    [
      {key:"Task  1",text:"Task 1"},
       {key:"Task  1",text:"Task 1"},
        {key:"Task  1",text:"Task 1"},

    ]
  }
    selectedKey={formik.values.projectName}
    onChange={(event,options)=>formik.setFieldValue('projectName',options?.key)}
    errorMessage={formik.errors.projectName as string}

  />
  <Label className={styles.lblForm}>Start Date</Label>
  <DatePicker 
  id="startDate"
  value={formik.values.startDate}
  textField={{ ...getFieldProps(formik,'startDate') }}
  onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
  />
   <Label className={styles.lblForm}>End Date</Label>
  <DatePicker 
  id="endDate"
  value={formik.values.endDate}
  textField={{ ...getFieldProps(formik,'endDate') }}
  onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
  />
<Label className={styles.lblForm}>Task Details</Label>
<TextField
multiline
rows={5}

{...getFieldProps(formik,'details')}/>
</Stack>
<PrimaryButton className={styles.btnsForm}
type='submit'
text='Save'
iconProps={{iconName:'Save'}}
// onClick={formik.handleSubmit as any}
/>
<PrimaryButton className={styles.btnsForm}
text='Cancel'
iconProps={{iconName:'Cancel'}}
onClick={formik.resetForm as any}
/>
    </div>
    </form>
  )
}

    </Formik>
    
    </>
  );
}
export default  FormValidation;