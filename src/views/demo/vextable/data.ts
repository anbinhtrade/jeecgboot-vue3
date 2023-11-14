import { BasicColumn, FormSchema } from '/@/components/Table';
import { usePermission } from '/@/hooks/web/usePermission';
import { JVxeColumn, JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
const { isDisabledAuth, hasPermission, initBpmFormData} = usePermission();

export const columns: BasicColumn[] = [
  {
    title: 'Order number',
    dataIndex: 'orderCode',
    width: 260,
  },
  {
    title: 'The type of order',
    dataIndex: 'ctype',
    slots: { customRender: 'ctype' },
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
  {
    title: 'Process status',
    width: 200,
    dataIndex: 'bpmStatus',
    customRender: ({ text }) => {
      if (!text || text == '1') {
        return 'To be submitted';
      } else if (text == '2') {
        return 'PROCESSING';
      } else if (text == '2') {
        return 'DONE';
      } else {
        return text;
      }
    },
  },
];

export function getBpmFormSchema(formData) {
  //Inject process node form permissions
  initBpmFormData(formData);
  
  const formSchema2: FormSchema[] = [
    {
      label: 'Order number',
      field: 'orderCode',
      component: 'Input',
      show: ({ values }) => {
        return hasPermission('order:orderCode');
      },
    },
    {
      label: 'The type of order',
      field: 'ctype',
      component: 'Select',
      componentProps: {
        options: [
          { label: '国内订单', value: '1', key: '1' },
          { label: '国际订单', value: '2', key: '2' },
        ],
      },
    },
    {
      label: 'The date of the order',
      field: 'orderDate',
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        style: {
          width: '100%',
        },
      },
    },
    {
      label: 'The amount of the order',
      field: 'orderMoney',
      component: 'Input',
    },
    {
      label: 'Order notes',
      field: 'content',
      component: 'Input',
    },
  ];
  return formSchema2;
}

export function getOrderCustomerFormSchema(formData) {
  //Inject process node form permissions
  initBpmFormData(formData);
  
  const formSchema2: FormSchema[] = [
    {
      label: 'Customer name',
      field: 'name',
      component: 'Input',
      dynamicDisabled: ({ values }) => {
        return isDisabledAuth('order:name');
      },
    },
    {
      label: 'GENDER',
      field: 'sex',
      component: 'Select',
      componentProps: {
        options: [
          { label: 'MAN', value: '1', key: '1' },
          { label: 'WOMAN', value: '2', key: '2' },
        ],
      },
    },
    {
      label: 'Identification number',
      field: 'idcard',
      component: 'Input',
    },
    {
      label: 'Mobile phone number',
      field: 'telphone',
      component: 'Input',
    },
  ];
  return formSchema2;
}

export const jeecgOrderTicketColumns: JVxeColumn[] = [
  {
    title: 'Flight number',
    key: 'ticketCode',
    width: 180,
    type: JVxeTypes.input,
    placeholder: 'Please enter ${title}',
    defaultValue: '',
  },
  {
    title: 'Flight time',
    key: 'tickectDate',
    width: 180,
    type: JVxeTypes.date,
    placeholder: 'Please select ${title}',
    defaultValue: '',
  },
];
