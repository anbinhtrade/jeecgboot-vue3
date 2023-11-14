import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Icon } from '/@/components/Icon';
import { duplicateCheck } from '../user/user.api';
import { ajaxGetDictItems ,checkPermDuplication } from './menu.api';
import { render } from '/@/utils/common/renderUtils';

const isDir = (type) => type === 0;
const isMenu = (type) => type === 1;
const isButton = (type) => type === 2;

// 定义可选择的组件类型
export enum ComponentTypes {
  Default = 'layouts/default/index',
  IFrame = 'sys/iframe/FrameBlank',
}

export const columns: BasicColumn[] = [
  {
    title: 'Menu name',
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
    title: 'ICON',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: 'SUBASSEMBLY',
    dataIndex: 'component',
    align: 'left',
    width: 150,
  },
  {
    title: 'PATH',
    dataIndex: 'url',
    align: 'left',
    width: 150,
  },
  {
    title: 'SORT',
    dataIndex: 'sortNo',
    width: 50,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Menu name',
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
          { label: 'SUBMENU', value: 1 },
          { label: 'Buttons/Permissions', value: 2 },
        ],
        onChange: (e) => {
          const { updateSchema, clearValidate } = formActionType;
          const label = isButton(e) ? 'Buttons/Permissions' : 'Menu name';
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
    label: 'Menu name',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: 'Parent menu',
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
    label: 'Access path',
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
    label: 'Front-end components',
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
    label: 'The name of the component',
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
    label: 'Iframe address',
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
    label: '授权策略',
    component: 'RadioGroup',
    defaultValue: '1',
    helpMessage: ['可见/可访问(授权后可见/可访问)', '可编辑(未授权时禁用)'],
    componentProps: {
      options: [
        { label: '可见/可访问', value: '1' },
        { label: '可编辑', value: '2' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '有效', value: '1' },
        { label: '无效', value: '0' },
      ],
    },
    ifShow: ({ values }) => isButton(values.menuType),
  },
  {
    field: 'icon',
    label: '菜单图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'sortNo',
    label: 'SORT',
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
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hidden',
    label: '隐藏路由',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'hideTab',
    label: '隐藏Tab',
    component: 'Switch',
    defaultValue: 0,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'keepAlive',
    label: '是否缓存路由',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'alwaysShow',
    label: '聚合路由',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: '是',
      unCheckedChildren: '否',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'internalOrExternal',
    label: '打开方式',
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      checkedChildren: '外部',
      unCheckedChildren: '内部',
    },
    ifShow: ({ values }) => !isButton(values.menuType),
  },
];

export const dataRuleColumns: BasicColumn[] = [
  {
    title: '规则名称',
    dataIndex: 'ruleName',
    width: 150,
  },
  {
    title: '规则字段',
    dataIndex: 'ruleColumn',
    width: 100,
  },
  {
    title: '规则值',
    dataIndex: 'ruleValue',
    width: 100,
  },
];

export const dataRuleSearchFormSchema: FormSchema[] = [
  {
    field: 'ruleName',
    label: '规则名称',
    component: 'Input',
    // colProps: { span: 6 },
  },
  {
    field: 'ruleValue',
    label: '规则值',
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
    label: '规则名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'ruleColumn',
    label: '规则字段',
    component: 'Input',
    ifShow: ({ values }) => {
      return values.ruleConditions !== 'USE_SQL_RULES';
    },
  },
  {
    field: 'ruleConditions',
    label: '条件规则',
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
    label: '规则值',
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '无效', value: '0' },
        { label: '有效', value: '1' },
      ],
    },
  },
];
