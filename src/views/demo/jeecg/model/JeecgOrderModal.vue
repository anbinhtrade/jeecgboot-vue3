<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="700px">
    <BasicForm @register="registerForm" />
    <!--TODO 子表Tab数据-->
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { defHttp } from '/@/utils/http/axios';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: [
      {
        field: 'orderCode',
        label: 'Order number',
        component: 'Input',
        required: true,
      },
      {
        field: 'ctype',
        label: 'The type of order',
        component: 'Select',
        componentProps: {
          options: [
            { label: 'Domestic orders', value: '1' },
            { label: 'International Orders', value: '2' },
          ],
        },
      },
      {
        field: 'orderDate',
        label: 'The date of the order',
        component: 'DatePicker',
        componentProps: {
          valueFormat: 'YYYY-MM-DD hh:mm:ss',
        },
      },
      {
        field: 'orderMoney',
        label: 'The amount of the order',
        component: 'InputNumber',
      },
      {
        field: 'content',
        label: 'Order notes',
        component: 'Input',
      },
      {
        field: 'id',
        label: 'id',
        component: 'Input',
        show: false,
      },
    ],
    showActionButtonGroup: false,
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
  //Set the title
  const title = computed(() => (!unref(isUpdate) ? 'Add a new order' : 'Edit the order'));
  //Form submission events
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //Submit the form
      let url = unref(isUpdate) ? '/test/order/edit' : '/test/order/add';
      defHttp.post({ url: url, params: values });
      //Close the pop-up window
      closeModal();
      //Refresh the list
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
