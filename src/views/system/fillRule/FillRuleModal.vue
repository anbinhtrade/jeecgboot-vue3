<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" :width="800" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './fill.rule.data';
  import { saveFillRule, updateFillRule } from './fill.rule.api';

  //Set the title
  const title = computed(() => (!unref(isUpdate) ? 'New' : 'Edit'));

  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);

  //Form configuration
  const [registerForm, { resetFields, setFieldsValue, validate, getFieldsValue }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 12 },
  });

  //Form assignment
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //Reset the form
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //Form assignment
      await setFieldsValue({
        ...data.record,
      });
    }
  });

  //表单提交事件
  async function handleSubmit() {
    try {
      let formValue = await validate();
      setModalProps({ confirmLoading: true });
      if (isUpdate.value) {
        let allFieldsValue = getFieldsValue();
        // Edit the page: If the form does not have a parent drop-down box, the validate method does not return this value when submitting, and it needs to be set manually
        if (!formValue.parentId && allFieldsValue.parentId) {
          formValue.parentId = allFieldsValue.parentId;
        }
        await updateFillRule(formValue);
      } else {
        await saveFillRule(formValue);
      }
      //Close the pop-up window
      closeModal();
      //Refresh the list
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
