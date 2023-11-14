import { FormSchema } from '/@/components/Table';
import { isRoleExist } from './role.api';
export const columns = [
  {
    title: 'Role Name',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: 'ROLE CODING',
    dataIndex: 'roleCode',
    width: 100,
  },
  {
    title: 'CREATION TIME',
    dataIndex: 'createTime',
    width: 100,
  },
];
/**
 * 角色用户Columns
 */
export const userColumns = [
  {
    title: 'USER ACCOUNT',
    dataIndex: 'username',
  },
  {
    title: 'USERNAME',
    dataIndex: 'realname',
  },
  {
    title: 'TOPSY TURVY',
    dataIndex: 'status_dictText',
    width: 80,
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'Role Name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleCode',
    label: 'ROLE CODING',
    component: 'Input',
    colProps: { span: 6 },
  },
];
/**
 * Role user search form
 */
export const searchUserFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'USER ACCOUNT',
    component: 'Input',
    colProps: { span: 12 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'roleName',
    label: 'Role Name',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: 'ROLE CODING',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ values, model }) => {
      console.log('values:', values);
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('Please enter the role code');
            }
            if (values) {
              return new Promise((resolve, reject) => {
                isRoleExist({ id: model.id, roleCode: value })
                  .then((res) => {
                    res.success ? resolve() : reject(res.message || 'Verification failed');
                  })
                  .catch((err) => {
                    reject(err.message || 'VERIFICATION FAILED');
                  });
              });
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    label: 'REMARK',
    field: 'description',
    component: 'InputTextArea',
  },
];

export const formDescSchema = [
  {
    field: 'roleName',
    label: 'Role Name',
  },
  {
    field: 'roleCode',
    label: 'ROLE CODING',
  },
  {
    label: 'REMARK',
    field: 'description',
  },
];

export const roleIndexFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    label: 'ROLE CODING',
    field: 'roleCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: 'Home page routing',
    field: 'url',
    component: 'Input',
    required: true,
    helpMessage: 'Access address of home page routing',
  },
  {
    label: 'Component address',
    field: 'component',
    component: 'Input',
    helpMessage: 'Component address of home page routing',
    componentProps: {
      placeholder: 'Please enter the front-end component',
    },
    required: true,
  },
  {
    field: 'route',
    label: 'Whether to route menu',
    helpMessage: 'Set the non-routing menu to the homepage，Need to be turned on',
    component: 'Switch',
    defaultValue: true
  },
  {
    label: 'PRIORITY',
    field: 'priority',
    component: 'InputNumber',
  },
  {
    label: 'Whether to turn on',
    field: 'status',
    component: 'JSwitch',
    componentProps: {
      options: ['1', '0'],
    },
  },
];
