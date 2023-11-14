import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: 'TITLE',
    dataIndex: 'titile',
    width: 100,
    align: 'left',
  },
  {
    title: 'The type of message',
    dataIndex: 'msgCategory',
    width: 80,
    customRender: ({ text }) => {
      return render.renderDictNative(
        text,
        [
          { label: 'Notification Announcement', value: '1', color: 'blue' },
          { label: 'System messages', value: '2' },
        ],
        true
      );
    },
  },
  {
    title: 'PUBLISHER',
    dataIndex: 'sender',
    width: 80,
  },
  {
    title: 'RELEASED',
    dataIndex: 'sendTime',
    width: 80,
  },
  {
    title: 'PRIORITY',
    dataIndex: 'priority',
    width: 80,
    customRender: ({ text }) => {
      const color = text == 'L' ? 'blue' : text == 'M' ? 'yellow' : 'red';
      return render.renderTag(render.renderDict(text, 'priority'), color);
    },
  },
  {
    title: 'Reading status',
    dataIndex: 'readFlag',
    width: 80,
    customRender: ({ text }) => {
      return render.renderDictNative(
        text,
        [
          { label: 'UNREAD', value: '0', color: 'red' },
          { label: 'READ', value: '1' },
        ],
        true
      );
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'titile',
    label: 'TITLE',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'sender',
    label: 'PUBLISHER',
    component: 'Input',
    colProps: { span: 8 },
  },
];
