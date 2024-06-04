import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Mã lệnh',
    align: "center",
    dataIndex: 'orderId'
  },
  {
    title: 'Loại yêu cầu',
    align: "center",
    dataIndex: 'type'
  },
  {
    title: 'Khối lượng giao dịch',
    align: "center",
    dataIndex: 'volume'
  },
  {
    title: 'Gía giao dịch',
    align: "center",
    dataIndex: 'price'
  },
  {
    title: 'Trạng thái',
    align: "center",
    dataIndex: 'status'
  },
  {
    title: '(%) Phí giao dịch',
    align: "center",
    dataIndex: 'feesPct'
  },
  {
    title: 'Phí giao dịch (VNĐ)',
    align: "center",
    dataIndex: 'fees'
  },
  {
    title: 'Số tiền còn lại',
    align: "center",
    dataIndex: 'remainingMoney'
  },
  {
    title: 'Ngày gửi',
    align: "center",
    dataIndex: 'sentAt'
  },
  {
    title: 'Người gửi',
    align: "center",
    dataIndex: 'sentBy'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Mã lệnh',
    field: 'orderId',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Mã lệnh!'},
             ];
    },
  },
  {
    label: 'Loại yêu cầu',
    field: 'type',
    component: 'Input',
  },
  {
    label: 'Khối lượng giao dịch',
    field: 'volume',
    component: 'InputNumber',
  },
  {
    label: 'Gía giao dịch',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: 'Trạng thái',
    field: 'status',
    component: 'Input',
  },
  {
    label: '(%) Phí giao dịch',
    field: 'feesPct',
    component: 'InputNumber',
  },
  {
    label: 'Phí giao dịch (VNĐ)',
    field: 'fees',
    component: 'InputNumber',
  },
  {
    label: 'Số tiền còn lại',
    field: 'remainingMoney',
    component: 'InputNumber',
  },
  {
    label: 'Ngày gửi',
    field: 'sentAt',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: 'Người gửi',
    field: 'sentBy',
    component: 'Input',
  },
	// TODO The primary key hidden field is currently hard-coded as ID.
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
