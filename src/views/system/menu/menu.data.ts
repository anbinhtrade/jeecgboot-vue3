import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { ajaxGetDictItems ,checkPermDuplication } from './menu.api';
import { render } from '/@/utils/common/renderUtils';

const isDir = (type) => type === 0;
const isMenu = (type) => type === 1;
const isButton = (type) => type === 2;

// Define the types of components that can be selected
export enum ComponentTypes {
  Default = 'layouts/default/index',
  IFrame = 'sys/iframe/FrameBlank',
}

export const columns: BasicColumn[] = [
  {
    title: 'Menu Name',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: 'Menu type',
    dataIndex: 'menuType',
    width: 150,
    customRender: ({ text }) => {
      return render.renderDict(text, 'menu_type');
    },
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: 'Component',
    dataIndex: 'component',
    align: 'left',
    width: 150,
  },
  {
    title: 'Path',
    dataIndex: 'url',
    align: 'left',
    width: 150,
  },
  {
    title: 'Sort',
    dataIndex: 'sortNo',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Menu Name',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'menuType',
    label: 'Menu type',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: ({ formActionType, formModel }) => {
      return {
        options: [
          { label: 'Level 1 menu', value: 0 },
          { label: 'Sub-menu', value: 1 },
          { label: 'Buttons/Permissions', value: 2 },
        ],
        onChange: (e) => {
          const { updateSchema, clearValidate } = formActionType;
          const label = isButton(e) ? 'Buttons/Permissions' : 'Menu Name';
          //清除校验
          clearValidate();
          updateSchema([
            {
              field: 'name',
              label: label,
            },
            {
              field: 'url',
              required: !isButton(e),
            },
          ]);
          //update-begin---author:wangshuai ---date:20220729  for：[VUEN-1834]只有一级菜单，才默认值，子菜单的时候，清空------------
          if (isMenu(e) && !formModel.id && (formModel.component=='layouts/default/index' || formModel.component=='layouts/RouteView')) {
            formModel.component = '';
          }
          //update-end---author:wangshuai ---date:20220729  for：[VUEN-1834]只有一级菜单，才默认值，子菜单的时候，清空------------
        },
      };
    },
  },
  {
    field: 'name',
    label: 'Menu Name',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: 'Parent Menu',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      //update-begin---author:wangshuai ---date:20230829  for：replaceFields已过期，使用fieldNames代替------------
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      //update-end---author:wangshuai ---date:20230829  for：replaceFields已过期，使用fieldNames代替------------
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: (node) => node.parentNode,
    },
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'url',
    label: 'Access Path',
    component: 'Input',
    required: true,
    //update-begin-author:liusq date:2023-06-06 for: [issues/5008]子表数据权限设置不生效
    ifShow: ({ values }) => !(values.component === ComponentTypes.IFrame && values.internalOrExternal),
    //update-begin-author:zyf date:2022-11-02 for: 聚合路由允许路径重复
     dynamicRules: ({ model, schema,values }) => {
       return checkPermDuplication(model, schema,  values.menuType !== 2?true:false);
    },
    //update-end-author:zyf date:2022-11-02 for: 聚合路由允许路径重复
    //update-end-author:liusq date:2022-06-06 for:  [issues/5008]子表数据权限设置不生效
  },
  {
    field: 'component',
    label: 'Front-end Components',
    component: 'Input',
    componentProps: {
      placeholder: 'Please enter the front-end component',
    },
    defaultValue:'layouts/default/index',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'componentName',
    label: 'Component Name',
    component: 'Input',
    componentProps: {
      placeholder: 'Please enter a component name',
    },
    helpMessage: [
      'The name of this parameter should be the same as the name attribute of the vue component.',
      'The component name cannot be duplicated and is mainly used for route caching.',
      'If the name attribute of the component is inconsistent with the name attribute of the vue component, the route cache will be invalidated.',
      'If it is not required, it will be automatically generated based on the access path.',
    ],
    defaultValue: '',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'frameSrc',
    label: 'Iframe Src',
    component: 'Input',
    rules: [
      { required: true, message: 'Please enter an iframe address' },
      { type: 'url', message: 'Please enter the correct URL address' },
    ],
    ifShow: ({ values }) => !isButton(values.menuType) && values.component === ComponentTypes.IFrame,
  },
  {
    field: 'redirect',
    label: 'The default redirection address',
    component: 'Input',
    ifShow: ({ values }) => isDir(values.menuType),
  },
  {
    field: 'perms',
    label: 'Authorization Identifier',
    component: 'Input',
    ifShow: ({ values }) => isButton(values.menuType),
    // dynamicRules: ({ model }) => {
    //   return [
    //     {
    //       required: false,
    //       validator: (_, value) => {
    //         return new Promise((resolve, reject) => {
    //           let params = {
    //             tableName: 'sys_permission',
    //             fieldName: 'perms',
    //             fieldVal: value,
    //             dataId: model.id,
    //           };
    //           duplicateCheck(params)
    //             .then((res) => {
    //               res.success ? resolve() : reject(res.message || '校验失败');
    //             })
    //             .catch((err) => {
    //               reject(err.message || '校验失败');
    //             });
    //         });
    //       },
    //     },
    //   ];
    // },
  },
  {
    field: 'permsType',
    label: 'Authorization policies',
    component: 'RadioGroup',
    defaultValue: '1',
    helpMessage: ['Visible/Accessible (Visible/Accessible after authorization)', 'Editable (disabled if unauthorized)'],
    componentProps: {
      options: [
        { label: 'VISIBLE/ACCESSIBLE', value: '1' },
        { label: 'EDITABLE', value: '2' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: 'EFFECTIVE', value: '1' },
        { label: 'VOID', value: '0' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'icon',
    label: 'Biểu tượng',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'sortNo',
    label: 'Sắp xếp',
    component: 'InputNumber',
    defaultValue: 1,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'route',
    label: 'Whether to route menu',
    component: 'Switch',
    defaultValue: true,
    componentProps: {
      checkedChildren: 'BE',
      unCheckedChildren: 'NOT',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hidden',
    label: 'Hidden routes',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: 'BE',
      unCheckedChildren: 'NOT',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hideTab',
    label: 'Hide Tab',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: 'BE',
      unCheckedChildren: 'NOT',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'keepAlive',
    label: 'Whether the route is cached',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'BE',
      unCheckedChildren: 'NOT',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'alwaysShow',
    label: 'Aggregate routing',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'BE',
      unCheckedChildren: 'NOT',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'internalOrExternal',
    label: 'Open with',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: 'EXTERNAL',
      unCheckedChildren: 'INSIDE',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
];

export const dataRuleColumns: BasicColumn[] = [
  {
    title: 'Rule Name',
    dataIndex: 'ruleName',
    width: 150,
  },
  {
    title: 'Rule fields',
    dataIndex: 'ruleColumn',
    width: 100,
  },
  {
    title: 'Rule value',
    dataIndex: 'ruleValue',
    width: 100,
  },
];

export const dataRuleSearchFormSchema: FormSchema[] = [
  {
    field: 'ruleName',
    label: 'Rule Name',
    component: 'Input',
    // colProps: { span: 6 },
  },
  {
    field: 'ruleValue',
    label: 'Rule value',
    component: 'Input',
    // colProps: { span: 6 },
  },
];

export const dataRuleFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'ruleName',
    label: 'Rule Name',
    component: 'Input',
    required: true,
  },
  {
    field: 'ruleColumn',
    label: 'Rule fields',
    component: 'Input',
    ifShow: ({ values }) => {
      return values.ruleConditions !== 'USE_SQL_RULES';
    },
  },
  {
    field: 'ruleConditions',
    label: 'Conditional rules',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: ajaxGetDictItems,
      params: { code: 'rule_conditions' },
      labelField: 'text',
      valueField: 'value',
      getPopupContainer: (node) => document.body,
    },
  },
  {
    field: 'ruleValue',
    label: 'Rule value',
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: 'Status',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: 'VOID', value: '0' },
        { label: 'EFFECTIVE', value: '1' },
      ],
    },
  },
];
