import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'PARAMETER',
    dataIndex: 'param',
    width: 80,
    align: 'left',
    slots: { customRender: 'param' },
  },
  {
    title: 'Description',
    dataIndex: 'text',
    slots: { customRender: 'text' },
    width: 80,
  },
  {
    title: 'Current value',
    dataIndex: 'value',
    slots: { customRender: 'value' },
    width: 80,
  },
];
