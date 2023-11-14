import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'TITLE',
    width: 150,
    dataIndex: 'titile',
  },
  {
    title: 'The type of message',
    dataIndex: 'msgCategory',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_category');
    },
  },
  {
    title: 'PUBLISHER',
    width: 100,
    dataIndex: 'sender',
  },
  {
    title: 'PRIORITY',
    dataIndex: 'priority',
    width: 70,
    customRender: ({ text }) => {
      const color = text == 'L' ? 'blue' : text == 'M' ? 'yellow' : 'red';
      return render.renderTag(render.renderDict(text, 'priority'), color);
    },
  },
  {
    title: 'Notification object',
    dataIndex: 'msgType',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_type');
    },
  },
  {
    title: 'Publishing status',
    dataIndex: 'sendStatus',
    width: 70,
    customRender: ({ text }) => {
      const color = text == '0' ? 'red' : text == '1' ? 'green' : 'gray';
      return render.renderTag(render.renderDict(text, 'send_status'), color);
    },
  },
  {
    title: 'RELEASED',
    width: 100,
    dataIndex: 'sendTime',
  },
  {
    title: 'Revocation time',
    width: 100,
    dataIndex: 'cancelTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'titile',
    label: 'TITLE',
    component: 'JInput',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'msgCategory',
    label: 'The type of message',
    required: true,
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      type: 'radio',
      dictCode: 'msg_category',
      placeholder: 'Please select a type',
    },
  },
  {
    field: 'titile',
    label: 'TITLE',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: 'Please enter a title',
    },
  },
  {
    field: 'msgAbstract',
    label: 'SUMMARY',
    component: 'InputTextArea',
    required: true,
  },
  // {
  //   field: 'endTime',
  //   label: '截至日期',
  //   component: 'DatePicker',
  //   componentProps: {
  //     showTime: true,
  //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
  //     placeholder: '请选择截至日期',
  //   },
  //   dynamicRules: ({ model }) => rules.endTime(model.startTime, true),
  // },
  {
    field: 'msgType',
    label: 'Receiving users',
    defaultValue: 'ALL',
    component: 'JDictSelectTag',
    required: true,
    componentProps: {
      type: 'radio',
      dictCode: 'msg_type',
      placeholder: 'Please select a publishing scope',
    },
  },
  {
    field: 'userIds',
    label: 'Specify the user',
    component: 'JSelectUser',
    required: true,
    componentProps: {
      rowKey: 'id',
      labelKey: 'username',
    },
    ifShow: ({ values }) => values.msgType == 'USER',
  },
  {
    field: 'priority',
    label: 'PRIORITY',
    defaultValue: 'H',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'priority',
      type: 'radio',
      placeholder: 'Please select a priority',
    },
  },
  {
    field: 'msgContent',
    label: 'CONTENT',
    component: 'Input',
    render: render.renderTinymce,
  },
];
