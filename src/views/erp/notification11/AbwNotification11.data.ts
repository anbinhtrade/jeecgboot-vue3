import {BasicColumn} from '/src/components/Table';
import {FormSchema} from '/src/components/Table';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Subject',
    align: "center",
    dataIndex: 'msgSubject'
  },
  {
    title: 'Message',
    align: "center",
    dataIndex: 'msgBody'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Subject',
    field: 'msgSubject',
    component: 'Input',
  },
  {
    label: 'Message',
    field: 'msgBody',
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
