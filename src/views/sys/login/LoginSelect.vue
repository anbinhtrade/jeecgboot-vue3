<template>
  <BasicModal v-bind="config" @register="registerModal" :title="currTitle" wrapClassName="loginSelectModal" v-model:visible="visible">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout" :colon="false" class="loginSelectForm">
      <!--Multi-tenant selection-->
      <a-form-item v-if="isMultiTenant" name="tenantId" :validate-status="validate_status">
        <!--label-->
        <template #label>
          <a-tooltip placement="topLeft">
            <template #title>
              <span>You belong to a multi-tenant, select Sign-in tenant</span>
            </template>
            <a-avatar style="background-color: #87d068" :size="30"> Tenant </a-avatar>
          </a-tooltip>
        </template>
        <template #extra v-if="validate_status == 'error'">
          <span style="color: #ed6f6f">Select Sign in to your tenant</span>
        </template>
        <!--Tenant drop-down content-->
        <a-select
          v-model:value="formState.tenantId"
          @change="handleTenantChange"
          placeholder="Select Sign in to your tenant"
          :class="{ 'valid-error': validate_status == 'error' }"
        >
          <template v-for="tenant in tenantList" :key="tenant.id">
            <a-select-option :value="tenant.id">{{ tenant.name }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <!--Multi-sector selection-->
      <a-form-item v-if="isMultiDepart" :validate-status="validate_status1" :colon="false">
        <!--Label-->
        <template #label>
          <a-tooltip placement="topLeft">
            <template #title>
              <span>You belong to more than one department, please select the department you are logged into</span>
            </template>
            <a-avatar style="background-color: rgb(104, 208, 203)" :size="30"> Department </a-avatar>
          </a-tooltip>
        </template>
        <template #extra v-if="validate_status1 == 'error'">
          <span style="color: #ed6f6f">Please select the department you want to log in</span>
        </template>
        <!--部门下拉内容-->
        <a-select
          v-model:value="formState.orgCode"
          @change="handleDepartChange"
          placeholder="Please select the department you want to log in"
          :class="{ 'valid-error': validate_status1 == 'error' }"
        >
          <template v-for="depart in departList" :key="depart.orgCode">
            <a-select-option :value="depart.orgCode">{{ depart.departName }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button @click="handleSubmit" type="primary">Confirm</a-button>
    </template>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, unref, reactive, UnwrapRef } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { defHttp } from '/@/utils/http/axios';
  interface FormState {
    orgCode: string | undefined;
    tenantId: number;
  }
  export default defineComponent({
    name: 'loginSelect',
    components: {
      Avatar,
      BasicModal,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const userStore = useUserStore();
      const { notification } = useMessage();
      //Tenant configuration
      const isMultiTenant = ref(false);
      const tenantList = ref([]);
      const validate_status = ref('');
      //Department configuration
      const isMultiDepart = ref(false);
      const departList = ref([]);
      const validate_status1 = ref('');
      //The pop-up window is hidden
      const visible = ref(false);
      //Logged-in user
      const username = ref('');
      //forms
      const formRef = ref();
      //The selected tenant department information
      const formState: UnwrapRef<FormState> = reactive({
        orgCode: undefined,
        tenantId: null,
      });

      const config = {
        maskClosable: false,
        closable: false,
        canFullscreen: false,
        width: '500px',
        minHeight: 20,
        maxHeight: 20,
      };
      //弹窗操作
      const [registerModal, { closeModal }] = useModalInner();

      //当前标题
      const currTitle = computed(() => {
        if (unref(isMultiDepart) && unref(isMultiTenant)) {
          return 'Please select a tenant and department';
        } else if (unref(isMultiDepart) && !unref(isMultiTenant)) {
          return 'Please select a department';
        } else if (!unref(isMultiDepart) && unref(isMultiTenant)) {
          return 'Please select a tenant';
        }
      });

      const rules = ref({
        tenantId: [{ required: unref(isMultiTenant), type: 'number', message: 'Please select a tenant', trigger: 'change' }],
        orgCode: [{ required: unref(isMultiDepart), message: 'Please select a department', trigger: 'change' }],
      });

      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
      };
      /**
       * Dealing with departmental situations
       */
      function bizDepart(loginResult) {
        //If the login interface returns the last login tenant ID of the user, you do not need to select it again
        if(loginResult.userInfo?.orgCode && loginResult.userInfo?.orgCode!==''){
          isMultiDepart.value = false;
          return;
        }
        
        let multi_depart = loginResult.multi_depart;
        //0:无部门 1:一个部门 2:多个部门
        if (multi_depart == 0) {
          notification.warn({
            message: 'Prompt',
            description: `If you are not in a department, please confirm your account information`,
            duration: 3,
          });
          isMultiDepart.value = false;
        } else if (multi_depart == 2) {
          isMultiDepart.value = true;
          departList.value = loginResult.departs;
        } else {
          isMultiDepart.value = false;
        }
      }

      /**
       * Handle tenant situations
       */
      function bizTenantList(loginResult) {
        //如果登录接口返回了用户上次登录租户ID，则不需要重新选择
        if(loginResult.userInfo?.loginTenantId && loginResult.userInfo?.loginTenantId!==0){
          isMultiTenant.value = false;
          return;
        }
        
        let tenantArr = loginResult.tenantList;
        if (Array.isArray(tenantArr)) {
          if (tenantArr.length === 0) {
            isMultiTenant.value = false;
            userStore.setTenant(formState.tenantId);
          } else if (tenantArr.length === 1) {
            formState.tenantId = tenantArr[0].id;
            isMultiTenant.value = false;
            userStore.setTenant(formState.tenantId);
          } else {
            isMultiTenant.value = true;
            tenantList.value = tenantArr;
          }
        }
      }

      /**
       * 确认选中的租户和部门信息
       */
      function handleSubmit() {
        if (unref(isMultiTenant) && !formState.tenantId) {
          validate_status.value = 'error';
          return false;
        }
        if (unref(isMultiDepart) && !formState.orgCode) {
          validate_status1.value = 'error';
          return false;
        }
        formRef.value
          .validate()
          .then(() => {
            departResolve()
              .then(() => {
                userStore.setTenant(formState.tenantId);
                emit('success');
              })
              .catch((e) => {
                console.log('There was a problem with the sign-in selection', e);
              })
              .finally(() => {
                close();
              });
          })
          .catch((err) => {
            console.log('The form verification failed error', err);
          });
      }
      /**
       *Toggle to select a department
       */
      function departResolve() {
        return new Promise((resolve, reject) => {
          if (!unref(isMultiDepart) && !unref(isMultiTenant)) {
            resolve();
          } else {
            let params = { orgCode: formState.orgCode,loginTenantId: formState.tenantId, username: unref(username) };
            defHttp.put({ url: '/sys/selectDepart', params }).then((res) => {
              if (res.userInfo) {
                userStore.setUserInfo(res.userInfo);
                resolve();
              } else {
                requestFailed(res);
                userStore.logout();
                reject();
              }
            });
          }
        });
      }

      /**
       * Request failure processing
       */
      function requestFailed(err) {
        notification.error({
          message: 'Login failed',
          description: ((err.response || {}).data || {}).message || err.message || 'There was an error on the request, please try again later',
          duration: 4,
        });
      }

      /**
       * Close the model
       */
      function close() {
        closeModal();
        reset();
      }
      /**
       * The pop-up window opens for pre-processing
       */
      async function show(loginResult) {
        if (loginResult) {
          username.value = userStore.username;
          await reset();
          await bizDepart(loginResult);
          await bizTenantList(loginResult);
          if (!unref(isMultiDepart) && !unref(isMultiTenant)) {
            emit('success', userStore.getUserInfo);
          } else {
            visible.value = true;
          }
        }
        //登录弹窗完成后，将登录的标识设置成false
        loginResult.isLogin = false;
        userStore.setLoginInfo(loginResult);
      }

      /**
       *Reset the data
       */
      function reset() {
        tenantList.value = [];
        validate_status.value = '';

        departList.value = [];
        validate_status1.value = '';
      }

      function handleTenantChange(e) {
        validate_status.value = '';
      }

      function handleDepartChange(e) {
        validate_status1.value = '';
      }

      return {
        registerModal,
        visible,
        tenantList,
        isMultiTenant,
        validate_status,
        isMultiDepart,
        departList,
        validate_status1,
        formState,
        rules,
        layout,
        formRef,
        currTitle,
        config,
        handleTenantChange,
        handleDepartChange,
        show,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .loginSelectForm {
    margin-bottom: -20px;
  }

  .loginSelectModal {
    top: 10px;
  }
</style>
