import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Số hiệu lệnh',
    align: "center",
    dataIndex: 'orderCode'
  },
  {
    title: 'Lệnh',
    align: "center",
    dataIndex: 'orderType'
  },
  {
    title: 'Chứng chỉ quỹ',
    align: "center",
    dataIndex: 'fundCode'
  },
  {
    title: 'Tài khoản lưu ký',
    align: "center",
    dataIndex: 'custodyAccount'
  },
  {
    title: 'Họ và Tên',
    align: "center",
    dataIndex: 'fullName'
  },
  {
    title: 'Gía trị đầu tư',
    align: "center",
    dataIndex: 'investmentValue'
  },
  {
    title: 'Người đặt lệnh',
    align: "center",
    dataIndex: 'orderBy'
  },
  {
    title: 'Ngày giao dịch',
    align: "center",
    dataIndex: 'tradingDate'
  },
  {
    title: 'Trạng thái lệnh',
    align: "center",
    dataIndex: 'orderStatus'
  },
  {
    title: 'Giá trị lệnh',
    align: "center",
    dataIndex: 'orderValue'
  },
  {
    title: 'Khối lượng giao dịch',
    align: "center",
    dataIndex: 'tradingVolume'
  },
  {
    title: 'Giá trị giao dịch/CCQ',
    align: "center",
    dataIndex: 'tradingValuePerEtf'
  },
  {
    title: '% Phí giao dịch',
    align: "center",
    dataIndex: 'tradingFeePct'
  },
  {
    title: 'Phí giao dịch (VND)',
    align: "center",
    dataIndex: 'tradingFee'
  },
  {
    title: 'Số tiền còn lại',
    align: "center",
    dataIndex: 'remainingAmount'
  },
  {
    title: 'Mã người chăm sóc',
    align: "center",
    dataIndex: 'advisorCode'
  },
  {
    title: 'Người chăm sóc',
    align: "center",
    dataIndex: 'advisorName'
  },
  {
    title: 'Chi nhánh chăm sóc',
    align: "center",
    dataIndex: 'advisorAgent'
  },
  {
    title: 'Mã người giới thiệu',
    align: "center",
    dataIndex: 'referrerCode'
  },
  {
    title: 'Người giới thiệu',
    align: "center",
    dataIndex: 'referrerName'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Số hiệu lệnh',
    field: 'orderCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Số hiệu lệnh!'},
             ];
    },
  },
  {
    label: 'Lệnh',
    field: 'orderType',
    component: 'Input',
  },
  {
    label: 'Chứng chỉ quỹ',
    field: 'fundCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Chứng chỉ quỹ!'},
             ];
    },
  },
  {
    label: 'Tài khoản lưu ký',
    field: 'custodyAccount',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Tài khoản lưu ký!'},
             ];
    },
  },
  {
    label: 'Họ và Tên',
    field: 'fullName',
    component: 'Input',
  },
  {
    label: 'Gía trị đầu tư',
    field: 'investmentValue',
    component: 'Input',
  },
  {
    label: 'Người đặt lệnh',
    field: 'orderBy',
    component: 'Input',
  },
  {
    label: 'Ngày giao dịch',
    field: 'tradingDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: 'Trạng thái lệnh',
    field: 'orderStatus',
    component: 'Input',
  },
  {
    label: 'Giá trị lệnh',
    field: 'orderValue',
    component: 'Input',
  },
  {
    label: 'Khối lượng giao dịch',
    field: 'tradingVolume',
    component: 'Input',
  },
  {
    label: 'Giá trị giao dịch/CCQ',
    field: 'tradingValuePerEtf',
    component: 'Input',
  },
  {
    label: '% Phí giao dịch',
    field: 'tradingFeePct',
    component: 'InputNumber',
  },
  {
    label: 'Phí giao dịch (VND)',
    field: 'tradingFee',
    component: 'InputNumber',
  },
  {
    label: 'Số tiền còn lại',
    field: 'remainingAmount',
    component: 'InputNumber',
  },
  {
    label: 'Mã người chăm sóc',
    field: 'advisorCode',
    component: 'Input',
  },
  {
    label: 'Người chăm sóc',
    field: 'advisorName',
    component: 'Input',
  },
  {
    label: 'Chi nhánh chăm sóc',
    field: 'advisorAgent',
    component: 'Input',
  },
  {
    label: 'Mã người giới thiệu',
    field: 'referrerCode',
    component: 'Input',
  },
  {
    label: 'Người giới thiệu',
    field: 'referrerName',
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
