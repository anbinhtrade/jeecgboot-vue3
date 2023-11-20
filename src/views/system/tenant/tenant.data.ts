import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from "/@/utils/common/renderUtils";
import { rules } from "/@/utils/helper/validator";

export const columns: BasicColumn[] = [
  {
    title: 'Tenant name',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: 'Tenant Id',
    dataIndex: 'id',
    width: 180,
  },{
    title: 'Logo',
    dataIndex: 'companyLogo',
    width: 100,
    customRender: ({ text }) => {
      if(!text){
        return text;
      }
      return render.renderImage({text});
    },
  },
  {
    dataIndex: 'trade_dictText',
    title: 'Industry',
    width: 150
  },
  {
    dataIndex: 'companySize_dictText',
    title: 'The size of the company',
    width: 100
  },
  {
    dataIndex: 'houseNumber',
    title: 'Number',
    width: 100,
  },
  {
    dataIndex: 'position_dictText',
    title: 'RANK',
    width: 150
  },
  {
    dataIndex: 'department_dictText',
    title: 'Department',
    width: 150
  },
  {
    dataIndex: 'createBy_dictText',
    title: 'Created by',
    width: 150
  },
/*  {
    title: 'Start time',
    dataIndex: 'beginDate',
    sorter: true,
    width: 180,
  },
  {
    title: 'End time',
    dataIndex: 'endDate',
    sorter: true,
    width: 180,
  },*/
  {
    title: 'Status',
    dataIndex: 'status_dictText',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Tenant name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: 'Status',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'Normal', value: 1 },
        { label: 'Freeze', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
  // {
  //   field: 'fieldTime',
  //   component: 'RangePicker',
  //   label: '时间字段',
  //   componentProps: {
  //     valueType: 'Date',
  //   },
  //   colProps: {
  //     span: 8,
  //   },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Tenant name',
    component: 'Input',
    required: true,
  },
  {
    field: 'id',
    label: 'Tenant ID',
    component: 'InputNumber',
    required: true,
    ifShow: ({ values }) => {
      return values.id!=null;
    },
  },
  {
    field: 'companyLogo',
    label: 'Logo',
    component: 'JImageUpload',
    componentProps:{
      text:'logo'
    }
  },
  {
    field: 'trade',
    label: 'Industry',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode:'trade',
    }
  }, {
    field: 'companySize',
    label: 'The size of the company',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode:'company_size',
    }
  }, {
    field: 'companyAddress',
    label: 'Company address',
    component: 'InputTextArea',
    componentProps: {
      placeholder: 'Please enter your business address',
      rows: 4,
    }
  },
/*  {
    field: 'beginDate',
    label: 'Start time',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      getPopupContainer: getAutoScrollContainer,
    },
  },
  {
    field: 'endDate',
    label: 'End time',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      getPopupContainer: getAutoScrollContainer,
    },
  },*/
  {
    field: 'houseNumber',
    label: 'Number',
    component: 'Input',
    dynamicDisabled: true,
    ifShow: ({ values }) => {
      return values.id!=null;
    },
  },
  {
    field: 'position',
    label: 'RANK',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: 'company_rank'
    }
  },
  {
    field: 'department',
    label: 'Department',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:'company_department'
    }
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: 'Normal', value: 1 },
        { label: 'Freeze', value: 0 },
      ],
    },
  },
];

//Define user table columns
export const userColumns: BasicColumn[] =[
  {
    title: 'User Name',
    dataIndex: 'username',
    width: 100,
    align: 'left',
  },
  {
    title: 'User name',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex_dictText',
    width: 100,
  },
  {
    title: 'Mobile phone number',
    dataIndex: 'phone',
    width: 100,
  },
];

//Invite users to search for the form
export const userSearchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'User Name',
    component: 'Input',
  },
  {
    field: 'realname',
    label: 'Real Name',
    component: 'Input',
  },
];

//A list of product packages
export const packColumns: BasicColumn[] = [
  {
    title: 'Pack Name',
    dataIndex: 'packName',
    width: 100,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    customRender: ({ text }) => {
      if (text === '1') {
        return 'Open';
      } else {
        return 'Shut down';
      }
    },
  },
  {
    title: 'Remarks',
    dataIndex: 'remarks',
    width: 150,
  },
];

//Package search form
export const packFormSchema: FormSchema[] = [
  {
    field: 'packName',
    label: 'Pack Name',
    component: 'JInput',
    colProps: { xxl: 8 },
  },
];

//Package form
export const packMenuFormSchema: FormSchema[] = [
  {
    field: 'packName',
    label: 'Package Name',
    component: 'Input',
  },
  {
    field: 'permissionIds',
    label: 'Menu List',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'sys_permission,name,id',
      pidField: 'parent_id',
      multiple: true,
      treeCheckAble:true,
      treeCheckStrictly: true,
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'remarks',
    label: 'Description',
    component: 'InputTextArea',
  },
  {
    field: 'status',
    label: 'ON',
    component: 'Switch',
    componentProps: {
      checkedValue: '1',
      checkedChildren: 'OPEN',
      unCheckedValue: '0',
      unCheckedChildren: 'Shut down',
    },
    defaultValue: '1',
  },
  {
    field: 'id',
    label: 'ON',
    component: 'Input',
    show: false
  },
];

//Recycle bin list
export const recycleColumns : BasicColumn[] = [
  {
    title: 'Tenant name',
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: 'Tenant ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'Logo',
    dataIndex: 'companyLogo',
    width: 100,
    customRender: ({ text }) => {
      if(!text){
        return text;
      }
      return render.renderImage({text});
    },
  },
  {
    dataIndex: 'houseNumber',
    title: 'Number',
    width: 100,
  }
]

//租户回收站搜索表单
export const searchRecycleFormSchema : FormSchema[] = [
  {
    field: 'name',
    label: 'Tenant name',
    component: 'Input',
  },
  {
    field: 'houseNumber',
    label: 'Number',
    component: 'Input',
  },
]

//产品包用户列表
export const tenantPackUserColumns: BasicColumn[] = [
  {
    title: 'Real Name',
    dataIndex: 'realname',
    width: 200,
  },
  {
    title: 'Department',
    dataIndex: 'departNames',
    width: 200,
    ellipsis: true,
    slots: { customRender: 'departNames' }
  },
  {
    title: 'Position',
    dataIndex: 'positionNames',
    ellipsis: true,
    width: 200,
    slots: { customRender: 'positionNames' }
  }
]

/**
 * A new edit form has been added to the user tenant
 */
export const tenantUserSchema: FormSchema[] = [
  { field: 'id', label: 'id', component: 'Input', show: false },
  { field: 'username', label: 'username', component: 'Input', show: false },
  {
    field: 'realname',
    label: 'Name',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    field: 'phone',
    label: 'Phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      if (model.id) {
        return [];
      }
      return [{ ...rules.phone(true)[0] }, { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, false)[0] }];
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      if (model.id) {
        return [];
      }
      return [{ ...rules.email(true)[0] }, { ...rules.duplicateCheckRule('sys_user', 'email', model, schema, false)[0] }];
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  { field: 'selecteddeparts', label: 'Department', component: 'JSelectDept', componentProps: { checkStrictly: true } },
  {
    field: 'post',
    label: 'Position',
    component: 'JSelectPosition',
  },
  {
    field: 'workNo',
    label: 'Construction No.',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: 'Please enter your work number' }, { ...rules.duplicateCheckRule('sys_user', 'work_no', model, schema, false)[0] }];
    },
  },
  { field: 'relTenantIds', label: 'TENANT', component: 'Input',show:false },
  { field: 'selectedroles', label: 'ROLE', component: 'Input',show:false },
];
