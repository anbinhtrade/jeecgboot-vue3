import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'Title',
    width: 150,
    dataIndex: 'titile',
  },
  {
    title: 'Msg Category',
    dataIndex: 'msgCategory',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_category');
    },
  },
  {
    title: 'Publisher',
    width: 100,
    dataIndex: 'sender',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    width: 70,
    customRender: ({ text }) => {
      const color = text == 'L' ? 'blue' : text == 'M' ? 'yellow' : 'red';
      return render.renderTag(render.renderDict(text, 'priority'), color);
    },
  },
  {
    title: 'Msg Type',
    dataIndex: 'msgType',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'msg_type');
    },
  },
  {
    title: 'Send Status',
    dataIndex: 'sendStatus',
    width: 70,
    customRender: ({ text }) => {
      const color = text == '0' ? 'red' : text == '1' ? 'green' : 'gray';
      return render.renderTag(render.renderDict(text, 'send_status'), color);
    },
  },
  {
    title: 'Send Time',
    width: 100,
    dataIndex: 'sendTime',
  },
  {
    title: 'Cancel time',
    width: 100,
    dataIndex: 'cancelTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'titile',
    label: 'Title',
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
    label: 'Msg Category',
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
    label: 'Title',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: 'Please enter a title',
    },
  },
  {
    field: 'msgAbstract',
    label: 'Summary',
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
    label: 'Msg Type',
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
    label: 'User Ids',
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
    label: 'Priority',
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
    label: 'Content',
    component: 'Input',
    render: render.renderTinymce,
  },
];
