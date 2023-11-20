import { FormSchema } from '/@/components/Form/index';
import { rules } from '/@/utils/helper/validator';
import anquan1 from './icons/anquan1.png'
import anquan2 from './icons/anquan2.png'
import app1 from './icons/app1.png'
import app2 from './icons/app2.png'
import geren1 from './icons/geren1.png'
import geren2 from './icons/geren2.png'
import zuhu1 from './icons/zuhu1.png'
import zuhu2 from './icons/zuhu2.png'

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: 'Personal Information',
    component: 'BaseSetting',
    icon:'ant-design:user-outlined',
    img1: geren1,
    img2: geren2,
  },
  {
    key: '2',
    name: 'My Tenants',
    component: 'TenantSetting',
    icon:'ant-design:team-outlined',
    img1: zuhu1,
    img2: zuhu2,
  },
   {
    key: '3',
    name: 'Account Security',
    component: 'AccountSetting',
    icon:'ant-design:lock-outlined',
    img1: anquan1,
    img2: anquan2,
  },
  {
    key: '4',
    name: 'Third-party Apps',
    component: 'WeChatDingSetting',
    icon: 'ant-design:contacts-outlined',
    img1: app1,
    img2: app2,
  },
];


/**
 * User forms
 */
export const formSchema: FormSchema[] = [
  {
    field: 'realname',
    component: 'Input',
    label: 'Real Name',
    colProps: { span: 24 },
    required:true
  },
  {
    field: 'birthday',
    component: 'DatePicker',
    label: 'Birthday',
    colProps: { span: 24 },
    componentProps:{
      showTime:false,
      valueFormat:"YYYY-MM-DD",
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    label: 'Gender',
    colProps: { span: 24 },
    componentProps:{
      options: [
        {
          label: 'Male',
          value: 1,
        },
        {
          label: 'Female',
          value: 2,
        },
      ],
    }
  },
  {
    field: 'relTenantIds',
    component: 'JDictSelectTag',
    label: 'Tenant',
    colProps: { span: 24 },
    componentProps:{
      mode:'multiple',
      dictCode:'sys_tenant,name,id',
      disabled:true
    }
  },
  {
    field: 'post',
    component: 'JDictSelectTag',
    label: 'Position',
    colProps: { span: 24 },
    componentProps:{
      mode:'multiple',
      dictCode:'sys_position,name,id',
      disabled:true
    }
  },
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
]

//Password pop-up
export const formPasswordSchema: FormSchema[] = [
  {
    label: 'User Name',
    field: 'username',
    component: 'Input',
    componentProps: { readOnly: true },
  },
  {
    label: 'Old Password',
    field: 'oldpassword',
    component: 'InputPassword',
    required: true,
  },
  {
    label: 'New passwords',
    field: 'password',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: 'Please enter a new password',
    },
    rules: [
      {
        required: true,
        message: 'Please enter a new password',
      },
    ],
  },
  {
    label: 'Confirm Password',
    field: 'confirmpassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
];
