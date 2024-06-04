import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Số tài khoản',
    align: "center",
    dataIndex: 'custodyCd'
  },
  {
    title: 'Tiểu khoản',
    align: "center",
    dataIndex: 'accountNo'
  },
  {
    title: 'Mã chứng khoán',
    align: "center",
    dataIndex: 'symbol'
  },
  {
    title: 'Loại lệnh',
    align: "center",
    dataIndex: 'orderType'
  },
  {
    title: 'Khối lượng',
    align: "center",
    dataIndex: 'volume'
  },
  {
    title: 'Loại giá',
    align: "center",
    dataIndex: 'priceType'
  },
  {
    title: 'Gía',
    align: "center",
    dataIndex: 'price'
  },
  {
    title: 'Ngày gửi',
    align: "center",
    dataIndex: 'sentAt'
  },
  {
    title: 'Ngày duyệt',
    align: "center",
    dataIndex: 'approvedAt'
  },
  {
    title: 'Người duyệt',
    align: "center",
    dataIndex: 'approvedBy'
  },
  {
    title: 'Trạng thái',
    align: "center",
    dataIndex: 'status'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Số tài khoản',
    field: 'custodyCd',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập số tài khoản!'},
             ];
    },
  },
  {
    label: 'Tiểu khoản',
    field: 'accountNo',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập tiểu khoản!'},
             ];
    },
  },
  {
    label: 'Mã chứng khoán',
    field: 'symbol',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập mã chứng khoán!'},
             ];
    },
  },
  {
    label: 'Loại lệnh',
    field: 'orderType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập loại lệnh!'},
             ];
    },
  },
  {
    label: 'Khối lượng',
    field: 'volume',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập khối lượng!'},
             ];
    },
  },
  {
    label: 'Loại giá',
    field: 'priceType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập loại giá!'},
             ];
    },
  },
  {
    label: 'Gía',
    field: 'price',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập giá!'},
             ];
    },
  },
  {
    label: 'Ngày gửi',
    field: 'sentAt',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Hãy nhập ngày gửi!'},
             ];
    },
  },
  {
    label: 'Ngày duyệt',
    field: 'approvedAt',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: 'Người duyệt',
    field: 'approvedBy',
    component: 'Input',
  },
  {
    label: 'Trạng thái',
    field: 'status',
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
