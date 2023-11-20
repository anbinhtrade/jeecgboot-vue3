import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'The name of the role',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: 'Role value',
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: 'SORT',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: 'ENABLED',
        unCheckedChildren: 'DISABLED',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`The role status was successfully modified`);
            })
            .catch(() => {
              createMessage.error('Failed to modify the role status');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: 'REMARK',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: 'The name of the role',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'ENABLE', value: '0' },
        { label: 'DEACTIVATED', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: 'The name of the role',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: 'Role value',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: 'ENABLE', value: '0' },
        { label: 'DEACTIVATED', value: '1' },
      ],
    },
  },
  {
    label: 'REMARK',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
