import { FormSchema } from '/@/components/Form';

// Department base form
export function useBasicFormSchema() {
  const basicFormSchema: FormSchema[] = [
    {
      field: 'departName',
      label: 'Name of the institution',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter the name of the organization/department',
      },
      rules: [{ required: true, message: 'The organization name cannot be empty' }],
    },
    {
      field: 'parentId',
      label: 'Superior department',
      component: 'TreeSelect',
      componentProps: {
        treeData: [],
        placeholder: 'NOT',
        dropdownStyle: { maxHeight: '200px', overflow: 'auto' },
      },
    },
    {
      field: 'orgCode',
      label: 'Mechanism code',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter your organization code',
      },
    },
    {
      field: 'orgCategory',
      label: 'Type of institution',
      component: 'RadioButtonGroup',
      componentProps: { options: [] },
    },
    {
      field: 'departOrder',
      label: 'SORT',
      component: 'InputNumber',
      componentProps: {},
    },
    {
      field: 'mobile',
      label: 'PHONE',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a phone number',
      },
    },
    {
      field: 'fax',
      label: 'FAX',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter a fax',
      },
    },
    {
      field: 'address',
      label: 'ADDRESS',
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter an address',
      },
    },
    {
      field: 'memo',
      label: 'REMARK',
      component: 'InputTextArea',
      componentProps: {
        placeholder: 'Please enter a comment',
      },
    },
  ];
  return { basicFormSchema };
}

// Institution Type Options
export const orgCategoryOptions = {
  // 一级部门
  root: [{ value: '1', label: 'FIRM' }],
  // Sub-divisions
  child: [
    { value: '2', label: 'DEPARTMENT' },
    { value: '3', label: 'POST' },
  ],
};
