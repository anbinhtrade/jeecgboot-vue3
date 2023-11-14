import { FormSchema } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: 'Current password',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'passwordNew',
    label: 'New passwords',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: 'New passwords',
    },
    rules: [
      {
        required: true,
        message: 'Please enter a new password',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: 'Confirm your password',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('It cant be empty');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('The password entered twice is inconsistent!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
