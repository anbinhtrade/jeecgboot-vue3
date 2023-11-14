import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'NAME',
    dataIndex: 'realname',
    width: 150,
  },
  {
    title: 'Construction No.',
    dataIndex: 'workNo',
    width: 100,
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'departName',
    width: 200,
  },
  {
    title: 'OFFICE',
    dataIndex: 'post',
    width: 150,
    slots: { customRender: 'post' },
  },
  {
    title: 'CELL PHONE',
    width: 150,
    dataIndex: 'telephone',
  },
  {
    title: 'MAILBOX',
    width: 150,
    dataIndex: 'email',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'NAME',
    field: 'realname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'Construction No.',
    field: 'workNo',
    component: 'Input',
    colProps: { span: 6 },
  },
];
