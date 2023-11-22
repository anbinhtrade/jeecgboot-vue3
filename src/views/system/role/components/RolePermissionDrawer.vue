<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" width="650px" destroyOnClose showFooter>
    <template #title>
      Configure role permissions
      <a-dropdown>
        <Icon icon="ant-design:more-outlined" class="more-icon" />
        <template #overlay>
          <a-menu @click="treeMenuClick">
            <a-menu-item key="checkAll">Select All</a-menu-item>
            <a-menu-item key="cancelCheck">DESELECT</a-menu-item>
            <div class="line"></div>
            <a-menu-item key="openAll">Expand All</a-menu-item>
            <a-menu-item key="closeAll">Collapse all</a-menu-item>
            <div class="line"></div>
            <a-menu-item key="relation">Hierarchical association</a-menu-item>
            <a-menu-item key="standAlone">Hierarchy independent</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <BasicTree
      ref="treeRef"
      checkable
      :treeData="treeData"
      :checkedKeys="checkedKeys"
      :expandedKeys="expandedKeys"
      :selectedKeys="selectedKeys"
      :checkStrictly="checkStrictly"
      :clickRowToExpand="false"
      title="Permissions"
      @check="onCheck"
      @select="onTreeNodeSelect"
    >
      <template #title="{ slotTitle, ruleFlag }">
        {{ slotTitle }}
        <Icon v-if="ruleFlag" icon="ant-design:align-left-outlined" style="margin-left: 5px; color: red"></Icon>
      </template>
    </BasicTree>
    <!--右下角按钮-->
    <template #footer>
      <PopConfirmButton title="Data not saved yet. Are you sure to quit editing?" @confirm="closeDrawer" okText="OK" cancelText="Cancel">Cancel</PopConfirmButton>
      <a-button @click="handleSubmit(false)" type="primary" :loading="loading" ghost style="margin-right: 0.8rem">Save only</a-button>
      <a-button @click="handleSubmit(true)" type="primary" :loading="loading">Save and close</a-button>
    </template>
    <RoleDataRuleDrawer @register="registerDrawer1" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicDrawer, useDrawer, useDrawerInner } from '/src/components/Drawer';
  import { BasicTree, TreeItem } from '/src/components/Tree';
  import { PopConfirmButton } from '/@/components/Button';
  import RoleDataRuleDrawer from './RoleDataRuleDrawer.vue';
  import { queryTreeListForRole, queryRolePermission, saveRolePermission } from '../role.api';
  const emit = defineEmits(['register']);
  //树的信息
  const treeData = ref<TreeItem[]>([]);
  //树的全部节点信息
  const allTreeKeys = ref([]);
  //树的选择节点信息
  const checkedKeys = ref([]);
  const defaultCheckedKeys = ref([]);
  //树的选中的节点信息
  const selectedKeys = ref([]);
  const roleId = ref('');
  //树的实例
  const treeRef = ref(null);
  const loading = ref(false);

  //展开折叠的key
  const expandedKeys = ref<any>([]);
  //父子节点选中状态是否关联
  const checkStrictly = ref<boolean>(true);
  const [registerDrawer1, { openDrawer: openDataRuleDrawer }] = useDrawer();
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await reset();
    setDrawerProps({ confirmLoading: false, loading: true });
    roleId.value = data.roleId;
    //初始化数据
    const roleResult = await queryTreeListForRole();
    treeData.value = roleResult.treeList;
    allTreeKeys.value = roleResult.ids;
    expandedKeys.value = roleResult.ids;
    //初始化角色菜单数据
    const permResult = await queryRolePermission({ roleId: unref(roleId) });
    checkedKeys.value = permResult;
    defaultCheckedKeys.value = permResult;
    setDrawerProps({ loading: false });
  });
  /**
   * Click to select
   */
  function onCheck(o) {
    checkedKeys.value = o.checked ? o.checked : o;
  }
  /**
   * Select the node to open the data permission drawer
   */
  function onTreeNodeSelect(key) {
    if (key && key.length > 0) {
      selectedKeys.value = key;
    }
    openDataRuleDrawer(true, { functionId: unref(selectedKeys)[0], roleId: unref(roleId) });
  }
  /**
   * Data reset
   */
  function reset() {
    treeData.value = [];
    allTreeKeys.value = [];
    checkedKeys.value = [];
    defaultCheckedKeys.value = [];
    selectedKeys.value = [];
    roleId.value = '';
  }
  /**
   * Obtain a tree instance
   */
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  /**
   * 提交
   */
  async function handleSubmit(exit) {
    let params = {
      roleId: unref(roleId),
      permissionIds: unref(getTree().getCheckedKeys()).join(','),
      lastpermissionIds: unref(defaultCheckedKeys).join(','),
    };
    //update-begin-author:taoyan date:2023-2-11 for: issues/352 VUE角色授权重复保存
    if(loading.value===false){
      await doSave(params)
    }else{
      console.log('Wait for the last execution to complete!');
    }
    if(exit){
      // 如果关闭
      closeDrawer();
    }else{
      // 没有关闭需要重新获取选中数据
      const permResult = await queryRolePermission({ roleId: unref(roleId) });
      defaultCheckedKeys.value = permResult;
    }
  }
  
  // VUE角色授权重复保存 #352
  async function doSave(params) {
    loading.value = true;
    await saveRolePermission(params);
    setTimeout(()=>{
      loading.value = false;
    }, 500)
  }
  //update-end-author:taoyan date:2023-2-11 for: issues/352 VUE角色授权重复保存

  /**
   * Tree menu selection
   * @param key
   */
  function treeMenuClick({ key }) {
    if (key === 'checkAll') {
      checkedKeys.value = allTreeKeys.value;
    } else if (key === 'cancelCheck') {
      checkedKeys.value = [];
    } else if (key === 'openAll') {
      expandedKeys.value = allTreeKeys.value;
    } else if (key === 'closeAll') {
      expandedKeys.value = [];
    } else if (key === 'relation') {
      checkStrictly.value = false;
    } else {
      checkStrictly.value = true;
    }
  }
</script>

<style lang="less" scoped>
  /** Fixed action buttons */
  .jeecg-basic-tree {
    position: absolute;
    width: 618px;
  }
  //update-begin---author:wangshuai ---date:20230202  for：Drawer pop-up header icon drop-down style------------
  .line {
    height: 1px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
  }
  .more-icon {
    font-size: 20px !important;
    color: black;
    display: inline-flex;
    float: right;
    margin-right: 2px;
    cursor: pointer;
  }
  :deep(.jeecg-tree-header){
    border-bottom: none;
  }
  //update-end---author:wangshuai ---date:20230202  for：Drawer pop-up header icon drop-down style------------
</style>
