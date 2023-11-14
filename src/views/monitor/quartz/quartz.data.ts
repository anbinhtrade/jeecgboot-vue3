import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { JCronValidator } from '/@/components/Form';

export const columns: BasicColumn[] = [
  {
    title: 'The name of the task class',
    dataIndex: 'jobClassName',
    width: 200,
    align: 'left',
  },
  {
    title: 'Cron expression',
    dataIndex: 'cronExpression',
    width: 200,
  },
  {
    title: 'PARAMETER',
    dataIndex: 'parameter',
    width: 200,
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: 'STATE',
    dataIndex: 'status',
    width: 100,
    customRender: ({ text }) => {
      const color = text == '0' ? 'green' : text == '-1' ? 'red' : 'gray';
      return render.renderTag(render.renderDict(text, 'quartz_status'), color);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobClassName',
    label: 'The name of the task class',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: 'Task status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'quartz_status',
      stringToNumber: true,
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'jobClassName',
    label: 'The name of the task class',
    component: 'Input',
    required: true,
  },
  {
    field: 'cronExpression',
    label: 'Cron expression',
    component: 'JEasyCron',
    defaultValue: '* * * * * ? *',
    rules: [{ required: true, message: 'Please enter a Cron expression' }, { validator: JCronValidator }],
  },
  {
    field: 'paramterType',
    label: 'Parameter type',
    component: 'Select',
    defaultValue: 'string',
    componentProps: {
      options: [
        { label: 'STRING', value: 'string' },
        { label: 'JSONOBJECT', value: 'json' },
      ],
    },
  },
  {
    field: 'parameter',
    label: 'PARAMETER',
    component: 'InputTextArea',
    ifShow: ({ values }) => {
      return values.paramterType == 'string';
    },
  },
  {
    field: 'parameter',
    label: 'PARAMETER',
    component: 'JAddInput',
    helpMessage: 'Enter a key-value pair',
    ifShow: ({ values }) => {
      return values.paramterType == 'json';
    },
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'quartz_status',
      type: 'radioButton',
      stringToNumber: true,
      dropdownStyle: {
        maxHeight: '6vh',
      },
    },
  },
  {
    field: 'description',
    label: 'DESCRIPTION',
    component: 'InputTextArea',
  },
];
