<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="40%">
    <BasicForm @register="registerForm" :disabled="isDisabled" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './demo.data';
  import { saveOrUpdateDemo, getDemoById } from './demo.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);

  //Customize the acceptance parameters
  const props = defineProps({
    //Whether to disable the page
    isDisabled: {
      type: Boolean,
      default: false,
    },
  });

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
    setModalProps({ confirmLoading: false, showOkBtn: !props.isDisabled});
    isUpdate.value = !!data?.isUpdate;
    if(data.createBy){
      await setFieldsValue({createBy: data.createBy})
    }
    if(data.createTime){
      await setFieldsValue({createTime: data.createTime})
    }
    if (unref(isUpdate)) {
      //Get the details
      data.record = await getDemoById({ id: data.record.id });
      //Form assignment
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? 'NEW' : 'EDIT'));
  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdateDemo(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success', values);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
