<template>
  <PageWrapper title="Example of the Ref operation">
    <div class="mb-4">
      <a-button @click="setProps({ labelWidth: 150 })" class="mr-2"> CHANGElabelWidth </a-button>
      <a-button @click="setProps({ labelWidth: 120 })" class="mr-2"> RESTORElabelWidth </a-button>
      <a-button @click="setProps({ size: 'large' })" class="mr-2"> CHANGESize </a-button>
      <a-button @click="setProps({ size: 'default' })" class="mr-2"> RESTORESize </a-button>
      <a-button @click="setProps({ disabled: true })" class="mr-2"> Disable the form </a-button>
      <a-button @click="setProps({ disabled: false })" class="mr-2"> Do not release </a-button>
      <a-button @click="setProps({ compact: true })" class="mr-2"> Compact forms </a-button>
      <a-button @click="setProps({ compact: false })" class="mr-2"> Restore normal spacing </a-button>
      <a-button @click="setProps({ actionColOptions: { span: 8 } })" class="mr-2"> Position of the action button </a-button>
    </div>
    <div class="mb-4">
      <a-button @click="setProps({ showActionButtonGroup: false })" class="mr-2"> Hide the action button </a-button>
      <a-button @click="setProps({ showActionButtonGroup: true })" class="mr-2"> Displays the action buttons </a-button>
      <a-button @click="setProps({ showResetButton: false })" class="mr-2"> Hide the reset button </a-button>
      <a-button @click="setProps({ showResetButton: true })" class="mr-2"> The reset button is displayed </a-button>
      <a-button @click="setProps({ showSubmitButton: false })" class="mr-2"> Hide the query button </a-button>
      <a-button @click="setProps({ showSubmitButton: true })" class="mr-2"> The query button is displayed </a-button>
      <a-button
        @click="
          setProps({
            resetButtonOptions: {
              disabled: true,
              text: 'RESETNew',
            },
          })
        "
        class="mr-2"
      >
        Modify the reset button
      </a-button>
      <a-button
        @click="
          setProps({
            submitButtonOptions: {
              disabled: true,
              loading: true,
            },
          })
        "
        class="mr-2"
      >
        Modify the query button
      </a-button>
    </div>
    <CollapseContainer title="USE Example of ref calling form internal functions">
      <BasicForm :schemas="schemas" ref="formElRef" :labelWidth="100" @submit="handleSubmit" :actionColOptions="{ span: 24 }" />
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, FormSchema, FormActionType, FormProps } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: 'Field 1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: 'CUSTOMIZE placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: 'Field 2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: 'Field 3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: 'Field 4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'Option 1',
            value: '1',
            key: '1',
          },
          {
            label: 'Option 2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: 'Field 5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: 'Field 7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'Option 1',
            value: '1',
          },
          {
            label: 'Option 2',
            value: '2',
          },
        ],
      },
    },
  ];

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper },
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);
      const { createMessage } = useMessage();
      return {
        formElRef,
        schemas,
        handleSubmit: (values: any) => {
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        setProps(props: FormProps) {
          const formEl = formElRef.value;
          if (!formEl) return;
          formEl.setProps(props);
        },
      };
    },
  });
</script>
