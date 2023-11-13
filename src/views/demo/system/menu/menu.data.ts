import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: 'Menu name',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: 'ICON',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: 'Permission ID',
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: 'SUBASSEMBLY',
    dataIndex: 'component',
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
      const text = enable ? 'ENABLE' : 'DEACTIVATED';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    width: 180,
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: 'Menu name',
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
    field: 'type',
    label: 'Menu type',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'DIRECTORY', value: '0' },
        { label: 'MENU', value: '1' },
        { label: 'BUTTON', value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: 'Menu name',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentMenu',
    label: 'Parent menu',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'menuName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'orderNo',
    label: 'SORT',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: 'ICON',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: 'Routing address',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: 'Component path',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: 'Permission ID',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'ENABLE', value: '0' },
        { label: 'DISABLE', value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: 'Whether a backlink',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'NOT', value: '0' },
        { label: 'BE', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: 'Whether or not to cache',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'NOT', value: '0' },
        { label: 'BE', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: 'Whether it is displayed or not',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'BE', value: '0' },
        { label: 'NOT', value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
