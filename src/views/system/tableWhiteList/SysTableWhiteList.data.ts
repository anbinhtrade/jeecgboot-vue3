import {BasicColumn, FormSchema} from '/@/components/Table';

const statusOptions = [
  {label: 'DISABLE', value: '0'},
  {label: 'ENABLE', value: '1'},
]

export const columns: BasicColumn[] = [
  {
    title: 'Allowed table names',
    dataIndex: 'tableName',
  },
  {
    title: 'Allowed field names',
    dataIndex: 'fieldName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    customRender({text}) {
      const find = statusOptions.find(opt => opt.value === text);
      return find?.label || 'UNKNOWN';
    }
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Allowed table names',
    field: 'tableName',
    component: 'Input',
  },
  {
    label: 'Allowed field names',
    field: 'fieldName',
    component: 'Input',
  },
  {
    label: 'Status',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: statusOptions,
    },
  },
];

export const formSchema: FormSchema[] = [
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: 'Allowed table names',
    field: 'tableName',
    component: 'Input',
    required: true,
  },
  {
    label: 'Allowed field names',
    field: 'fieldName',
    component: 'Input',
    required: true,
    helpMessage: 'Multiple are separated by commas',
  },
  {
    label: 'Status',
    field: 'status',
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: statusOptions,
    },
  },
];
