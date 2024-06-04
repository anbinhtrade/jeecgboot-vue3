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
    title: 'Symbol',
    align: "center",
    dataIndex: 'symbol'
  },
  {
    title: 'Tỉ lệ',
    align: "center",
    dataIndex: 'ratio'
  },
  {
    title: 'Khối lượng',
    align: "center",
    dataIndex: 'volume'
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
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Mã Quỹ!'},
             ];
    },
  },
  {
    label: 'Symbol',
    field: 'symbol',
    component: 'Input',
  },
  {
    label: 'Tỉ lệ',
    field: 'ratio',
    component: 'InputNumber',
  },
  {
    label: 'Khối lượng',
    field: 'volume',
    component: 'InputNumber',
  },
	// TODO The primary key hidden field is currently hard-coded as ID.
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
