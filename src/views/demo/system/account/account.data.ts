import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: 'USERNAME',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: 'NICKNAME',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: 'MAILBOX',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: 'ROLE',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: 'REMARK',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: 'USERNAME',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: 'NICKNAME',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: 'USERNAME',
    component: 'Input',
    helpMessage: ['This field demonstrates asynchronous validation', 'It is not possible to enter a username with admin'],
    rules: [
      {
        required: true,
        message: 'Please enter a username',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: 'PASSWORD',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: 'ROLE',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: 'AFFILIATION',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: 'NICKNAME',
    component: 'Input',
    required: true,
  },

  {
    label: 'MAILBOX',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: 'REMARK',
    field: 'remark',
    component: 'InputTextArea',
  },
];
