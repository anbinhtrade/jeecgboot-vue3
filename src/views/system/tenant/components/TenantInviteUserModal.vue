<!--Invite users to join the tenant pop-up-->
<template>
  <BasicModal @register="registerModal" :width="500" :title="title" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts">
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'TenantInviteUserModal',
  components: {
    BasicModal,
    BasicForm,
  },
  setup(props, { emit }) {
    const title = ref<string>('Invite members');
    const [registerForm, { resetFields, validate }] = useForm({
      schemas: [
        {
          label: 'Mobile phone number',
          field: 'phone',
          component: 'Input',
          dynamicRules: () => {
            return [
              { required: true, message: 'Please fill in your mobile phone number' },
              { pattern: /^1[3456789]\d{9}$/, message: 'The format of the mobile phone number is incorrect' },
            ];
          },
        },
      ],
      showActionButtonGroup: false,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    });
    //表单赋值
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      //重置表单
      await resetFields();
      setModalProps({ minHeight: 100 });
    });

    /**
     * Submit it to the tenant list page
     */
    async function handleSubmit() {
      let values = await validate();
      emit('inviteOk',values.phone);
      closeModal();
    }

    return {
      title,
      registerModal,
      registerForm,
      handleSubmit,
    };
  },
});
</script>

<style scoped></style>
