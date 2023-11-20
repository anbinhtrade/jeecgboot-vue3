<template>
  <a-button-group class="j-table-operator">
    <a-button type="primary" @click="setDisabled(0)">ENABLE</a-button>
    <a-button type="primary" @click="setDisabled(1)">DISABLE</a-button>
    <a-button type="primary" @click="showUploadModal">File pop-up</a-button>
  </a-button-group>
  <BasicForm @register="register" @submit="handleSubmit" />
  <JUploadModal v-model:value="uploadModalValue" @register="registerModel" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormSchema, useForm, BasicForm } from '/@/components/Form';
  import { UploadTypeEnum } from '/@/components/Form/src/jeecg/components/JUpload';
  import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload';
  import { useModal } from '/@/components/Modal';

  const uploadModalValue = ref('');

  const schemas: FormSchema[] = [
    {
      field: 'uploadFile',
      component: 'JUpload',
      helpMessage: 'Unlimited uploads',
      label: 'Upload the file',
    },
    {
      field: 'uploadFileMax',
      component: 'JUpload',
      helpMessage: 'Upload up to 3 files',
      label: 'Upload the file（3）',
      componentProps: { maxCount: 3 },
    },
    {
      field: 'uploadImage',
      component: 'JUpload',
      label: 'Upload an image',
      helpMessage: 'Unlimited uploads',
      componentProps: {
        fileType: UploadTypeEnum.image,
      },
    },
    {
      field: 'uploadImageMax',
      component: 'JUpload',
      label: 'Upload an image（1）',
      helpMessage: 'Upload up to 1 image',
      componentProps: {
        fileType: UploadTypeEnum.image,
        maxCount: 1,
      },
    },
  ];

  const [registerModel, { openModal }] = useModal();

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

  function setDisabled(flag) {
    setProps({ disabled: !!flag });
  }

  function showUploadModal() {
    openModal(true, {
      maxCount: 9,
      fileType: UploadTypeEnum.image,
    });
  }
</script>
