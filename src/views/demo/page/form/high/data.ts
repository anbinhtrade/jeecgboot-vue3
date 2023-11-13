import { FormSchema } from '/@/components/Form';

const basicOptions: LabelValueOptions = [
  {
    label: 'Fu Xiaoxiao',
    value: '1',
  },
  {
    label: 'Zhou Maomao',
    value: '2',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: 'PRIVATE',
    value: '1',
  },
  {
    label: 'PUBLIC',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: 'The name of the repository',
    required: true,
  },
  {
    field: 'f2',
    component: 'Input',
    label: 'Repository domain name',
    required: true,
    componentProps: {
      addonBefore: 'http://',
      addonAfter: 'com',
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f3',
    component: 'Select',
    label: 'Warehouse Administrator',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f4',
    component: 'Select',
    label: 'APPROVER',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 'f5',
    component: 'RangePicker',
    label: 'Effective Date',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f6',
    component: 'Select',
    label: 'Warehouse type',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
export const taskSchemas: FormSchema[] = [
  {
    field: 't1',
    component: 'Input',
    label: 'The name of the task',
    required: true,
  },
  {
    field: 't2',
    component: 'Input',
    label: 'Mission description',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't3',
    component: 'Select',
    label: 'EXECUTOR',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't4',
    component: 'Select',
    label: 'Responsible person',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 't5',
    component: 'TimePicker',
    label: 'Effective Date',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't6',
    component: 'Select',
    label: 'Task type',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
