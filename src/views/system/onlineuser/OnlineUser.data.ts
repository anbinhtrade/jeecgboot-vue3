import { FormSchema } from '/@/components/Table';
import { render } from "/@/utils/common/renderUtils";
import { getToken } from '/@/utils/auth';

//LIST
export const columns = [
  {
    title:'USER ACCOUNT',
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
    title:'USERNAME',
    align:"center",
    dataIndex: 'realname'
  },{
    title: 'HEAD SCULPTURE',
    align: "center",
    width: 120,
    dataIndex: 'avatar',
    customRender: render.renderAvatar,
  },{
    title:'DATE OF BIRTH',
    align:"center",
    dataIndex: 'birthday'
  },{
    title: 'SEXUALITY',
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
    label: 'USER ACCOUNT',
    component: 'Input',
    colProps: { span: 6 },
  }
];
