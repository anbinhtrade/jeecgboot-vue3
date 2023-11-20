export interface GrowCardItem {
  icon: string;
  title: string;
  value?: number;
  total: number;
  color?: string;
  action?: string;
  footer?: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: 'Number of visits',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: 'MOON',
  },
  {
    title: 'TURNOVER',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: 'MOON',
  },
  {
    title: 'Number of downloads',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: 'WEEK',
  },
  {
    title: 'Number of transactions',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: 'YEAR',
  },
];

export const chartCardList: GrowCardItem[] = [
  {
    title: 'Total sales',
    icon: 'visit-count|svg',
    total: 126560,
    value: 234.56,
    footer: 'Average daily sales',
  },
  {
    title: 'Order volume',
    icon: 'total-sales|svg',
    value: 1234,
    total: 8846,
    color: 'blue',
    footer: 'Daily order volume',
  },
  {
    title: 'Number of payments',
    icon: 'download-count|svg',
    value: 60,
    total: 6560,
    color: 'orange',
    footer: 'Conversion rate',
  },
  {
    title: 'Effectiveness of operational activities',
    icon: 'transaction|svg',
    total: 78,
  },
];
export const bdcCardList: GrowCardItem[] = [
  {
    title: 'Amount Accepted',
    icon: 'ant-design:info-circle-outlined',
    total: 100,
    value: 60,
    footer: 'Quantity accepted today',
  },
  {
    title: 'Closing volume',
    icon: 'ant-design:info-circle-outlined',
    value: 54,
    total: 87,
    color: 'blue',
    footer: 'Today volume',
  },
  {
    title: 'The number of users accepted',
    icon: 'ant-design:info-circle-outlined',
    value: 13,
    total: 15,
    color: 'orange',
    footer: 'The number of users accepted today',
  },
  {
    title: 'The number of user settlements',
    icon: 'ant-design:info-circle-outlined',
    total: 9,
    value: 7,
    footer: 'The number of users who have completed the transaction today',
  },
];

export const table = {
  dataSource: [
    { reBizCode: '1', type: 'Transfer Registration', acceptBy: 'TOM', acceptDate: '2019-01-22', curNode: 'Task assignment', flowRate: 60 },
    { reBizCode: '2', type: 'Mortgage registration', acceptBy: 'John doe', acceptDate: '2019-01-23', curNode: 'Lead the review', flowRate: 30 },
    { reBizCode: '3', type: 'Transfer Registration', acceptBy: 'Wang Wu', acceptDate: '2019-01-25', curNode: 'Task processing', flowRate: 20 },
    { reBizCode: '4', type: 'Transfer Registration', acceptBy: 'Zhao Lou', acceptDate: '2019-11-22', curNode: 'Departmental Audits', flowRate: 80 },
    { reBizCode: '5', type: 'Transfer Registration', acceptBy: 'Money on it', acceptDate: '2019-12-12', curNode: 'Task assignment', flowRate: 90 },
    { reBizCode: '6', type: 'Transfer Registration', acceptBy: 'Sun bar', acceptDate: '2019-03-06', curNode: 'Task processing', flowRate: 10 },
    { reBizCode: '7', type: 'Mortgage registration', acceptBy: 'Zhou Da', acceptDate: '2019-04-13', curNode: 'Task assignment', flowRate: 100 },
    { reBizCode: '8', type: 'Mortgage registration', acceptBy: 'WUJI', acceptDate: '2019-05-09', curNode: 'Task escalation', flowRate: 50 },
    { reBizCode: '9', type: 'Mortgage registration', acceptBy: 'Zheng Shuang', acceptDate: '2019-07-12', curNode: 'Task processing', flowRate: 63 },
    { reBizCode: '20', type: 'Mortgage registration', acceptBy: 'Lin has', acceptDate: '2019-12-12', curNode: 'The mission is returned', flowRate: 59 },
    { reBizCode: '11', type: 'Transfer Registration', acceptBy: 'Code Cloud', acceptDate: '2019-09-10', curNode: 'Sign for the task', flowRate: 87 },
  ],
  columns: [
    {
      title: 'Service ID',
      align: 'center',
      dataIndex: 'reBizCode',
    },
    {
      title: 'Business type',
      align: 'center',
      dataIndex: 'type',
    },
    {
      title: 'ACCEPTEE',
      align: 'center',
      dataIndex: 'acceptBy',
    },
    {
      title: 'Reception hours',
      align: 'center',
      dataIndex: 'acceptDate',
    },
    {
      title: 'The current node',
      align: 'center',
      dataIndex: 'curNode',
    },
    {
      title: 'Processing time',
      align: 'center',
      dataIndex: 'flowRate',
    },
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' COMMON' + total + 'STRIP';
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
  },
};
export const table1 = {
  dataSource: [
    { reBizCode: 'A001', type: 'Transfer Registration', acceptBy: 'Zhang Si', acceptDate: '2019-01-22', curNode: 'Task assignment', flowRate: 12 },
    { reBizCode: 'A002', type: 'Mortgage registration', acceptBy: 'Lee bar', acceptDate: '2019-01-23', curNode: 'Sign for the task', flowRate: 3 },
    { reBizCode: 'A003', type: 'Transfer Registration', acceptBy: 'Wang III', acceptDate: '2019-01-25', curNode: 'Task processing', flowRate: 24 },
    { reBizCode: 'A004', type: 'Transfer Registration', acceptBy: 'Zhao Er', acceptDate: '2019-11-22', curNode: 'Departmental Audits', flowRate: 10 },
    { reBizCode: 'A005', type: 'Transfer Registration', acceptBy: 'Big money', acceptDate: '2019-12-12', curNode: 'Sign for the task', flowRate: 8 },
    { reBizCode: 'A006', type: 'Transfer Registration', acceptBy: 'Sun just', acceptDate: '2019-03-06', curNode: 'Task processing', flowRate: 10 },
    { reBizCode: 'A007', type: 'Mortgage registration', acceptBy: 'CIRCUMFERENCE', acceptDate: '2019-04-13', curNode: 'Departmental Audits', flowRate: 24 },
    { reBizCode: 'A008', type: 'Mortgage registration', acceptBy: 'Wu has', acceptDate: '2019-05-09', curNode: 'Departmental Audits', flowRate: 30 },
    { reBizCode: 'A009', type: 'Mortgage registration', acceptBy: 'Zheng Wu', acceptDate: '2019-07-12', curNode: 'Task assignment', flowRate: 1 },
    { reBizCode: 'A0010', type: 'Mortgage registration', acceptBy: 'Lin Shuang', acceptDate: '2019-12-12', curNode: 'Departmental Audits', flowRate: 16 },
    { reBizCode: 'A0011', type: 'Transfer Registration', acceptBy: 'YARD BUILDING', acceptDate: '2019-09-10', curNode: 'Departmental Audits', flowRate: 7 },
  ],
  columns: [
    {
      title: 'Service ID',
      align: 'center',
      dataIndex: 'reBizCode',
    },
    {
      title: 'ACCEPTEE',
      align: 'center',
      dataIndex: 'acceptBy',
    },
    {
      title: 'Initiation time',
      align: 'center',
      dataIndex: 'acceptDate',
    },
    {
      title: 'The current node',
      align: 'center',
      dataIndex: 'curNode',
    },
    {
      title: 'Timeout period',
      align: 'center',
      dataIndex: 'flowRate',
    },
  ],
  ipagination: {
    current: 1,
    pageSize: 5,
    pageSizeOptions: ['10', '20', '30'],
    showTotal: (total, range) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条';
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
  },
};
