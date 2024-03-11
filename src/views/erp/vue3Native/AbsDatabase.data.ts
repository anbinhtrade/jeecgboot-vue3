import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'SQL Statement',
    align: "center",
    dataIndex: 'sqlStatement'
  },
  {
    title: 'SQL Excution Result',
    align: "center",
    dataIndex: 'sqlResult'
  },
  {
    title: 'Excution time',
    align: "center",
    dataIndex: 'excutionTime'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'SQL Statement',
    field: 'sqlStatement',
    component: 'Input',
  },
  {
    label: 'SQL Excution Result',
    field: 'sqlResult',
    component: 'Input',
  },
  {
    label: 'Excution time',
    field: 'excutionTime',
    component: 'InputNumber',
  },
	// TODO The primary key hidden field is currently hard-coded as ID.
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
