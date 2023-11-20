import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 170,
    align: 'left',
    resizable: true,
    sorter: {
      multiple:1
    }
  },
  {
    title: 'KEYWORD',
    dataIndex: 'keyWord',
    width: 130,
    resizable: true,
  },
  {
    title: 'Clock-in time',
    dataIndex: 'punchTime',
    width: 140,
    resizable: true,
  },
  {
    title: 'WAGES',
    dataIndex: 'salaryMoney',
    width: 140,
    resizable: true,
    sorter: {
      multiple: 2
    }
  },
  {
    title: 'BONUS',
    dataIndex: 'bonusMoney',
    width: 140,
    resizable: true,
  },
  {
    title: 'GENDER',
    dataIndex: 'sex',
    sorter: {
      multiple: 3
    },
    customRender: ({ record }) => {
      return render.renderDict(record.sex, 'sex');
      // let v = record.sex ? (record.sex == '1' ? '男' : '女') : '';
      // return h('span', v);
    },
    width: 120,
    resizable: true,
  },
  {
    title: 'BIRTHDAY',
    dataIndex: 'birthday',
    width: 120,
    resizable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 120,
    resizable: true,
  },
  {
    title: 'BIOGRAPHY',
    dataIndex: 'content',
    width: 120,
    resizable: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: 'Name',
    component: 'Input',
    componentProps: {
      trim: true,
    },
    colProps: { span: 8 },
  },
  {
    field: 'birthday',
    label: 'BIRTHDAY',
    component: 'RangePicker',
    componentProps: {
      valueType: 'Date'
    },
    colProps: { span: 8 },
  },
  {
    field: 'age',
    label: 'AGE',
    component: 'Input',
    slot: 'age',
    colProps: { span: 8 },
  },
  {
    field: 'sex',
    label: 'GENDER',
    colProps: { span: 8 },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: 'Please select a gender',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'createBy',
    label: 'createBy',
    component: 'Input',
    show: false,
  },
  {
    field: 'createTime',
    label: 'createTime',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: 'Name',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: 'Please enter a first name',
    },
  },
  {
    field: 'keyWord',
    label: 'KEYWORD',
    component: 'Input',
    componentProps: {
      placeholder: 'Please enter a keyword',
    },
  },
  {
    field: 'punchTime',
    label: 'Clock-in time',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      placeholder: 'Please select a clock-in time',
    },
  },
  {
    field: 'salaryMoney',
    label: 'WAGES',
    component: 'Input',
    componentProps: {
      placeholder: 'Please enter your salary',
    },
  },
  {
    field: 'sex',
    label: 'GENDER',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      type: 'radio',
      dictCode: 'sex',
      placeholder: 'Please select a gender',
    },
  },
  {
    field: 'age',
    label: 'AGE',
    component: 'InputNumber',
    defaultValue: 1,
    componentProps: {
      placeholder: 'Please enter your age',
    },
  },
  {
    field: 'birthday',
    label: 'BIRTHDAY',
    component: 'DatePicker',
    defaultValue: '',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'Please select a date of birth',
    },
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    rules: [{ required: false, type: 'email', message: 'The mailbox is incorrectly formatted', trigger: 'blur' }],
    componentProps: {
      placeholder: 'Please enter your email address',
    },
  },
  {
    field: 'content',
    label: 'BIOGRAPHY - To introduce myself',
    component: 'InputTextArea',
    labelLength: 4,
    componentProps: {
      placeholder: 'Please enter a bio',
    },
  },
  {
    field: 'updateCount',
    label: 'Optimistic locks',
    show: false,
    component: 'Input',
  },
];
