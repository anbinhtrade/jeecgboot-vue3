import { BasicColumn, FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';

export const columns: BasicColumn[] = [
  {
    title: 'Template title',
    dataIndex: 'templateName',
    width: 80,
  },
  {
    title: 'Template encoding',
    dataIndex: 'templateCode',
    width: 100,
  },
  {
    title: 'Notification templates',
    dataIndex: 'templateContent',
    width: 150,
  },
  {
    title: 'Template type',
    dataIndex: 'templateType',
    width: 100,
    customRender: ({ text }) => filterDictTextByCache('msgType', text),
  },
  {
    title: 'Whether it is applied or not',
    dataIndex: 'useStatus',
    width: 90,
    customRender: function ({ text }) {
      if (text == '1') {
        return 'BE';
      } else {
        return 'NOT';
      }
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Template title',
    field: 'templateName',
    component: 'Input',
  },
  {
    label: 'Template encoding',
    field: 'templateCode',
    component: 'Input',
  },
  {
    label: 'Template type',
    field: 'templateType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'msgType',
    },
  },
];

export const formSchemas: FormSchema[] = [
  {
    label: 'ID',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Template title',
    field: 'templateName',
    component: 'Input',
    required: true,
  },
  {
    label: 'Template encoding',
    field: 'templateCode',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [ ...rules.duplicateCheckRule('sys_sms_template', 'template_code', model, schema, true)];
    },
    // 编辑模式下不可修改编码
    dynamicDisabled: (params) => !!params.values.id,
  },
  {
    label: 'Template type',
    field: 'templateType',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'msgType',
      placeholder: 'Please select a template type',
    },
    required: true,
  },
  {
    label: 'Whether it is applied or not',
    field: 'useStatus',
    component: 'JSwitch',
    componentProps: {
      options: ['1', '0'],
    },
  },
  {
    label: 'Template content',
    field: 'templateContent',
    component: 'InputTextArea',
    componentProps: {
      autoSize: {
        minRows: 8,
        maxRows: 8,
      },
    },
    ifShow: ({ values }) => {
      return !['2', '4', '5'].includes(values.templateType);
    },
  },

  {
    label: 'Template content',
    field: 'templateContent',
    component: 'JEditor',
    ifShow: ({ values }) => {
      return ['2', '4'].includes(values.templateType);
    },
  },
  {
    label: 'Template content',
    field: 'templateContent',
    component: 'JMarkdownEditor',
    ifShow: ({ values }) => {
      return ['5'].includes(values.templateType);
    },
  },
];

export const sendTestFormSchemas: FormSchema[] = [
  {
    label: 'Template encoding',
    field: 'templateCode',
    component: 'Input',
    show: false,
  },
  {
    label: 'Template title',
    field: 'templateName',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    label: 'Template content',
    field: 'templateContent',
    component: 'InputTextArea',
    componentProps: { disabled: true, rows: 5 },
  },
  {
    label: 'Test data',
    field: 'testData',
    component: 'InputTextArea',
    required: true,
    helpMessage: 'JSON data',
    defaultValue: '{}',
    componentProps: {
      placeholder: 'Please enter the test data in JSON format',
      rows: 5,
    },
  },
  {
    label: 'The type of message',
    field: 'msgType',
    component: 'JDictSelectTag',
    required: true,
    defaultValue:'system',
    componentProps: { dictCode: 'messageType',type:'radio' },
  },
  {
    label: 'Message receiver',
    field: 'receiver',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      labelKey: 'username',
      rowKey: 'username',
    },
  },
];
