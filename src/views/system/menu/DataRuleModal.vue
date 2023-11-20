<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="700px">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { dataRuleFormSchema } from './menu.data';
  import { saveOrUpdateRule } from './menu.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({ permissionId: String });
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: dataRuleFormSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
  });

  //Set the title
  const getTitle = computed(() => (!unref(isUpdate) ? 'New Rule' : 'Edit Rule'));

  //Form submission events
  async function handleSubmit() {
    try {
      const values = await validate();
      values.permissionId = props.permissionId;
      setModalProps({ confirmLoading: true });
      //Submit the form
      await saveOrUpdateRule(values, isUpdate.value);
      //Close the pop-up window
      closeModal();
      //Refresh the list
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
