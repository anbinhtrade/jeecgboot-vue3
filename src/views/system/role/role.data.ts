import { FormSchema } from '/@/components/Table';
import { isRoleExist } from './role.api';
export const columns = [
  {
    title: 'Tên',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: 'Mã',
    dataIndex: 'roleCode',
    width: 100,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createTime',
    width: 100,
  },
];
/**
 * 角色用户Columns
 */
export const userColumns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
  },
  {
    title: 'Họ tên',
    dataIndex: 'realname',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status_dictText',
    width: 80,
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'Tên',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'roleCode',
    label: 'Mã',
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
    label: 'Tên đăng nhập',
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
    label: 'Tên',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: 'Mã',
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
              return Promise.reject('Hãy nhập mã vai trò');
            }
            if (values) {
              return new Promise((resolve, reject) => {
                isRoleExist({ id: model.id, roleCode: value })
                  .then((res) => {
                    res.success ? resolve() : reject(res.message || 'Mã vai trò đã tồn tại');
                  })
                  .catch((err) => {
                    reject(err.message || 'Mã vai trò đã tồn tại');
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
    label: 'Mô tả',
    field: 'description',
    component: 'InputTextArea',
  },
];

export const formDescSchema = [
  {
    field: 'roleName',
    label: 'Tên',
  },
  {
    field: 'roleCode',
    label: 'Mã',
  },
  {
    label: 'Mô tả',
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
    label: 'Mã',
    field: 'roleCode',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: 'Đường dẫn trang chủ',
    field: 'url',
    component: 'Input',
    required: true,
    helpMessage: 'Đường dẫn trang chủ',
  },
  {
    label: 'Component',
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
    label: 'Priority',
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
