import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//List data
export const columns: BasicColumn[] = [
  {
    title: 'Mã CCQ',
    align: "center",
    sorter: true,
    dataIndex: 'etfCode'
  },
  {
    title: 'Tên Quỹ',
    align: "center",
    sorter: true,
    dataIndex: 'etfName'
  },
  {
    title: 'Loại hình quỹ',
    align: "center",
    sorter: true,
    dataIndex: 'etfType'
  },
  {
    title: 'Chỉ số tham chiếu',
    align: "center",
    sorter: true,
    dataIndex: 'indexRef'
  },
  {
    title: 'Công ty quản lý',
    align: "center",
    dataIndex: 'orgManage'
  },
  {
    title: 'Ngân hàng giám sát',
    align: "center",
    dataIndex: 'bankObserve'
  },
  {
    title: 'Đại lý chuyển nhượng',
    align: "center",
    dataIndex: 'transAgent'
  },
  {
    title: 'Lô chứng chỉ quỹ',
    align: "center",
    dataIndex: 'etfBatch'
  },
  {
    title: 'NAV/CCQ',
    align: "center",
    sorter: true,
    dataIndex: 'etfNav'
  },
  {
    title: 'Tổng tài sản',
    align: "center",
    dataIndex: 'totalAsset'
  },
  {
    title: 'Số nhà đầu tư',
    align: "center",
    dataIndex: 'numInvestors'
  },
  {
    title: 'Số nhà đầu tư nước ngoài',
    align: "center",
    dataIndex: 'numForeginInvestors'
  },
  {
    title: 'Giá trị đầu tư tối thiểu',
    align: "center",
    dataIndex: 'minimumInvestAmount'
  },
  {
    title: 'Khối lượng bán tối thiểu',
    align: "center",
    dataIndex: 'minimumSellNum'
  },
  {
    title: 'Tỷ lệ tăng trưởng từ đầu năm của chỉ số VN Diamond',
    align: "center",
    dataIndex: 'indexGrowRateYtd'
  },
  {
    title: 'Tạo bởi',
    align: "center",
    dataIndex: 'createBy'
  },
  {
    title: 'Cập nhật bởi',
    align: "center",
    dataIndex: 'updateBy'
  },
  {
    title: 'Thời gian cập nhật',
    align: "center",
    dataIndex: 'updateTime'
  },
  {
    title: 'Thời gian tạo',
    align: "center",
    dataIndex: 'createTime'
  },
];

//Query data
export const searchFormSchema: FormSchema[] = [
];

//Form data
export const formSchema: FormSchema[] = [
  {
    label: 'Mã CCQ',
    field: 'etfCode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: 'Please enter Mã CCQ!'},
              {...rules.duplicateCheckRule('tbletf', 'etf_code',model,schema)[0]},
             ];
    },
  },
  {
    label: 'Tên Quỹ',
    field: 'etfName',
    component: 'Input',
  },
  {
    label: 'Loại hình quỹ',
    field: 'etfType',
    component: 'Input',
  },
  {
    label: 'Chỉ số tham chiếu',
    field: 'indexRef',
    component: 'Input',
  },
  {
    label: 'Công ty quản lý',
    field: 'orgManage',
    component: 'Input',
  },
  {
    label: 'Ngân hàng giám sát',
    field: 'bankObserve',
    component: 'Input',
  },
  {
    label: 'Đại lý chuyển nhượng',
    field: 'transAgent',
    component: 'Input',
  },
  {
    label: 'Lô chứng chỉ quỹ',
    field: 'etfBatch',
    component: 'Input',
  },
  {
    label: 'NAV/CCQ',
    field: 'etfNav',
    component: 'InputNumber',
  },
  {
    label: 'Tổng tài sản',
    field: 'totalAsset',
    component: 'InputNumber',
  },
  {
    label: 'Số nhà đầu tư',
    field: 'numInvestors',
    component: 'InputNumber',
  },
  {
    label: 'Số nhà đầu tư nước ngoài',
    field: 'numForeginInvestors',
    component: 'InputNumber',
  },
  {
    label: 'Giá trị đầu tư tối thiểu',
    field: 'minimumInvestAmount',
    component: 'InputNumber',
  },
  {
    label: 'Khối lượng bán tối thiểu',
    field: 'minimumSellNum',
    component: 'InputNumber',
  },
  {
    label: 'Tỷ lệ tăng trưởng từ đầu năm của chỉ số VN Diamond',
    field: 'indexGrowRateYtd',
    component: 'InputNumber',
  },
  {
    label: 'Tạo bởi',
    field: 'createBy',
    component: 'Input',
  },
  {
    label: 'Cập nhật bởi',
    field: 'updateBy',
    component: 'Input',
  },
  {
    label: 'Thời gian cập nhật',
    field: 'updateTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: 'Thời gian tạo',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
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
