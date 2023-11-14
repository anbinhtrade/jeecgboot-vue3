import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: 'Department name',
    dataIndex: 'deptName',
    width: 160,
    align: 'left',
  },
  {
    title: 'SORT',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: 'STATE',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: 'REMARK',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: 'Department name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'ENABLE', value: '0' },
        { label: 'DEACTIVATED', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: 'Department name',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentDept',
    label: 'Superior department',
    component: 'TreeSelect',

    componentProps: {
      replaceFields: {
        title: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'orderNo',
    label: 'SORT',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'ENABLE', value: '0' },
        { label: 'DEACTIVATED', value: '1' },
      ],
    },
    required: true,
  },
  {
    label: 'REMARK',
    field: 'remark',
    component: 'InputTextArea',
  },
];
