import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'Route ID',
    dataIndex: 'routerId',
    width: 200,
    align: 'left',
  },
  {
    title: 'Route name',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'Route URI',
    dataIndex: 'uri',
    width: 200,
  },
  {
    title: 'State',
    dataIndex: 'status',
    slots: { customRender: 'status' },
    width: 200,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Route ID',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: 'Route name',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'uri',
    label: 'Route URI',
    component: 'Input',
  },
  {
    field: 'predicates',
    label: 'Routing conditions',
    slot: 'predicates',
    component: 'Input',
  },
];
