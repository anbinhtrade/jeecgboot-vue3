import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'NAME',
    dataIndex: 'testName',
    width: 200,
  },
  {
    title: 'VALUE',
    dataIndex: 'testValue',
    width: 180,
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'testName',
    label: 'NAME',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'testName',
    label: 'NAME',
    required: true,
    component: 'Input',
  },
  {
    field: 'testValue',
    label: 'VALUE',
    required: true,
    component: 'Input',
  },

  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
