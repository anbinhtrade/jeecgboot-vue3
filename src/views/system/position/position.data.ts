import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  // {
  //   title: 'Job title code',
  //   dataIndex: 'code',
  //   width: 200,
  //   align: 'left',
  // },
  {
    title: 'Job title',
    dataIndex: 'name',
    align: 'left'
    // width: 200,
  },
  // {
  //   title: 'Job Title',
  //   dataIndex: 'postRank_dictText',
  //   width: 100,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Job title',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: 'Primary key',
    field: 'id',
    component: 'Input',
    show: false,
  },
  // {
  //   label: 'RANK',
  //   field: 'postRank',
  //   component: 'JDictSelectTag',
  //   required: true,
  //   componentProps: {
  //     dictCode: 'position_rank',
  //     dropdownStyle: {
  //       maxHeight: '100vh',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  // },
  {
    field: 'name',
    label: 'Job title',
    component: 'Input',
    required: true,
  },
  // {
  //   field: 'code',
  //   label: 'Job title code',
  //   component: 'Input',
  //   required: true,
  //   dynamicDisabled: ({ values }) => {
  //     return !!values.id;
  //   },
  //   dynamicRules: ({ model, schema }) => {
  //     return rules.duplicateCheckRule('sys_position', 'code', model, schema, true);
  //   },
  // },
];
