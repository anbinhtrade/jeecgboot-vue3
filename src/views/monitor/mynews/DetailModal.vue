<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="Find out more" :minHeight="600" :showCancelBtn="false" :showOkBtn="false" :height="88" :destroyOnClose="true">
    <a-card class="daily-article">
      <a-card-meta :title="content.titile" :description="'Publisher:' + content.sender + ' Release time: ' + content.sendTime"> </a-card-meta>
      <a-divider />
      <span v-html="content.msgContent" class="article-content"></span>
      
      <div>
        <a-button v-if="hasHref" @click="jumpToHandlePage">Go to Processing<ArrowRightOutlined /></a-button>
      </div>
    </a-card>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { propTypes } from '/@/utils/propTypes';
  import { ArrowRightOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router'
  import xss from 'xss'
  const router = useRouter()
  
  import { ref, unref } from 'vue';
  const isUpdate = ref(true);
  const content = ref({});
  //Form assignment
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //data.record.msgContent = '<p>2323</p><input onmouseover=alert(1)>xss test';
      //update-begin-author:taoyan date:2022-7-14 for: VUEN-1702 【禁止问题】sql注入漏洞
      if(data.record.msgContent){
        data.record.msgContent = xss(data.record.msgContent)
      }
      //update-end-author:taoyan date:2022-7-14 for: VUEN-1702 【禁止问题】sql注入漏洞
      content.value = data.record;
      showHrefButton();
    }
  });
  
  const hasHref = ref(false)
  //You can view the message details
  function showHrefButton(){
    if(content.value.busId){
      hasHref.value = true;
    }
  }
  //Jump to the application page
  function jumpToHandlePage(){
    let temp:any = content.value
    if(temp.busId){
      //This busId is the task ID
      let jsonStr = temp.msgAbstract;
      let query = {};
      try {
        if(jsonStr){
          let temp = JSON.parse(jsonStr)
          if(temp){
            Object.keys(temp).map(k=>{
              query[k] = temp[k]
            });
          }
        }
      }catch(e){
        console.log('The parameter parsing is abnormal', e)
      }
      
      console.log('query', query, jsonStr)
      console.log('busId', temp.busId)
      
      if(Object.keys(query).length>0){
        // taskId taskDefKey procInsId
        router.push({ path: '/task/handle/' + temp.busId, query: query })
      }else{
        router.push({ path: '/task/handle/' + temp.busId })
      }
    }
    closeModal();
  }
  
</script>

<style scoped lang="less">
  .detail-iframe {
    border: 0;
    width: 100%;
    height: 100%;
    min-height: 600px;
  }
</style>
