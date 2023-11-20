<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="Change your password" @ok="handleSubmit">
    <a-form class="antd-modal-form" ref="formRef" :model="formState" :rules="validatorRules">
      <a-form-item name="oldpassword">
        <div class="black font-size-13">Original password</div>
        <div class="pass-padding">
          <a-input-password v-model:value="formState.oldpassword" placeholder="Original password" />
        </div>
        <div style="display: block">
          <span class="gray-9e float-left font-size-13">Login password to access the website</span>
        </div>
      </a-form-item>
      <a-form-item name="password">
        <span class="black font-size-13">New passwords</span>
        <div class="pass-padding">
          <a-input-password v-model:value="formState.password" placeholder="New passwords" />
        </div>
        <span class="gray-9e font-size-13">8-20 digits, including letters and numbers</span>
      </a-form-item>
    </a-form>
  </BasicModal>
</template>
<script lang="ts" name="user-pass-word-modal" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Rule } from '/@/components/Form/index';
  import { updateUserPassword } from '../UserSetting.api';
  import { useMessage } from "/@/hooks/web/useMessage";
  import { useUserStore, useUserStoreWithOut } from "/@/store/modules/user";

  const $message = useMessage();
  //USERNAME
  const username = ref<string>('')
  const formRef = ref();
  const formState = reactive({
    oldpassword:'',
    password:'',
  });
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    username.value = data.record.username
  });
  const userStore = useUserStore();
  const validatorRules: Record<string, Rule[]> = {
    password: [{ required: true, validator:checkPassword},{ pattern:/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/,message:'8-20BIT，Must contain letters and numbers'}],
    oldpassword: [{ required: true, message: 'Please enter your original password' }],
  };

  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await formRef.value.validateFields();
      setModalProps({ confirmLoading: true });
      //提交表单
      values.username = unref(username);
      values.confirmpassword = values.password ;
      await updateUserPassword(values).then((res) =>{
        if(res.success){
          $message.createMessage.info({
            content:'The password has been changed successfully, please log in again! Automatically log out after 3 s',
            duration: 3
          })
          //3s后返回登录页面
          setTimeout(()=>{
            userStore.logout(true);
          },3000)
          //关闭弹窗
          closeModal();
        }else{
          $message.createMessage.warn(res.message);
        }
      });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /**
   * Verify that the new password is empty
   */
  function checkPassword(_rule: Rule, value: string) {
    if(value === ''){
      return Promise.reject('Please enter a new password');
    }
    return Promise.resolve();
  }
</script>
<style lang="less" scoped>
  .black {
    color: #000000;
  }
  .font-size-13 {
    font-size: 13px;
    line-height: 15px;
  }
  .gray-9e {
    color: #9e9e9e;
  }
  .float-left {
    float: left;
  }
  .pass-padding {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .forget{
    float: right;
    color: #1e88e5!important;
    cursor: pointer
  }
</style>
