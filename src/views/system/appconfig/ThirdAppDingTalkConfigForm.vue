<template>
  <div class="base-collapse">
    <div class="header"> DingTalk integration </div>
    <a-collapse expand-icon-position="right" :bordered="false">
      <a-collapse-panel key="1">
        <template #header>
          <div style="font-size: 16px"> 1.Get docking information</div>
        </template>
        <div class="base-desc">Obtain the docking information from the enterprise WeChat to start integration and synchronization of address books</div>
        <div style="margin-top: 5px">
          <a href='https://help.qiaoqiaoyun.com/expand/dingding.html' target='_blank'>How to obtain docking information?</a>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <div class="sync-padding">
      <a-collapse expand-icon-position="right" :bordered="false">
        <a-collapse-panel key="2">
          <template #header>
            <div style="width: 100%; justify-content: space-between; display: flex">
              <div style="font-size: 16px"> 2.Entry of docking information</div>
            </div>
          </template>
          <div class="base-desc">After completing step 1，Fill in Agentld, AppKey、AppSecret后 Can be connected to applications and synchronized address book</div>
          <div class="flex-flow">
            <div class="base-title">Agentld</div>
            <div class="base-message">
              <a-input v-model:value="appConfigData.agentId" readonly />
            </div>
          </div>
          <div class="flex-flow">
            <div class="base-title">AppKey</div>
            <div class="base-message">
              <a-input v-model:value="appConfigData.clientId" readonly />
            </div>
          </div>
          <div class="flex-flow">
            <div class="base-title">AppSecret</div>
            <div class="base-message">
              <a-input v-model:value="appConfigData.clientSecret" readonly />
            </div>
          </div>
          <div style="margin-top: 20px; width: 100%; text-align: right">
            <a-button @click="dingEditClick">COMPILER</a-button>
          </div>
        </a-collapse-panel>
      </a-collapse>
      <div class="sync-padding">
        <div style="font-size: 16px; width: 100%"> 3.DATA SYNCHRONIZATION</div>
        <div style="margin-top: 20px" class="base-desc">
          Synchronize from DingTalk to local
          <ul style='list-style-type: disc;margin-left: 20px;'>
            <li>Synchronize departments to local</li>
            <li>
              Synchronize users under departments to local
              <a-tooltip title='Synchronize user and department documents'>
                <a-icon @click='handleIconClick' type="question-circle" class="sync-text"/>
              </a-tooltip>
            </li>
          </ul>
          <div style="float: right">
            <a-button :loading="btnLoading" @click="syncDingTalk">{{ !btnLoading ? 'SYNCHRONIZED' : 'SYNCHRONIZING' }}</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ThirdAppConfigModal @register="registerAppConfigModal" @success="handleSuccess" />
</template>

<script lang="ts">
  import { defineComponent, h, inject, onMounted, reactive, ref, watch } from 'vue';
  import { getThirdConfigByTenantId, syncDingTalkDepartUserToLocal } from './ThirdApp.api';
  import { useModal } from '/@/components/Modal';
  import ThirdAppConfigModal from './ThirdAppConfigModal.vue';
  import { Modal } from 'ant-design-vue';
  import { getTenantId } from '/@/utils/auth';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'OrganDingConfigForm',
    components: {
      ThirdAppConfigModal,
    },
    setup() {
      const { createMessage } = useMessage();
      //Collapse panel selects key
      const collapseActiveKey = ref<string>('');
      //Button loading event
      const btnLoading = ref<boolean>(false);
      //Third party configuration data
      const appConfigData = ref<any>({
        agentId: undefined,
        clientId: '',
        clientSecret: '',
      });

      //Enterprise WeChat DingTalk configuration modal
      const [registerAppConfigModal, { openModal }] = useModal();

      /**
       * DINGTALKEDIT
       */
      async function dingEditClick() {
        let tenantId = getTenantId();
        openModal(true, {
          tenantId: tenantId,
          thirdType: 'dingtalk',
        });
      }

      /**
       * Initialize third-party data
       */
      async function initThirdAppConfigData(params) {
        let values = await getThirdConfigByTenantId(params);
        if (values) {
          appConfigData.value = values;
        }
      }

      /**
       * SUCCESSFUL CALLBACK
       */
      function handleSuccess() {
        let tenantId = getTenantId();
        initThirdAppConfigData({ tenantId: tenantId, thirdType: 'dingtalk' });
      }

      /**
       * Synchronous DingTalk
       */
      async function syncDingTalk() {
        btnLoading.value = true;
        await syncDingTalkDepartUserToLocal()
          .then((res) => {
            let options = {};
            if (res.result) {
              options = {
                width: 600,
                title: res.message,
                content: () => {
                  let nodes;
                  let successInfo = [`The success message is as follows:`, renderTextarea(h, res.result.successInfo.map((v, i) => `${i + 1}. ${v}`).join('\n'))];
                  if (res.success) {
                    nodes = [...successInfo, h('br'), `No failure message!`];
                  } else {
                    nodes = [
                      `The failure message is as follows:`,
                      renderTextarea(h, res.result.failInfo.map((v, i) => `${i + 1}. ${v}`).join('\n')),
                      h('br'),
                      ...successInfo,
                    ];
                  }
                  return nodes;
                },
              };
            }
            if (res.success) {
              if (options != null) {
                Modal.success(options);
              } else {
                createMessage.warning(res.message);
              }
            } else {
              if (options && options.title) {
                Modal.warning(options)
              } else {
                createMessage.warning({
                  content: "Synchronization failed. Please check whether the docking information is filled in correctly and confirm whether the DingTalk configuration has been turned on.！",
                  duration: 5
                });
              }
            }
          })
          .finally(() => {
            btnLoading.value = false;
          });
      }

      /**
       * RENDER TEXT
       * @param h
       * @param value
       */
      function renderTextarea(h, value) {
        return h(
          'div',
          {
            id: 'box',
            style: {
              minHeight: '100px',
              border: '1px solid #d9d9d9',
              fontSize: '14px',
              maxHeight: '250px',
              whiteSpace: 'pre',
              overflow: 'auto',
              padding: '10px',
            },
          },
          value
        );
      }

      /**
       * DingTalk sync documents
       */
      function handleIconClick(){
        window.open("https://help.qiaoqiaoyun.com/expand/dingdingsyn.html","_target")
      }
      
      onMounted(() => {
        let tenantId = getTenantId();
        initThirdAppConfigData({ tenantId: tenantId, thirdType: 'dingtalk' });
      });

      return {
        appConfigData,
        collapseActiveKey,
        registerAppConfigModal,
        dingEditClick,
        handleSuccess,
        syncDingTalk,
        btnLoading,
        handleIconClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .header {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    height: 50px;
    justify-content: space-between;
    font-weight: 700;
    font-size: 18px;
  }

  .flex-flow {
    display: flex;
    min-height: 0;
  }

  .sync-padding {
    padding: 12px 0 16px;
  }

  .base-collapse {
    margin-top: 20px;
    padding: 0 24px;
    font-size: 20px;

    .base-desc {
      font-size: 14px;
    }

    .base-title {
      width: 100px;
      text-align: left;
      height: 50px;
      line-height: 50px;
    }

    .base-message {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }

    :deep(.ant-collapse-header) {
      padding: 12px 0 16px;
    }

    :deep(.ant-collapse-content-box) {
      padding-left: 0;
    }
  }
  /*begin Compatible with dark night mode*/
  //Set the card border to none in dark mode
  [data-theme='dark'] .base-collapse .ant-collapse{
    border: none !important;
  }
  /*end Compatible with dark night mode*/
  /*Document button question mark style*/
  .sync-text{
    margin-left: 2px;
    cursor: pointer;
    position: relative;
    top: 2px
  }
</style>
