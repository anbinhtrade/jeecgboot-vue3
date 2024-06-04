import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Số tài khoản',
    align: "center",
    dataIndex: 'custoryCd'
  },
  {
    title: 'Mã chứng khoán',
    align: "center",
    dataIndex: 'symbol'
  },
  {
    title: 'Khối lượng',
    align: "center",
    dataIndex: 'volume'
  },
  {
    title: 'Loại thay đổi',
    align: "center",
    dataIndex: 'changeType'
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
  {
    title: 'Ghi chú',
    align: "center",
    dataIndex: 'notes'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Số tài khoản',
    field: 'custoryCd',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Số tài khoản!'},
             ];
    },
  },
  {
    label: 'Mã chứng khoán',
    field: 'symbol',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Mã chứng khoán!'},
             ];
    },
  },
  {
    label: 'Khối lượng',
    field: 'volume',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Khối lượng!'},
             ];
    },
  },
  {
    label: 'Loại thay đổi',
    field: 'changeType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Loại thay đổi!'},
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
              { required: true, message: 'Please enter Ngày gửi!'},
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
  {
    label: 'Ghi chú',
    field: 'notes',
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
