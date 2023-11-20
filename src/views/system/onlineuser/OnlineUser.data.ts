import { FormSchema } from '/@/components/Table';
import { render } from "/@/utils/common/renderUtils";
import { getToken } from '/@/utils/auth';

//LIST
export const columns = [
  {
    title:'User Name',
    align:"center",
    dataIndex: 'username',
    customRender: ( {text,record} ) => {
      let token = getToken();
      if(record.token === token) {
        return text + '（我）'
      }
      return text
    },
  },{
    title:'Real Name',
    align:"center",
    dataIndex: 'realname'
  },{
    title: 'Avatar',
    align: "center",
    width: 120,
    dataIndex: 'avatar',
    customRender: render.renderAvatar,
  },{
    title:'Birthday',
    align:"center",
    dataIndex: 'birthday'
  },{
    title: 'Gender',
    align: "center",
    dataIndex: 'sex',
    customRender: ({text}) => {
      return render.renderDict(text, 'sex');
    }
  },{
    title:'Phone number',
    align:"center",
    dataIndex: 'phone'
  }
];

//Query area
export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: 'User Name',
    component: 'Input',
    colProps: { span: 6 },
  }
];
