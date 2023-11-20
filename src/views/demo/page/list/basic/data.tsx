export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      title: 'Jeecg Admin',
      description: '基于Vue Next, TypeScript, Ant Design A complete set of enterprise-level back-end management systems implemented by Vue',
      datetime: '2020-11-26 17:39',
      extra: 'Edit',
      icon: 'logos:vue',
      color: '#1890ff',
      author: 'Jeecg',
      percent: 20 * (i + 1),
    });
  }
  return result;
})();
