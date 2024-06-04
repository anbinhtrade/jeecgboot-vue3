import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Mã CCQ',
    align: "center",
    dataIndex: 'fundCode'
  },
  {
    title: 'Tên Quỹ',
    align: "center",
    dataIndex: 'fundName'
  },
  {
    title: 'Loại hình quỹ',
    align: "center",
    dataIndex: 'fundType'
  },
  {
    title: 'Chỉ số tham chiếu',
    align: "center",
    dataIndex: 'indexRef'
  },
  {
    title: 'Ngân hàng giám sát',
    align: "center",
    dataIndex: 'observedBank'
  },
  {
    title: 'Đại lý chuyển nhượng',
    align: "center",
    dataIndex: 'transferAgent'
  },
  {
    title: 'Lô chứng chỉ quỹ',
    align: "center",
    dataIndex: 'batchEtf'
  },
  {
    title: 'NAV/CCQ',
    align: "center",
    dataIndex: 'navPerEtf'
  },
  {
    title: 'Tổng tài sản quỹ',
    align: "center",
    dataIndex: 'navTotal'
  },
  {
    title: 'Số nhà đầu tư',
    align: "center",
    dataIndex: 'totalInvestor'
  },
  {
    title: 'Số nhà đầu tư nước ngoài',
    align: "center",
    dataIndex: 'totalForeignInvestor'
  },
  {
    title: 'Giá trị đầu tư tối thiểu',
    align: "center",
    dataIndex: 'minInvestmentValue'
  },
  {
    title: 'Khối lượng bán tối thiểu',
    align: "center",
    dataIndex: 'minSellingVol'
  },
  {
    title: 'Tỉ lệ tăng trưởng từ đầu năm VNDiamond',
    align: "center",
    dataIndex: 'growingRateYtd'
  },
  {
    title: 'Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond',
    align: "center",
    dataIndex: 'growingRate3y'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Mã CCQ',
    field: 'fundCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Mã CCQ!'},
             ];
    },
  },
  {
    label: 'Tên Quỹ',
    field: 'fundName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Tên Quỹ!'},
             ];
    },
  },
  {
    label: 'Loại hình quỹ',
    field: 'fundType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Loại hình quỹ!'},
             ];
    },
  },
  {
    label: 'Chỉ số tham chiếu',
    field: 'indexRef',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Chỉ số tham chiếu!'},
             ];
    },
  },
  {
    label: 'Ngân hàng giám sát',
    field: 'observedBank',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Ngân hàng giám sát!'},
             ];
    },
  },
  {
    label: 'Đại lý chuyển nhượng',
    field: 'transferAgent',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Đại lý chuyển nhượng!'},
             ];
    },
  },
  {
    label: 'Lô chứng chỉ quỹ',
    field: 'batchEtf',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Lô chứng chỉ quỹ!'},
             ];
    },
  },
  {
    label: 'NAV/CCQ',
    field: 'navPerEtf',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter NAV/CCQ!'},
             ];
    },
  },
  {
    label: 'Tổng tài sản quỹ',
    field: 'navTotal',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Tổng tài sản quỹ!'},
             ];
    },
  },
  {
    label: 'Số nhà đầu tư',
    field: 'totalInvestor',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Số nhà đầu tư!'},
             ];
    },
  },
  {
    label: 'Số nhà đầu tư nước ngoài',
    field: 'totalForeignInvestor',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Số nhà đầu tư nước ngoài!'},
             ];
    },
  },
  {
    label: 'Giá trị đầu tư tối thiểu',
    field: 'minInvestmentValue',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Giá trị đầu tư tối thiểu!'},
             ];
    },
  },
  {
    label: 'Khối lượng bán tối thiểu',
    field: 'minSellingVol',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Khối lượng bán tối thiểu!'},
             ];
    },
  },
  {
    label: 'Tỉ lệ tăng trưởng từ đầu năm VNDiamond',
    field: 'growingRateYtd',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Tỉ lệ tăng trưởng từ đầu năm VNDiamond!'},
             ];
    },
  },
  {
    label: 'Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond',
    field: 'growingRate3y',
    component: 'InputNumber',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond!'},
             ];
    },
  },
	// TODO The primary key hidden field is currently hard-coded as ID.
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
