import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'Log content',
    dataIndex: 'logContent',
    width: 100,
    align: 'left',
  },
  {
    title: 'Operator ID',
    dataIndex: 'userid',
    width: 80,
  },
  {
    title: 'Operator',
    dataIndex: 'username',
    width: 80,
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    width: 80,
  },
  {
    title: 'Time Taken (ms)',
    dataIndex: 'costTime',
    width: 80,
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    sorter: true,
    width: 80,
  },
  {
    title: 'Log type',
    dataIndex: 'logType_dictText',
    width: 60,
  },
];

/**
 * The operation type is required for the operation log
 */
export const operationLogColumn: BasicColumn[] = [
  ...columns,
  {
    title: 'The type of operation',
    dataIndex: 'operateType_dictText',
    width: 40,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyWord',
    label: 'Search logs',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: 'Creation time',
    componentProps: {
      valueType: 'Date',
    },
    colProps: {
      span: 8,
    },
  },
];
