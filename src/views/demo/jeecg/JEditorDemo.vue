<template>
  <div class="p-4">
    <div class="p-4 bg-white">
      <a-button-group class="j-table-operator">
        <a-button type="primary" @click="setDis(0)">ENABLE</a-button>
        <a-button type="primary" @click="setDis(1)">DISABLE</a-button>
        <a-button type="primary" @click="getValues()">Validate the form and get the values</a-button>
        <a-button type="primary" @click="setValues()">Set the value</a-button>
      </a-button-group>

      <BasicForm @register="register" @submit="handleSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    title: 'Rich text | Markdown',
    name: 'MarkdownDemo',
  };
</script>

<script lang="ts" setup>
  import { FormSchema, useForm, BasicForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage, createSuccessModal } = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: 'NAME',
      required: true,
      defaultValue: 'zhangsan',
    },
    {
      field: 'tinymce',
      component: 'JEditor',
      label: 'Rich text',
      defaultValue: 'defaultValue',
      required: true,
    },
    {
      field: 'markdown',
      component: 'JMarkdownEditor',
      label: 'Markdown',
      defaultValue: '# TOM',
      required: true,
      componentProps: {
        height: 300,
      },
    },
  ];

  const [register, { setProps, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: schemas,
    actionColOptions: {
      span: 24,
    },
    compact: true,
    showResetButton: false,
    showSubmitButton: false,
    showAdvancedButton: false,
    disabled: false,
  });

  function handleSubmit(values) {
    console.log(values);
  }

  function setDis(flag) {
    setProps({ disabled: !!flag });
  }

  async function getValues() {
    try {
      const values = await validate();
      console.log(values);
      createSuccessModal({
        title: 'The verification passes',
        content: `${JSON.stringify(values)}`,
      });
    } catch (error) {
      createMessage.warning('The inspection failed');
    }
  }

  function setValues() {
    setFieldsValue({
      name: 'LiSi',
      markdown: '# John doe',
      tinymce: '<p><strong><span style="font-size: 18pt;">张<span style="color: #e03e2d;">THREE</span>ABUNDANT</span></strong></p>',
    });
  }
</script>

<style scoped></style>
