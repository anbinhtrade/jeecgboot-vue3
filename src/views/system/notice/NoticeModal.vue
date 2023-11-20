<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="900px" destroyOnClose>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './notice.data';
  import { saveOrUpdate } from './notice.api';
  // STATEMENT Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  //Form configuration
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  //Form assignment
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //Reset the form
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      if (data.record.userIds) {
        data.record.userIds = data.record.userIds.substring(0, data.record.userIds.length - 1);
      }
      //Form assignment
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //Set the title
  const title = computed(() => (!unref(isUpdate) ? 'New' : 'Edit'));
  //Form submission events
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //Submit the form
      //update-begin-author:liusq---date:20230404--for: [issue#429]Added the undefined parameter for notification and announcement submission ---
      if(values.msgType==='ALL'){
        values.userIds = '';
      }else{
        values.userIds += ',';
      }
      //update-end-author:liusq---date:20230404--for: [issue#429]Added the undefined parameter for notification and announcement submission ---
      await saveOrUpdate(values, isUpdate.value);
      //Close the pop-up window
      closeModal();
      //Refresh the list
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
