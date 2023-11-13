import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'Table name',
    dataIndex: 'dataTable',
    width: 150,
    align: 'left',
  },
  {
    title: 'Data ID',
    dataIndex: 'dataId',
    width: 350,
  },
  {
    title: 'Version number',
    dataIndex: 'dataVersion',
    width: 100,
  },
  {
    title: 'Data content',
    dataIndex: 'dataContent',
  },
  {
    title: 'Created by',
    dataIndex: 'createBy',
    sorter: true,
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dataTable',
    label: 'Table name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dataId',
    label: 'Data ID',
    component: 'Input',
    colProps: { span: 8 },
  },
];
