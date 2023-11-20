<template>
  <div :class="[`${prefixCls}`]">
    <div class="my-account">Third-party Apps</div>
    <div class="account-row-item">
      <div class="account-label gray-75">DingTalk binding</div>
      <span>
        <DingtalkCircleFilled :style="!bindDingData.sysUserId ? { color: '#9e9e9e' } : { color: '#007FFF' }" class="item-icon" />
        <span class="gray-75" style="margin-left: 12px">Dingtalk</span>
        <span class="gray-75" style="margin-left: 8px" v-if="bindDingData.realname">{{ 'Bind:' + bindDingData.realname }}</span>
        <span class="blue-e5 pointer" style="margin-left: 24px" @click="dingDingBind">{{ !bindDingData.sysUserId ? 'Bind' : 'Unbinding' }}</span>
      </span>
    </div>
    <div class="account-row-item">
      <div class="account-label gray-75">Account Binding</div>
      <span>
        <WechatFilled :style="!bindWechatData.sysUserId ? { color: '#9e9e9e' } : { color: '#1ec563' }" class="item-icon" />
        <span class="gray-75" style="margin-left: 12px">Wechat</span>
        <span class="gray-75" style="margin-left: 8px" v-if="bindWechatData.realname">{{ 'Bind:' + bindWechatData.realname }}</span>
        <span class="blue-e5 pointer" style="margin-left: 24px" @click="wechatBind">{{ !bindWechatData.sysUserId ? 'Bind' : 'Unbinding' }}</span>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup name="we-chat-ding-setting">
  import { onMounted, ref, reactive, unref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { bindThirdAppAccount, deleteThirdAccount, getThirdAccountByUserId } from './UserSetting.api';
  import { useUserStore } from '/@/store/modules/user';
  import { useModal } from '/@/components/Modal';
  import { DingtalkCircleFilled, createFromIconfontCN, WechatFilled } from '@ant-design/icons-vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Modal } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { prefixCls } = useDesign('j-user-tenant-setting-container');

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2316098_umqusozousr.js',
  });
  const userStore = useUserStore();

  //Bind the data of WeChat
  const bindWechatData = ref<any>({});
  //绑定钉钉的数据
  const bindDingData = ref<any>({});
  //绑定企业微信的数据
  const bindEnterpriseData = ref<any>({});

  const glob = useGlobSetting();
  //第三方类型
  const thirdType = ref('');
  //第三方用户UUID
  const thirdUserUuid = ref('');
  //第三方详情
  const thirdDetail = ref<any>({});
  const { createMessage } = useMessage();
  //windows对象，用于关闭窗口事件
  const windowsIndex = ref<any>('');
  //窗口监听事件
  const receiveMessage = ref<any>('');
  
  /**
   * Initialize DingTalk and WeCom data
   */
  async function initUserDetail() {
    let values = await getThirdAccountByUserId({ thirdType: 'wechat_open,dingtalk,wechat_enterprise' });
    bindWechatData.value = "";
    bindDingData.value = "";
    bindEnterpriseData.value = "";
    if (values && values.result) {
      let result = values.result;
      for (let i = 0; i < result.length; i++) {
        setThirdDetail(result[i]);
      }
    }
  }

  /**
   * WeCom binding and unbinding event
   */
  function wechatEnterpriseBind() {
    console.log('WeCom binding and unbinding event');
    let data = unref(bindEnterpriseData);
    if (!data.sysUserId) {
      onThirdLogin('wechat_enterprise');
    }else{
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'Wecom');
    }
  }

  /**
   * DingTalk binding unbinding event
   */
  function dingDingBind() {
    let data = unref(bindDingData);
    if (!data.sysUserId) {
      onThirdLogin('dingtalk');
    } else {
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'Dingtalk');
    }
    console.log('DingTalk binding unbinding event');
  }

  /**
   * 微信绑定
   */
  function wechatBind() {
    let data = unref(bindWechatData);
    if (!data.sysUserId) {
      onThirdLogin('wechat_open');
    }else{
      deleteAccount({ sysUserId: data.sysUserId, id: data.id }, 'Wechat');
    }
  }

  /**
   * 第三方登录
   * @param source
   */
  function onThirdLogin(source) {
    let url = `${glob.uploadUrl}/sys/thirdLogin/render/${source}`;
    //窗口为不空关闭
    console.log("unref(windowsIndex) ::",unref(windowsIndex))
    if(unref(windowsIndex)){
      //确保只有一个窗口
      windowsIndex.value.close();
      //确保只有一个监听
      window.removeEventListener('message', unref(receiveMessage),false);
    }
    
    windowsIndex.value = window.open(
      url,
      `login ${source}`,
      'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
    );
    thirdType.value = source;
    receiveMessage.value = async function (event) {
      let token = event.data;
      if (typeof token === 'string') {
        //If it is a string type, it means that it is token information
        if (token === 'Login failed') {
          cmsFailed();
        } else if (token.includes('Bind your mobile phone number')) {
          let strings = token.split(',');
          thirdUserUuid.value = strings[1];
          await bindThirdAccount();
        }else{
          if(token){
            createMessage.warning('The KnockCloud account has been bound to another third-party account, please unbind or bind the other KnockCloud account');
          }
        }
      } else {
        cmsFailed();
      }
      window.removeEventListener('message', unref(receiveMessage),false);
      windowsIndex.value = "";
    };
    window.addEventListener('message', unref(receiveMessage), false);
  }

  /**
   * Bind the current user
   */
  async function bindThirdAccount() {
    if (!unref(thirdUserUuid)) {
      cmsFailed();
      return;
    }
    let params = { thirdUserUuid: unref(thirdUserUuid), thirdType: unref(thirdType) };
    await bindThirdAppAccount(params)
      .then((res) => {
        if (res.success) {
          if (res.result) {
            setThirdDetail(res.result);
          }
        } else {
          createMessage.warning(res.message);
        }
      })
      .catch((res) => {
        createMessage.warning(res.message);
      });
  }

  /**
   * 失败提示信息
   */
  function cmsFailed() {
    createMessage.warning('The third-party account is abnormally bound');
    return;
  }

  /**
   * 设置第三方数据
   * @param value
   */
  function setThirdDetail(value) {
    let type = value.thirdType;
    if (type == 'wechat_open') {
      bindWechatData.value = value;
    } else if (type == 'dingtalk') {
      bindDingData.value = value;
    } else if (type == 'wechat_enterprise') {
      bindEnterpriseData.value = value;
    }
  }

  /**
   * 删除第三方信息表
   * @param params
   */
  async function deleteAccount(params, text) {
    Modal.confirm({
      title: 'Unbinding' + text,
      content: 'Are you sure you want to unbind?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await deleteThirdAccount(params).then((res) =>{
          if(res.success){
            initUserDetail();
            createMessage.success(res.message)
          }else{
            createMessage.warning(res.message)
          }
        });
      },
    });
  }

  onMounted(() => {
    initUserDetail();
  });
</script>
<style lang="less">
// update-begin-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
@prefix-cls: ~'@{namespace}-j-user-tenant-setting-container';
.@{prefix-cls} {
   padding: 30px 40px 0 20px;
  .account-row-item {
    align-items: center;
    /*begin 兼容暗夜模式*/
    border-bottom: 1px solid @border-color-base;
    /*end 兼容暗夜模式*/
    box-sizing: border-box;
    display: flex;
    height: 71px;
    position: relative;
  }

  .account-label {
    text-align: left;
    width: 160px;
  }

  .gray-75 {
    /*begin 兼容暗夜模式*/
    color: @text-color !important;
    /*end 兼容暗夜模式*/
  }

  .pointer {
    cursor: pointer;
  }

  .blue-e5 {
    color: #1e88e5;
  }

  .phone-margin {
    margin-left: 24px;
    margin-right: 24px;
  }

  .clearfix:after {
    clear: both;
  }

  .clearfix:before {
    content: '';
    display: table;
  }

  .my-account {
    font-size: 17px;
    font-weight: 700 !important;
    /*begin 兼容暗夜模式*/
    color: @text-color !important;
    /*end 兼容暗夜模式*/
    margin-bottom: 20px;
  }
  .item-icon {
    font-size: 16px !important;
  }
}
// update-end-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
</style>
