<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="Data rule configuration" width="450px" destroyOnClose>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="Data Rules" key="1">
        <a-checkbox-group v-model:value="dataRuleChecked" v-if="dataRuleList.length > 0">
          <a-row>
            <a-col :span="24" v-for="(item, index) in dataRuleList" :key="'dr' + index">
              <a-checkbox :value="item.id">{{ item.ruleName }}</a-checkbox>
            </a-col>

            <a-col :span="24">
              <div style="width: 100%; margin-top: 15px">
                <a-button @click="saveDataRuleForRole" type="primary" size="small"> <Icon icon="ant-design:save-outlined"></Icon>Click Save</a-button>
              </div>
            </a-col>
          </a-row>
        </a-checkbox-group>
        <div v-else><h3>No configuration information!</h3></div>
      </a-tab-pane>
    </a-tabs>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/src/components/Drawer';
  import { useMessage } from '/src/hooks/web/useMessage';
  import { queryDataRule, saveDataRule } from '../role.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();
  // 声明数据
  const functionId = ref('');
  const roleId = ref('');
  const dataRuleList = ref([]);
  const dataRuleChecked = ref([]);

  /**
   * DATA
   */
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await reset();
    setDrawerProps({ confirmLoading: false });
    //权限的id
    functionId.value = data.functionId;
    //角色的id
    roleId.value = data.roleId;
    //查询数据
    const res = await queryDataRule({ functionId: unref(functionId), roleId: unref(roleId) });
    if (res.success) {
      dataRuleList.value = res.result.datarule;
      if (res.result.drChecked) {
        dataRuleChecked.value = res.result.drChecked.split(',');
      }
    }
  });

  /**
   * RESET
   */
  function reset() {
    functionId.value = '';
    roleId.value = '';
    dataRuleList.value = [];
    dataRuleChecked.value = [];
  }

  /**
   * SUBMIT
   */
  async function saveDataRuleForRole() {
    if (!unref(dataRuleChecked) || unref(dataRuleChecked).length == 0) {
      createMessage.warning('Please note that no data permissions are checked!');
    }
    let params = {
      permissionId: unref(functionId),
      roleId: unref(roleId),
      dataRuleIds: unref(dataRuleChecked).join(','),
    };
    await saveDataRule(params);
    //Close the pop-up window
    closeDrawer();
    //Refresh the list
    emit('success');
  }
</script>
