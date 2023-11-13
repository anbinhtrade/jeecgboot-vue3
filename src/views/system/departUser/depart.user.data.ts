import { Ref } from 'vue';
import { duplicateCheck } from '/@/views/system/user/user.api';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { findTree } from '/@/utils/common/compUtils';

// 用户信息 columns
export const userInfoColumns: BasicColumn[] = [
  {
    title: 'User Accounts',
    dataIndex: 'username',
    width: 150,
  },
  {
    title: 'USERNAME',
    dataIndex: 'realname',
    width: 180,
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'orgCode',
    width: 200,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex_dictText',
    width: 80,
  },
  {
    title: 'PHONE',
    dataIndex: 'phone',
    width: 120,
  },
];

// 用户信息查询条件表单
export const userInfoSearchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'User Accounts',
    component: 'Input',
  },
];

// 部门角色 columns
export const departRoleColumns: BasicColumn[] = [
  {
    title: 'The name of the department role',
    dataIndex: 'roleName',
    width: 100,
  },
  {
    title: 'Department role code',
    dataIndex: 'roleCode',
    width: 100,
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'departId_dictText',
    width: 100,
  },
  {
    title: 'REMARK',
    dataIndex: 'description',
    width: 100,
  },
];

// 部门角色查询条件表单
export const departRoleSearchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'The name of the department role',
    component: 'Input',
  },
];

// 部门角色弹窗form表单
export const departRoleModalFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'roleName',
    label: 'The name of the department role',
    component: 'Input',
    rules: [
      { required: true, message: 'The department role name cannot be empty!' },
      { min: 2, max: 30, message: 'The length is in 2 ARRIVE 30 CHARACTERS', trigger: 'blur' },
    ],
  },
  {
    field: 'roleCode',
    label: 'Department role code',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model }) => {
      return [
        { required: true, message: 'The department role code cannot be empty！' },
        { min: 0, max: 64, message: 'The length cannot be exceeded 64 CHARACTERS', trigger: 'blur' },
        {
          validator: (_, value) => {
            if (/[\u4E00-\u9FA5]/g.test(value)) {
              return Promise.reject('You cannot enter Chinese characters for the department role code！');
            }
            return new Promise((resolve, reject) => {
              let params = {
                tableName: 'sys_depart_role',
                fieldName: 'role_code',
                fieldVal: value,
                dataId: model.id,
              };
              duplicateCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject(res.message || 'The verification failed');
                })
                .catch((err) => {
                  reject(err.message || 'Validation failed');
                });
            });
          },
        },
      ];
    },
  },
  {
    field: 'description',
    label: 'DESCRIPTION',
    component: 'Input',
    rules: [{ min: 0, max: 126, message: 'The length cannot be exceeded 126 CHARACTERS', trigger: 'blur' }],
  },
];

// 基本信息form
export function useBaseInfoForm(treeData: Ref<any[]>) {
  const descItems: DescItem[] = [
    {
      field: 'departName',
      label: 'Name of the institution',
    },
    {
      field: 'parentId',
      label: 'Superior department',
      render(val) {
        if (val) {
          let data = findTree(treeData.value, (item) => item.key == val);
          return data?.title ?? val;
        }
        return val;
      },
    },
    {
      field: 'orgCode',
      label: 'Mechanism code',
    },
    {
      field: 'orgCategory',
      label: 'Type of institution',
      render(val) {
        if (val === '1') {
          return 'FIRM';
        } else if (val === '2') {
          return 'DEPARTMENT';
        } else if (val === '3') {
          return 'POST';
        }
        return val;
      },
    },
    {
      field: 'departOrder',
      label: 'SORT',
    },

    {
      field: 'mobile',
      label: 'Mobile phone number',
    },
    {
      field: 'address',
      label: 'ADDRESS',
    },
    {
      field: 'memo',
      label: 'REMARK',
    },
  ];

  return { descItems };
}
