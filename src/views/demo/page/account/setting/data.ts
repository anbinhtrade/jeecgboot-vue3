import { FormSchema } from '/@/components/Form/index';
import { rules } from '/@/utils/helper/validator';

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
    name: 'Basic Settings',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: 'Security Settings',
    component: 'SecureSetting',
  },
  /* {
    key: '3',
    name: 'Account Binding',
    component: 'AccountBind',
  },
  {
    key: '4',
    name: 'New message notification',
    component: 'MsgNotify',
  },*/
];

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'realname',
    component: 'Input',
    label: 'Nickname',
    colProps: { span: 18 },
  },
  {
    field: 'sex',
    label: 'Gender',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Please select a gender',
      stringToNumber: true,
    },
    colProps: { span: 18 },
  },
  {
    label: 'Birthday',
    field: 'birthday',
    component: 'DatePicker',
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: 'Email',
    colProps: { span: 18 },
  },
  {
    field: 'phone',
    component: 'Input',
    label: 'Contact number',
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, false)[0] },
        { pattern: /^1[3456789]\d{9}$/, message: 'The format of the mobile phone number is incorrect' },
      ];
    },
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: 'Account password',
    description: 'Current password strength：：STRONG',
    extra: 'REVISE',
  },
  {
    key: '2',
    title: 'Secure your phone',
    description: 'The phone has been bound：：138****8293',
    extra: 'REVISE',
  },
  {
    key: '3',
    title: 'Security issues',
    description: 'The security issue is not set，Confidentiality issues can effectively protect the security of your account',
    extra: 'REVISE',
  },
  {
    key: '4',
    title: 'Alternate mailbox',
    description: 'An email address has been bound：：ant***sign.com',
    extra: 'REVISE',
  },
  {
    key: '5',
    title: 'MFA devices',
    description: 'If the MFA device is not bound, you can confirm it again after binding',
    extra: 'REVISE',
  },
];

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: 'Bind Taobao',
    description: 'Currently, no Taobao account is bound',
    extra: 'BIND',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: 'Bind Alipay',
    description: 'Currently, an Alipay account has not been bound',
    extra: 'BIND',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: 'Bind DingTalk',
    description: 'A DingTalk account is not currently bound',
    extra: 'BIND',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: 'Account password',
    description: 'Messages from other users will be notified in the form of messages',
  },
  {
    key: '2',
    title: 'System messages',
    description: 'The system message will be notified in the form of an internal message',
  },
  {
    key: '3',
    title: 'To do',
    description: 'To-do tasks will be notified in the form of a message',
  },
];
