<template>
  <!-- Enter the password of the third-party login binding account in the pop-up box -->
  <a-modal title="Please enter your password" v-model:visible="thirdPasswordShow" @ok="thirdLoginCheckPassword" @cancel="thirdLoginNoPassword">
    <a-input-password placeholder="Please enter your password" v-model:value="thirdLoginPassword" style="margin: 15px; width: 80%" />
  </a-modal>

  <!-- The third-party login prompts the pop-up box of whether to bind the account -->
  <a-modal :footer="null" :closable="false" v-model:visible="thirdConfirmShow" :class="'ant-modal-confirm'">
    <div class="ant-modal-confirm-body-wrapper">
      <div class="ant-modal-confirm-body">
        <QuestionCircleFilled style="color: #faad14" />
        <span class="ant-modal-confirm-title">Prompt</span>
        <div class="ant-modal-confirm-content"> If an account with the same name exists, please confirm whether to bind the account? </div>
      </div>
      <div class="ant-modal-confirm-btns">
        <a-button @click="thirdLoginUserCreate" :loading="thirdCreateUserLoding">Create a new account</a-button>
        <a-button @click="thirdLoginUserBind" type="primary">Confirm the binding</a-button>
      </div>
    </div>
  </a-modal>

  <!-- 第三方登录绑定手机号 -->
  <a-modal title="绑定手机号" v-model:visible="bindingPhoneModal" :maskClosable="false">
    <Form class="p-4 enter-x" style="margin: 15px 10px">
      <FormItem class="enter-x">
        <a-input size="large" placeholder="Please enter your mobile phone number" v-model:value="thirdPhone" class="fix-auto-fill">
          <template #prefix>
            <Icon icon="ant-design:mobile-outlined" :style="{ color: 'rgba(0,0,0,.25)' }"></Icon>
          </template>
        </a-input>
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput size="large" class="fix-auto-fill" v-model:value="thirdCaptcha" placeholder="Please enter a verification code" :sendCodeApi="sendCodeApi">
          <template #prefix>
            <Icon icon="ant-design:mail-outlined" :style="{ color: 'rgba(0,0,0,.25)' }"></Icon>
          </template>
        </CountdownInput>
      </FormItem>
    </Form>
    <template #footer>
      <a-button type="primary" @click="thirdHandleOk">Are you sure</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Form, Input } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useThirdLogin } from '/@/hooks/system/useThirdLogin';
  import { QuestionCircleFilled } from '@ant-design/icons-vue';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;

  export default defineComponent({
    name: 'ThirdModal',
    components: { FormItem, Form, InputPassword, CountdownInput, QuestionCircleFilled },
    setup() {
      return {
        ...useThirdLogin(),
      };
    },
  });
</script>
