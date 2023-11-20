//Third-party app configuration forms
import { FormSchema } from '/@/components/Form';

//Third-party app forms
export const thirdAppFormSchema: FormSchema[] = [
  {
    label: 'Id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Third Type',
    field: 'thirdType',
    component: 'Input',
    show: false,
  },
  {
    label: 'AgentId',
    field: 'agentId',
    component: 'Input',
    required: true,
  },
  {
    label: 'AppKey',
    field: 'clientId',
    component: 'Input',
    required: true,
  },
  {
    label: 'AppSecret',
    field: 'clientSecret',
    component: 'Input',
    required: true,
  },
  {
    label: 'agentAppSecret',
    field: 'agentAppSecret',
    component: 'Input',
    ifShow: ({ values }) => values.thirdType == 'wechat_enterprise',
  },{
    label: 'ENABLE',
    field: 'status',
    component: 'Switch',
    componentProps:{
      checkedChildren:'Shut down',
      checkedValue:1,
      unCheckedChildren:'OPEN',
      unCheckedValue: 0
    },
    defaultValue: 1
  },{
    label: 'Tenant ID',
    field: 'tenantId',
    component: 'Input',
    show: false,
  },
];
