<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" :width="700">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './position.data';
  import { saveOrUpdatePosition, getPositionById } from './position.api';
  // STATEMENT Emits
  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  //Form configuration
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
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
      //Get the details
      data.record = await getPositionById({ id: data.record.id });
      //Form assignment
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //Set the title
  const getTitle = computed(() => (!unref(isUpdate) ? 'New positions' : 'Editorial position'));
  //Form submission events
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //Submit the form
      await saveOrUpdatePosition(values, isUpdate.value);
      //Close the pop-up window
      closeModal();
      //Refresh the list
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
