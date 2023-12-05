import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Code',
    align: "center",
    dataIndex: 'msgCatCode'
  },
  {
    title: 'Text',
    align: "center",
    dataIndex: 'msgCatText'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Code',
    field: 'msgCatCode',
    component: 'Input',
  },
  {
    label: 'Text',
    field: 'msgCatText',
    component: 'Input',
  },
	// TODO The primary key hidden field is currently hard-coded as ID.
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
