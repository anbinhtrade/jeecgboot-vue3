import { BasicColumn, FormSchema } from '/@/components/Table';
import { duplicateCheck } from '/@/views/system/user/user.api';

export const columns: BasicColumn[] = [
  {
    title: 'Rule Name',
    dataIndex: 'ruleName',
    width: 200,
    align: 'center',
  },
  {
    title: 'Rule Code',
    dataIndex: 'ruleCode',
    width: 200,
    align: 'center',
  },
  {
    title: 'Rule Class',
    dataIndex: 'ruleClass',
    width: 300,
    align: 'center',
  },
  {
    title: 'Rule parameters',
    dataIndex: 'ruleParams',
    width: 200,
    align: 'center',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ruleName',
    label: 'Rule Name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'ruleCode',
    label: 'Rule Code',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'ruleName',
    label: 'Rule Name',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'ruleCode',
    label: 'Rule Code',
    component: 'Input',
    colProps: { span: 24 },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            return new Promise((resolve, reject) => {
              if (!value) {
                return reject('Please enter the rule code!');
              }
              let params = {
                tableName: 'sys_fill_rule',
                fieldName: 'rule_code',
                fieldVal: value,
                dataId: model.id,
              };
              duplicateCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject('The rule coding already exists!');
                })
                .catch((err) => {
                  reject(err.message || 'The verification failed');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'ruleClass',
    label: 'Rule Class',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'ruleParams',
    label: 'Rule parameters',
    colProps: { span: 24 },
    component: 'JAddInput',
    componentProps: {
      min: 0,
    },
  },
];
