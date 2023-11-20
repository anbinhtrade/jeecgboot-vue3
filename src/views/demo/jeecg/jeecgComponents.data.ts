import { FormSchema, JCronValidator } from '/@/components/Form';
import { usePermission } from '/@/hooks/web/usePermission';

const { isDisabledAuth } = usePermission();
export const schemas: FormSchema[] = [
  {
    field: 'jdst',
    component: 'JDictSelectTag',
    label: 'Gender drop-down',
    helpMessage: ['componentMODE'],
    componentProps: {
      dictCode: 'sex',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'jdst',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'jdst1',
    component: 'JDictSelectTag',
    label: 'Gender selection',
    helpMessage: ['componentMODE'],
    componentProps: {
      dictCode: 'sex',
      type: 'radioButton',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'jdst1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'jdst2',
    component: 'JDictSelectTag',
    label: 'Dictionary table drop-down',
    helpMessage: ['componentMODE'],
    componentProps: {
      dictCode: 'sys_user,realname,id',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'jdst2',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'jdst3',
    component: 'JDictSelectTag',
    label: 'Dictionary table drop-down (with conditional)',
    helpMessage: ['componentMODE'],
    componentProps: {
      dictCode: "sys_user,realname,id,username!='admin' order by create_time",
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'jdst3',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'jsst',
    component: 'JSearchSelect',
    label: 'Dictionary Search (Sync)',
    colProps: { span: 12 },
    componentProps: {
      //dict: "sys_depart,depart_name,id",
      dictOptions: [
        {
          text: 'Option one',
          value: '1',
        },
        {
          text: 'Option two',
          value: '2',
        },
        {
          text: 'Option three',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'jsst',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'jsst2',
    component: 'JSearchSelect',
    label: 'Dictionary search (asynchronous)',
    colProps: { span: 12 },
    componentProps: {
      dict: 'sys_depart,depart_name,id',
      pageSize: 6,
      async: true,
    },
  },
  {
    field: 'jsst2',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'xldx',
    component: 'JDictSelectTag',
    label: 'Dictionary drop-down for multiple choices',
    colProps: { span: 12 },
    componentProps: {
      dictCode: 'sex',
      mode: 'multiple',
    },
  },
  {
    field: 'xldx',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'xldx2',
    component: 'JSelectMultiple',
    label: 'Select 2 from the dictionary drop-down',
    colProps: { span: 12 },
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    field: 'xldx2',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'dxxlk',
    component: 'JDictSelectTag',
    label: 'Dictionary drop-down single-selection',
    colProps: { span: 12 },
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    field: 'dxxlk',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    label: 'You can enter a drop-down',
    field: 'selectInput',
    component: 'JSelectInput',
    componentProps: {
      options: [
        { label: 'Option one', value: '1' },
        { label: 'Option two', value: '2' },
        { label: 'Option three', value: '3' },
      ],
    },
    colProps: { span: 12 },
  },
  {
    field: 'selectInput',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'depart3',
    component: 'JSelectDept',
    label: 'Select Department—Custom value',
    helpMessage: ['componentMODE'],
    componentProps: { showButton: false, rowKey: 'orgCode', primaryKey: 'orgCode' },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'depart3',
    component: 'JEllipsis',
    label: 'Select the department',
    colProps: { span: 12 },
  },
  {
    field: 'depart2',
    component: 'JSelectDept',
    label: 'Select a department',
    helpMessage: ['componentMODE'],
    componentProps: { showButton: false },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'depart2',
    component: 'JEllipsis',
    label: 'Select the department',
    colProps: { span: 12 },
  },
  {
    field: 'user2',
    component: 'JSelectUser',
    label: 'The user selects the component',
    helpMessage: ['componentMODE'],
    componentProps: {
      labelKey: 'realname',
      rowKey: 'id',
      showSelected: true,
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'user2',
    component: 'JEllipsis',
    label: 'Select the user',
    colProps: { span: 12 },
  },
  {
    field: 'user3',
    component: 'JSelectUserByDept',
    label: 'Department selects the user',
    helpMessage: ['componentMODE'],
    componentProps: {
      labelKey: 'realname',
      rowKey: 'username',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'user3',
    component: 'JEllipsis',
    label: 'Select the user',
    colProps: { span: 12 },
  },
  {
    field: 'role2',
    component: 'JSelectRole',
    label: 'Role Selection Component',
    helpMessage: ['componentMODE'],
    colProps: {
      span: 12,
    },
  },
  {
    field: 'role2',
    component: 'JEllipsis',
    label: 'Select the role',
    colProps: { span: 12 },
  },
  {
    field: 'position2',
    component: 'JSelectPosition',
    label: 'Job Title Selection Component',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
    componentProps: { async: true, showSelectTable: true },
  },
  {
    field: 'position2',
    component: 'JEllipsis',
    label: 'Select the job title',
    colProps: { span: 12 },
  },
  {
    field: 'checkbox1',
    component: 'JCheckbox',
    label: 'JCheckboxSUBASSEMBLY1',
    helpMessage: ['componentMODE'],
    defaultValue: '1,2',
    componentProps: {
      options: [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
      ],
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'checkbox1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'checkbox2',
    component: 'Input',
    label: 'JCheckboxSUBASSEMBLY2',
    defaultValue: '1',
    helpMessage: ['Slot mode'],
    slot: 'JCheckbox',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'checkbox2',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'data1',
    label: 'Date selection',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'data1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'data2',
    label: 'Year range selection',
    component: 'RangePicker',
    componentProps: {
      picker: 'year',
      valueFormat: 'YYYY',
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'data2',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'hk',
    component: 'Input',
    label: 'Slider captcha',
    helpMessage: ['Slot mode'],
    slot: 'dargVerify',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'hk',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'JTreeDict',
    component: 'JTreeDict',
    label: 'Tree Dictionary',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
  },
  {
    field: 'JTreeDict',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'ts',
    component: 'JTreeSelect',
    label: 'Drop-down tree selection',
    helpMessage: ['componentMODE'],
    componentProps: {
      dict: 'sys_permission,name,id',
      pidField: 'parent_id',
      hasChildField: 'is_leaf',
      converIsLeafVal: 0,
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'ts',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'ts1',
    component: 'JTreeSelect',
    label: 'Drop-down tree for multiple selections',
    helpMessage: ['componentMODE'],
    componentProps: {
      dict: 'sys_permission,name,id',
      pidField: 'parent_id',
      hasChildField: 'is_leaf',
      converIsLeafVal: 0,
      multiple: true,
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'ts1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'category',
    component: 'JCategorySelect',
    label: 'Classification dictionary tree',
    helpMessage: ['component模式'],
    defaultValue: '',
    componentProps: {
      pcode: 'B01',
      multiple: true,
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'category',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'JEasyCron',
    component: 'JEasyCron',
    label: 'JEasyCron',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
    defaultValue: '* * * * * ? *',
    rules: [{ validator: JCronValidator }],
  },
  {
    field: 'JEasyCron',
    component: 'JEllipsis',
    label: 'Select a value',
    colProps: { span: 12 },
  },
  {
    field: 'JInput',
    component: 'JInput',
    label: 'Special query components',
    helpMessage: ['Slot mode'],
    slot: 'JInput',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'jinputtype',
    component: 'Select',
    label: 'The type of query',
    componentProps: {
      options: [
        { value: 'like', label: 'Blur (like)' },
        { value: 'ne', label: 'Not equal to (ne)' },
        { value: 'ge', label: 'Greater than or equal to (GE)' },
        { value: 'le', label: 'Less than or equal to (le)' },
      ],
    },
    colProps: {
      span: 6,
    },
  },
  {
    field: 'JInput',
    component: 'JEllipsis',
    label: 'Enter a value',
    colProps: { span: 6 },
  },
  {
    field: 'field1',
    component: 'Select',
    label: 'Provincial and municipal selection',
    helpMessage: ['Slot mode'],
    slot: 'jAreaLinkage',
    colProps: {
      span: 12,
    },
    defaultValue: ['130000', '130200'],
  },
  {
    field: 'field1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'field0',
    component: 'Select',
    label: '禁用组件(方式一)Disabling a Component (Mode 1)',
    helpMessage: ['Slot mode'],
    slot: 'jAreaLinkage1',
    colProps: {
      span: 12,
    },
    defaultValue: ['130000', '130200'],
  },

  {
    field: 'field0',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'field2',
    component: 'JAreaLinkage',
    label: 'Disabling a Component (Method 2)',
    helpMessage: ['componentMODE'],
    colProps: {
      span: 12,
    },
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    defaultValue: ['140000', '140300', '140302'],
  },
  {
    field: 'field2',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'pca1',
    component: 'JAreaSelect',
    label: 'Provincial and municipal cascades',
    helpMessage: ['componentMODE'],
    defaultValue: '140302',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'pca1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'pop1',
    component: 'Input',
    label: 'JPopupEXAMPLE',
    helpMessage: ['Slot mode'],
    slot: 'JPopup',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'pop1',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'JInputPop',
    component: 'JInputPop',
    label: 'JInputPop',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
  },
  {
    field: 'JInputPop',
    component: 'JEllipsis',
    label: 'Enter a value',
    colProps: { span: 12 },
  },
  {
    field: 'JTreeDictAsync',
    component: 'JTreeDict',
    label: 'Asynchronous',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
    componentProps: { async: true },
  },
  {
    field: 'JTreeDictAsync',
    component: 'JEllipsis',
    label: 'Selected Values',
    colProps: { span: 12 },
  },
  {
    field: 'JSwitch',
    component: 'JSwitch',
    label: 'Jswitch',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
  },
  {
    field: 'JSwitch',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  {
    field: 'JSwitchSelect',
    component: 'JSwitch',
    label: 'JSwitchSelect',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
    componentProps: { query: true },
  },
  {
    field: 'JSwitchSelect',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  
  {
    field: 'userSelect2',
    component: 'UserSelect',
    label: 'Advanced user selection',
    helpMessage: ['componentMODE'],
    colProps: { span: 12 },
  },
  {
    field: 'userSelect2',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
  
  {
    field: 'superQuery',
    component: 'Input',
    label: 'Advanced queries',
    helpMessage: ['Slot mode'],
    slot: 'superQuery',
    colProps: { span: 12 },
  },
  {
    field: 'superQuery',
    component: 'JEllipsis',
    label: 'Selected values',
    colProps: { span: 12 },
  },
];
