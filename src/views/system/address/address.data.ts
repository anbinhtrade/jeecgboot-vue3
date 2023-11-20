import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'Name',
    dataIndex: 'realname',
    width: 150,
  },
  {
    title: 'Construction No.',
    dataIndex: 'workNo',
    width: 100,
  },
  {
    title: 'Department',
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
    title: 'Telephone',
    width: 150,
    dataIndex: 'telephone',
  },
  {
    title: 'Email',
    width: 150,
    dataIndex: 'email',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Name',
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
