import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
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
    title: 'Sql status',
    align: "center",
    dataIndex: 'sqlStatus'
  },
  {
    title: 'Sql datasource',
    align: "center",
    dataIndex: 'sqlDatasource'
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
    label: 'Sql status',
    field: 'sqlStatus',
    component: 'Input',
  },
  {
    label: 'Sql datasource',
    field: 'sqlDatasource',
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
