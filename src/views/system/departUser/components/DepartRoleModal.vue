<template>
  <BasicModal :title="title" :width="800" v-bind="$attrs" @ok="handleOk" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, inject, ref, unref } from 'vue';

  import { BasicForm, useForm } from '/@/components/Form/index';
  // noinspection ES6UnusedImports
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import { saveOrUpdateDepartRole } from '../depart.user.api';
  import { departRoleModalFormSchema } from '../depart.user.data';

  const emit = defineEmits(['success', 'register']);
  const props = defineProps({
    // Current Department ID
    departId: { require: true, type: String },
  });
  const prefixCls = inject('prefixCls');
  // Whether it is currently in update mode
  const isUpdate = ref<boolean>(true);
  // The current pop-up data
  const model = ref<object>({});
  const title = computed(() => (isUpdate.value ? 'EDIT' : 'NEW'));

  //Sign-up forms
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: departRoleModalFormSchema,
    showActionButtonGroup: false,
  });

  // Registration pop-up
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    isUpdate.value = unref(data?.isUpdate);
    // Whether you add or edit a form, you can set the form value
    let record = unref(data?.record);
    if (typeof record === 'object') {
      model.value = record;
      await setFieldsValue({ ...record });
    }
  });

  //提交事件
  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true });
      let values = await validate();
      values.departId = unref(props.departId);
      //提交表单
      await saveOrUpdateDepartRole(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success', { isUpdate: unref(isUpdate), values });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
