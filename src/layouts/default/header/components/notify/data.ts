export interface ListItem {
  id: string;
  avatar: string;
  // The title content of the notification
  title: string;
  // Whether or not to display strikethrough on the title
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
  // PRIORITY
  priority?: string;
}

export enum PriorityTypes {
  // Low priority, general message
  L = 'L',
  // Medium priority, important messages
  M = 'M',
  // High priority, urgent messages
  H = 'H',
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
  count: number;
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: 'NOTICE',
    list: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'You received 14 new weekly reports',
        description: '',
        datetime: '2017-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Your recommended Qu Nini has passed the third round of interviews',
        description: '',
        datetime: '2017-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'This template can distinguish between multiple notification types',
        description: '',
        datetime: '2017-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The title can be set to automatically display the ellipsis, in this example, the number of header lines has been set to 1 line, if the content exceeds 1 line, it will be automatically truncated and support tooltip to display the full title.',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000009',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000010',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icons on the left are used to distinguish between different types',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
    ],
    count: 0,
  },
  {
    key: '2',
    name: 'System messages',
    list: [
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Qu Lili commented on you',
        description: 'Descriptive informationDescription informationDescription information',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Zhu Biyou replied to you',
        description: 'This template is used to remind you who has interacted with you',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'TITLE',
        description:
          'Please move your mouse over here to test how extra-long messages will be handled here. In this example, the maximum number of description lines is set to 2, and descriptions that exceed 2 lines will be omitted and the full content can be viewed through tooltip',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
    ],
    count: 0,
  },
  // {
  //   key: '3',
  //   name: '待办',
  //   list: [
  //     {
  //       id: '000000009',
  //       avatar: '',
  //       title: '任务名称',
  //       description: '任务需要在 2017-01-12 20:00 前启动',
  //       datetime: '',
  //       extra: 'Didn't start',
  //       color: '',
  //       type: '3',
  //     },
  //     {
  //       id: '000000010',
  //       avatar: '',
  //       title: 'Third-party emergency code changes',
  //       description: 'Guanlin needs to complete the code change task by 2017-01-07',
  //       datetime: '',
  //       extra: 'Expires soon',
  //       color: 'red',
  //       type: '3',
  //     },
  //     {
  //       id: '000000011',
  //       avatar: '',
  //       title: 'Information Security Exam',
  //       description: 'Assign Zhu Eryu 2017-01-09 BEFORE COMPLETING THE UPDATE AND PUBLISHING',
  //       datetime: '',
  //       extra: 'It's been 8 days',
  //       color: 'gold',
  //       type: '3',
  //     },
  //     {
  //       id: '000000012',
  //       avatar: '',
  //       title: 'ABCD Version release',
  //       description: 'Assign Zhu Eryu 2017-01-09 前完成更新并发布',
  //       datetime: '',
  //       extra: 'ONGOING',
  //       color: 'blue',
  //       type: '3',
  //     },
  //   ],
  // },
];
