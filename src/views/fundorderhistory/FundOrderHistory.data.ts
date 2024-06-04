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
    title: 'Trạng thái lệnh',
    align: "center",
    dataIndex: 'orderStatus'
  },
  {
    title: 'Thao tác',
    align: "center",
    dataIndex: 'orderAction'
  },
  {
    title: 'Lý do',
    align: "center",
    dataIndex: 'orderReason'
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
    label: 'Trạng thái lệnh',
    field: 'orderStatus',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Trạng thái lệnh!'},
             ];
    },
  },
  {
    label: 'Thao tác',
    field: 'orderAction',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Thao tác!'},
             ];
    },
  },
  {
    label: 'Lý do',
    field: 'orderReason',
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
