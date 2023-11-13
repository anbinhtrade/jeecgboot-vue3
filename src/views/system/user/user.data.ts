import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllRolesListNoByTenant, getAllTenantList } from './user.api';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
export const columns: BasicColumn[] = [
  {
    title: 'User Accounts',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'AVATAR',
    dataIndex: 'avatar',
    width: 120,
    customRender: render.renderAvatar,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
  {
    title: 'BIRTHDAY',
    dataIndex: 'birthday',
    width: 100,
  },
  {
    title: 'Mobile phone number',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: 'DEPARTMENT',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: 'Responsible department',
    width: 150,
    dataIndex: 'departIds_dictText',
  },
  {
    title: 'STATE',
    dataIndex: 'status_dictText',
    width: 80,
  },
];

export const recycleColumns: BasicColumn[] = [
  {
    title: 'User Accounts',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'AVATAR',
    dataIndex: 'avatar',
    width: 80,
    customRender: render.renderAvatar,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex',
    width: 80,
    sorter: true,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'ACCOUNT',
    field: 'username',
    component: 'JInput',
    //colProps: { span: 6 },
  },
  {
    label: 'NAME',
    field: 'realname',
    component: 'JInput',
   //colProps: { span: 6 },
  },
  {
    label: 'GENDER',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Please select a gender',
      stringToNumber: true,
    },
    //colProps: { span: 6 },
  },
  {
    label: 'Mobile phone number',
    field: 'phone',
    component: 'Input',
    //colProps: { span: 6 },
  },
  {
    label: 'User status',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'user_status',
      placeholder: 'Please select a status',
      stringToNumber: true,
    },
   //colProps: { span: 6 },
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
    label: 'User Accounts',
    field: 'username',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'username', model, schema, true),
  },
  {
    label: 'Login password',
    field: 'password',
    component: 'StrengthMeter',
    rules: [
      {
        required: true,
        message: 'Please enter your login password',
      },
    ],
  },
  {
    label: 'Confirm your password',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
  {
    label: '用户姓名',
    field: 'realname',
    required: true,
    component: 'Input',
  },
  {
    label: 'Construction No.',
    field: 'workNo',
    required: true,
    component: 'Input',
    dynamicRules: ({ model, schema }) => ({ ...rules.duplicateCheckRule('sys_user', 'work_no', model, schema, true), trigger: 'blur' }),
  },
  {
    label: 'OFFICE',
    field: 'post',
    required: false,
    component: 'JSelectPosition',
    componentProps: {
      labelKey: 'name',
    },
  },
  {
    label: 'ROLE',
    field: 'selectedroles',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllRolesListNoByTenant,
      labelField: 'roleName',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: 'AFFILIATION',
    field: 'selecteddeparts',
    component: 'JSelectDept',
    componentProps: ({ formActionType, formModel }) => {
      return {
        sync: false,
        checkStrictly: true,
        defaultExpandLevel: 2,

        onSelect: (options, values) => {
          const { updateSchema } = formActionType;
          //所属部门修改后更新负责部门下拉框数据
          updateSchema([
            {
              field: 'departIds',
              componentProps: { options },
            },
          ]);
          //所属部门修改后更新负责部门数据
          formModel.departIds && (formModel.departIds = formModel.departIds.filter((item) => values.value.indexOf(item) > -1));
        },
      };
    },
  },
  {
    label: 'TENANT',
    field: 'relTenantIds',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllTenantList,
      numberToString: true,
      labelField: 'name',
      valueField: 'id',
      immediate: false,
    },
  },
  {
    label: 'IDENTITY',
    field: 'userIdentity',
    component: 'RadioGroup',
    defaultValue: 1,
    componentProps: ({ formModel }) => {
      return {
        options: [
          { label: 'Regular users', value: 1, key: '1' },
          { label: 'SUPERIOR', value: 2, key: '2' },
        ],
        onChange: () => {
          formModel.userIdentity == 1 && (formModel.departIds = []);
        },
      };
    },
  },
  {
    label: 'Responsible department',
    field: 'departIds',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
    },
    ifShow: ({ values }) => values.userIdentity == 2,
  },
  {
    label: 'AVATAR',
    field: 'avatar',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: 'BIRTHDAY',
    field: 'birthday',
    component: 'DatePicker',
  },
  {
    label: 'GENDER',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
      stringToNumber: true,
    },
  },
  {
    label: 'MAILBOX',
    field: 'email',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'email', model, schema, true)[0], trigger: 'blur' },
        { ...rules.rule('email', false)[0], trigger: 'blur' },
      ];
    },
  },
  {
    label: 'Mobile phone number',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, true)[0], trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: 'The format of the mobile phone number is incorrect', trigger: 'blur' },
      ];
    },
  },
  {
    label: 'LANDLINE',
    field: 'telephone',
    component: 'Input',
    rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: 'Please enter the correct landline number' }],
  },
  {
    label: 'Workflow engine',
    field: 'activitiSync',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'activiti_sync',
      type: 'radio',
      stringToNumber: true,
    },
  },
];

export const formPasswordSchema: FormSchema[] = [
  {
    label: 'User Accounts',
    field: 'username',
    component: 'Input',
    componentProps: { readOnly: true },
  },
  {
    label: 'Login password',
    field: 'password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: 'Please enter your login password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter your login password',
      },
    ],
  },
  {
    label: 'Confirm your password',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
];

export const formAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: 'USERNAME',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: 'Proxy username',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 10,
    },
  },
  {
    field: 'startTime',
    label: 'Agent start time',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Please select an agent start time',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: 'Agent end time',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Please select an agent end time',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

export const formQuitAgentSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'userName',
    label: 'USERNAME',
    component: 'Input',
    componentProps: {
      readOnly: true,
      allowClear: false,
    },
  },
  {
    field: 'agentUserName',
    label: 'Handover personnel',
    required: true,
    component: 'JSelectUser',
    componentProps: {
      rowKey: 'username',
      labelKey: 'realname',
      maxSelectCount: 1,
    },
  },
  {
    field: 'startTime',
    label: 'Handover start time',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Please select a handover start time',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'endTime',
    label: 'Handover end time',
    component: 'DatePicker',
    required: true,
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Please select an end time for handover',
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'status',
    label: 'STATE',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      dictCode: 'valid_status',
      type: 'radioButton',
    },
  },
];

//A list of tenant users
export const userTenantColumns: BasicColumn[] = [
  {
    title: 'User Accounts',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: 'User name',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'AVATAR',
    dataIndex: 'avatar',
    width: 120,
    customRender: render.renderAvatar,
  },
  {
    title: 'Mobile phone number',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: 'DEPARTMENT',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: 'STATE',
    dataIndex: 'status',
    width: 80,
    customRender: ({ text }) => {
      if (text === '1') {
        return 'NORMAL';
      } else if (text === '3') {
        return 'Under approval';
      } else {
        return 'REJECTED';
      }
    },
  },
];

//用户租户搜索表单
export const userTenantFormSchema: FormSchema[] = [
  {
    label: 'ACCOUNT',
    field: 'username',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'NAME',
    field: 'realname',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'GENDER',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Please select a gender',
      stringToNumber: true,
    },
    colProps: { span: 6 },
  },
];
