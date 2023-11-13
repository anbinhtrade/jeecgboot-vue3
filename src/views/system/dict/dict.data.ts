import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { dictItemCheck } from './dict.api';
import { rules } from '/@/utils/helper/validator';
import { h } from "vue";

export const columns: BasicColumn[] = [
  {
    title: 'Dictionary name',
    dataIndex: 'dictName',
    width: 240,
  },
  {
    title: 'Dictionary encoding',
    dataIndex: 'dictCode',
    width: 240,
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    // width: 120
  },
];

export const recycleBincolumns: BasicColumn[] = [
  {
    title: 'Dictionary name',
    dataIndex: 'dictName',
    width: 120,
  },
  {
    title: 'Dictionary encoding',
    dataIndex: 'dictCode',
    width: 120,
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: 'Dictionary name',
    field: 'dictName',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: 'Dictionary encoding',
    field: 'dictCode',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'Dictionary name',
    field: 'dictName',
    required: true,
    component: 'Input',
  },
  {
    label: 'Dictionary encoding',
    field: 'dictCode',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_dict', 'dict_code', model, schema, true),
  },
  {
    label: 'DESCRIPTION',
    field: 'description',
    component: 'Input',
  },
];

export const dictItemColumns: BasicColumn[] = [
  {
    title: 'NAME',
    dataIndex: 'itemText',
    width: 80,
  },
  {
    title: 'Data values',
    dataIndex: 'itemValue',
    width: 80,
  },
  {
    title: 'Dictionary color',
    dataIndex: 'itemColor',
    width: 80,
    align:'center',
    customRender:({ text }) => {
      return h('div', {
        style: {"background": text, "width":"18px","height":"18px","border-radius":"50%","margin":"0 auto"}
      })
    }
  },
];

export const dictItemSearchFormSchema: FormSchema[] = [
  {
    label: 'NAME',
    field: 'itemText',
    component: 'Input',
  },
  {
    label: 'STATE',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'NAME',
    field: 'itemText',
    required: true,
    component: 'Input',
  },
  {
    label: 'Data values',
    field: 'itemValue',
    component: 'Input',
    dynamicRules: ({ values, model }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('Please enter a data value');
            }
            if (new RegExp("[`~!@#$^&*()=|{}'.<>《》/?！￥（）—【】‘；：”“。，、？]").test(value)) {
              return Promise.reject('Data values cannot contain special characters！');
            }
            return new Promise<void>((resolve, reject) => {
              let params = {
                dictId: values.dictId,
                id: model.id,
                itemValue: value,
              };
              dictItemCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject(res.message || 'The verification failed');
                })
                .catch((err) => {
                  reject(err.message || 'Validation failed');
                });
            });
          },
        },
      ];
    },
  },
  {
    label: 'Color values',
    field: 'itemColor',
    component: 'Input',
    slot:'itemColor'
  },
  {
    label: 'DESCRIPTION',
    field: 'description',
    component: 'Input',
  },
  {
    field: 'sortOrder',
    label: 'SORT',
    component: 'InputNumber',
    defaultValue: 1,
  },
  {
    field: 'status',
    label: 'Whether it is enabled',
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];
