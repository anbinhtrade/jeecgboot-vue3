import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: 'Title',
    componentProps: {
      placeholder: 'Give the target a name',
    },
    required: true,
  },
  {
    field: 'time',
    component: 'RangePicker',
    label: 'Start and end dates',
    required: true,
  },
  {
    field: 'target',
    component: 'InputTextArea',
    label: 'Description of the target',
    componentProps: {
      placeholder: 'Please enter your milestones',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'metrics',
    component: 'InputTextArea',
    label: 'METRICS',
    componentProps: {
      placeholder: 'Please enter a metric',
      rows: 4,
    },
    required: true,
  },
  {
    field: 'client',
    component: 'Input',
    label: 'CLIENT',
    helpMessage: 'The target client',
    subLabel: '( OPTIONAL )',
    componentProps: {
      placeholder: 'Please describe the customers you serve，Internal customer direct @Name／Construction No.',
    },
  },
  {
    field: 'inviteer',
    component: 'Input',
    label: 'Invited Judges',
    subLabel: '( OPTIONAL )',
    componentProps: {
      placeholder: 'Please be direct @姓名／工号，最多可邀请@姓名/job number, up to a maximum of an invite 5 人',
    },
  },
  {
    field: 'weights',
    component: 'InputNumber',
    label: 'WEIGHT',
    subLabel: '( OPTIONAL )',
    componentProps: {
      formatter: (value: string) => (value ? `${value}%` : ''),
      parser: (value: string) => value.replace('%', ''),
      placeholder: 'Please enter',
    },
  },
  {
    field: 'disclosure',
    component: 'RadioGroup',
    label: 'Target disclosure',
    itemProps: {
      extra: 'CLIENT、Reviewers are shared by default',
    },
    componentProps: {
      options: [
        {
          label: 'PUBLIC',
          value: '1',
        },
        {
          label: 'Partially public',
          value: '2',
        },
        {
          label: 'Not public',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'disclosurer',
    component: 'Select',
    label: ' ',
    show: ({ model }) => {
      return model.disclosure === '2';
    },
    componentProps: {
      placeholder: 'Open to give',
      mode: 'multiple',
      options: [
        {
          label: 'Ditto 1',
          value: '1',
        },
        {
          label: 'Ditto 2',
          value: '2',
        },
        {
          label: 'Ditto 3',
          value: '3',
        },
      ],
    },
  },
];
