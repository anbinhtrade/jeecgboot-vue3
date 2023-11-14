import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'Order number',
    dataIndex: 'orderCode',
    width: 260,
  },
  {
    title: 'The type of order',
    dataIndex: 'ctype',
    width: 160,
    customRender: ({ text }) => {
      return text == '1' ? 'Domestic orders' : text == '2' ? 'International Orders' : '';
    },
  },
  {
    title: 'The date of the order',
    dataIndex: 'orderDate',
    width: 300,
  },
  {
    title: 'The amount of the order',
    width: 200,
    dataIndex: 'orderMoney',
  },
  {
    title: 'Order notes',
    width: 200,
    dataIndex: 'content',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Order number',
    field: 'orderCode',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'The type of order',
    field: 'ctype',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'Domestic orders',
          value: '1',
          key: '1',
        },
        {
          label: 'International Orders',
          value: '2',
          key: '2',
        },
      ],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Order number',
    field: 'orderCode',
    component: 'Input',
    required: true,
  },
  {
    label: 'The type of order',
    field: 'ctype',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'Domestic orders',
          value: '1',
          key: '1',
        },
        {
          label: 'International Orders',
          value: '2',
          key: '2',
        },
      ],
    },
  },
  {
    label: 'The date of the order',
    field: 'orderDate',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'The amount of the order',
    field: 'orderMoney',
    component: 'InputNumber',
  },
  {
    label: 'Order notes',
    field: 'content',
    component: 'Input',
  },
];

export const customColumns: BasicColumn[] = [
  {
    title: 'Customer name',
    dataIndex: 'name',
    width: 260,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex',
    width: 100,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
  {
    title: 'Identification number',
    dataIndex: 'idcard',
    width: 300,
  },
  {
    title: 'PHONE',
    width: 200,
    dataIndex: 'telphone',
  },
];

export const customerFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Customer name',
    field: 'name',
    component: 'Input',
    required: true,
  },
  {
    label: 'GENDER',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Please select a gender',
    },
  },
  {
    label: 'Identification number',
    field: 'idcard',
    component: 'Input',
  },
  {
    label: 'Scanned copy of ID card',
    field: 'idcardPic',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 2,
    },
  },
  {
    label: 'CONTACT',
    field: 'telphone',
    component: 'Input',
    rules: [{ required: false, pattern: /^1[3456789]\d{9}$/, message: '手机号码格式有误' }],
  },
  {
    label: 'orderId',
    field: 'orderId',
    component: 'Input',
    show: false,
  },
];

export const ticketColumns: BasicColumn[] = [
  {
    title: 'Flight number',
    dataIndex: 'ticketCode',
  },
  {
    title: 'Flight time',
    dataIndex: 'tickectDate',
  },
  {
    title: 'Created by',
    dataIndex: 'createBy',
  },
  {
    title: 'Creation time',
    dataIndex: 'createTime',
  },
];

export const ticketFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Flight number',
    field: 'ticketCode',
    component: 'Input',
    required: true,
  },
  {
    label: 'Flight time',
    field: 'tickectDate',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: 'orderId',
    field: 'orderId',
    component: 'Input',
    show: false,
  },
];
