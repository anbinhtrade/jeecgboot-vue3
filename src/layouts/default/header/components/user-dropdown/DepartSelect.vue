<template>
  <BasicModal v-bind="config" :title="currTitle" v-model:visible="visible" wrapClassName="loginSelectModal">
    <a-form ref="formRef" v-bind="layout" :colon="false" class="loginSelectForm">
      <a-form-item v-if="isMultiTenant" :validate-status="validate_status">
        <!--LABEL-->
        <template #label>
          <a-tooltip placement="topLeft">
            <template #title>
              <span>If you belong to a multi-tenant, select the tenant to which you belong to</span>
            </template>
            <a-avatar style="background-color: #87d068" :size="30"> Tenant </a-avatar>
          </a-tooltip>
        </template>
        <!--Department drop-down content-->
        <a-select v-model:value="tenantSelected" placeholder="Please select the department you want to log in" :class="{ 'valid-error': validate_status == 'error' }">
          <template #suffixIcon>
            <Icon icon="ant-design:gold-outline" />
          </template>
          <template v-for="tenant in tenantList" :key="tenant.id">
            <a-select-option :value="tenant.id">{{ tenant.name }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <a-form-item v-if="isMultiDepart" :validate-status="validate_status1">
        <!--LABEL-->
        <template #label>
          <a-tooltip placement="topLeft">
            <template #title>
              <span>You belong to more than one department, please select the department you are currently in</span>
            </template>
            <a-avatar style="background-color: rgb(104, 208, 203)" :size="30"> Department </a-avatar>
          </a-tooltip>
        </template>
        <!--Department drop-down content-->
        <a-select v-model:value="departSelected" placeholder="Please select the department you want to log in" :class="{ 'valid-error': validate_status1 == 'error' }">
          <template #suffixIcon>
            <Icon icon="ant-design:gold-outline" />
          </template>
          <template v-for="depart in departList" :key="depart.orgCode">
            <a-select-option :value="depart.orgCode">{{ depart.departName }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button @click="close">Shut down</a-button>
      <a-button @click="handleSubmit" type="primary">Confirm</a-button>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, watch, unref } from 'vue';
  import { Avatar } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal';
  import { getUserDeparts, selectDepart } from '/@/views/system/depart/depart.api';
  import { getUserTenants } from '/@/views/system/tenant/tenant.api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const userStore = useUserStore();
  const { createMessage, notification } = useMessage();
  const props = defineProps({
    title: { type: String, default: 'Department selection' },
    closable: { type: Boolean, default: false },
    username: { type: String, default: '' },
  });

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const config = {
    maskClosable: false,
    closable: false,
    canFullscreen: false,
    width: '500px',
    minHeight: 20,
    maxHeight: 20,
  };
  const currTitle = ref('');

  const isMultiTenant = ref(false);
  const currentTenantName = ref('');
  const tenantSelected = ref();
  const tenantList = ref([]);
  const validate_status = ref('');

  const isMultiDepart = ref(false);
  const currentDepartName = ref('');
  const departSelected = ref('');
  const departList = ref([]);
  const validate_status1 = ref('');
  //弹窗显隐
  const visible = ref(false);
  /**
   * The pop-up window opens for pre-processing
   */
  async function show() {
    //Load the department
    await loadDepartList();
    //Load the tenant
    await loadTenantList();
    //Header configuration
    if (unref(isMultiTenant) && unref(isMultiDepart)) {
      currTitle.value = 'Switch Tenants And Departments';
    } else if (unref(isMultiTenant)) {
      currTitle.value =
        unref(currentTenantName) && unref(currentTenantName).length > 0 ? `Tenant Switchover (current Tenant :${unref(currentTenantName)}）` : props.title;
    } else if (unref(isMultiDepart)) {
      currTitle.value =
        unref(currentDepartName) && unref(currentDepartName).length > 0 ? `Department Switch (Current Department.) :${unref(currentDepartName)}）` : props.title;
    }
    //The model is hidden
    if (unref(isMultiTenant) || unref(isMultiDepart)) {
      visible.value = true;
    }
  }
  /**
   *Load department information
   */
  async function loadDepartList() {
    const result = await getUserDeparts();
    if (!result.list || result.list.length == 0) {
      return;
    }
    let currentDepart = result.list.filter((item) => item.orgCode == result.orgCode);
    departList.value = result.list;
    departSelected.value = currentDepart && currentDepart.length > 0 ? result.orgCode : '';
    currentDepartName.value = currentDepart && currentDepart.length > 0 ? currentDepart[0].departName : '';
    isMultiDepart.value = true;
  }
  /**
   *加载租户信息
   */
  async function loadTenantList() {
    const result = await getUserTenants();
    if (!result.list || result.list.length == 0) {
      return;
    }
    let tenantId = userStore.getTenant;
    let currentTenant = result.list.filter((item) => item.id == tenantId);
    currentTenantName.value = currentTenant && currentTenant.length > 0 ? currentTenant[0].name : '';
    tenantList.value = result.list;
    tenantSelected.value = tenantId;
    isMultiTenant.value = true;
  }

  /**
   * 提交数据
   */
  async function handleSubmit() {
    if (unref(isMultiTenant) && unref(tenantSelected)==null) {
      validate_status.value = 'error';
      return false;
    }
    if (unref(isMultiDepart) && !unref(departSelected)) {
      validate_status1.value = 'error';
      return false;
    }
    departResolve()
      .then(() => {
        if (unref(isMultiTenant)) {
          userStore.setTenant(unref(tenantSelected));
        }
        createMessage.success('The switchover was successful');
        
        //切换租户后要刷新首页
        window.location.reload();
      })
      .catch((e) => {
        console.log('There was a problem with the sign-in selection', e);
      })
      .finally(() => {
        if (unref(isMultiTenant)) {
          userStore.setTenant(unref(tenantSelected));
        }
        close();
      });
  }
  /**
   *Toggle to select a department
   */
  function departResolve() {
    return new Promise(async (resolve, reject) => {
      if (!unref(isMultiDepart)) {
        resolve();
      } else {
        const result = await selectDepart({
          username: userStore.getUserInfo.username,
          orgCode: unref(departSelected),
          loginTenantId: unref(tenantSelected),
        });
        if (result.userInfo) {
          const userInfo = result.userInfo;
          userStore.setUserInfo(userInfo);
          resolve();
        } else {
          requestFailed(result);
          userStore.logout();
          reject();
        }
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
    departClear();
  }

  /**
   *Initialize the data
   */
  function departClear() {
    currTitle.value = '';

    isMultiTenant.value = false;
    currentTenantName.value = '';
    tenantSelected.value = '';
    tenantList.value = [];
    validate_status.value = '';

    isMultiDepart.value = false;
    currentDepartName.value = '';
    departSelected.value = '';
    departList.value = [];
    validate_status1.value = '';

    visible.value = false;
  }

  /**
   * Listening Username
   */
  watch(
    () => props.username,
    (value) => {
      value && loadDepartList();
    }
  );

  defineExpose({
    show,
  });
</script>
<style lang="less" scoped>
  .loginSelectForm {
    margin-bottom: -20px;
  }

  .loginSelectModal {
    top: 20px;
  }

  .valid-error .ant-select-selection__placeholder {
    color: #f5222d;
  }
</style>
