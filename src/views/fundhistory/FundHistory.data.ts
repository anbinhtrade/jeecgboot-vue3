import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Mã Quỹ',
    align: "center",
    dataIndex: 'fundId'
  },
  {
    title: 'Tên trường',
    align: "center",
    dataIndex: 'fieldName'
  },
  {
    title: 'Yêu cầu',
    align: "center",
    dataIndex: 'requestType'
  },
  {
    title: 'Tham số hiện tại',
    align: "center",
    dataIndex: 'currentValue'
  },
  {
    title: 'Tham số mới',
    align: "center",
    dataIndex: 'nextValue'
  },
  {
    title: 'Người thực hiện',
    align: "center",
    dataIndex: 'staffInCharge'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Mã Quỹ',
    field: 'fundId',
    component: 'InputNumber',
  },
  {
    label: 'Tên trường',
    field: 'fieldName',
    component: 'Input',
  },
  {
    label: 'Yêu cầu',
    field: 'requestType',
    component: 'Input',
  },
  {
    label: 'Tham số hiện tại',
    field: 'currentValue',
    component: 'Input',
  },
  {
    label: 'Tham số mới',
    field: 'nextValue',
    component: 'Input',
  },
  {
    label: 'Người thực hiện',
    field: 'staffInCharge',
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
