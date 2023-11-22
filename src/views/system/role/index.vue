<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> New</a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> Export</a-button>
      <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">Import</j-upload-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined"></Icon>
              Delete
            </a-menu-item>
          </a-menu>
        </template>
        <a-button
          >Bulk operations
          <Icon icon="mdi:chevron-down"></Icon>
        </a-button>
      </a-dropdown>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <!--角色用户表格-->
  <RoleUserTable @register="roleUserDrawer" />
  <!--角色编辑抽屉-->
  <RoleDrawer @register="registerDrawer" @success="reload" :showFooter="showFooter" />
  <!--角色详情-->
  <RoleDesc @register="registerDesc"></RoleDesc>
  <!--角色菜单授权抽屉-->
  <RolePermissionDrawer @register="rolePermissionDrawer" />
  <!--角色首页配置-->
  <RoleIndexModal @register="registerIndexModal" />
</template>
<script lang="ts" name="system-role" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import RoleDrawer from './components/RoleDrawer.vue';
  import RoleDesc from './components/RoleDesc.vue';
  import RolePermissionDrawer from './components/RolePermissionDrawer.vue';
  import RoleIndexModal from './components/RoleIndexModal.vue';
  import RoleUserTable from './components/RoleUserTable.vue';
  import { columns, searchFormSchema } from './role.data';
  import { list, deleteRole, batchDeleteRole, getExportUrl, getImportUrl } from './role.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  const showFooter = ref(true);
  const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const [registerIndexModal, { openModal: openIndexModal }] = useModal();
  const [rolePermissionDrawer, { openDrawer: openRolePermissionDrawer }] = useDrawer();
  const [registerDesc, { openDrawer: openRoleDesc }] = useDrawer();

  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    designScope: 'role-template',
    tableProps: {
      title: 'List of system roles',
      api: list,
      columns: columns,
      formConfig: {
        // update-begin--author:liaozhiyang---date:20230803---for：【QQYUN-5873】查询区域lablel默认居左
        labelWidth:65,
        rowProps: { gutter: 24 },
        // update-end--author:liaozhiyang---date:20230803---for：【QQYUN-5873】查询区域lablel默认居左
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 120,
      },
      rowSelection: null,
      //自定义默认排序
      defSort: {
        column: 'id',
        order: 'desc',
      },
    },
    exportConfig: {
      name: 'List of roles',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * New
   */
  function handleCreate() {
    showFooter.value = true;
    openDrawer(true, {
      isUpdate: false,
    });
  }
  /**
   * Edit
   */
  function handleEdit(record: Recordable) {
    showFooter.value = true;
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * Detail
   */
  function handleDetail(record) {
    showFooter.value = false;
    openRoleDesc(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * Delete the event
   */
  async function handleDelete(record) {
    await deleteRole({ id: record.id }, reload);
  }
  /**
   * Delete events in bulk
   */
  async function batchHandleDelete() {
    await batchDeleteRole({ ids: selectedRowKeys.value }, reload);
  }
  /**
   * Character authorization pop-up
   */
  function handlePerssion(record) {
    openRolePermissionDrawer(true, { roleId: record.id });
  }

  /**
   * Configure pop-up window on the home page
   */
  function handleIndexConfig(roleCode) {
    openIndexModal(true, { roleCode });
  }
  /**
   * Role Users
   */
  function handleUser(record) {
    //onSelectChange(selectedRowKeys)
    openRoleUserDrawer(true, record);
  }
  /**
   * Action bar
   */
  function getTableAction(record) {
    return [
      {
        label: 'User',
        onClick: handleUser.bind(null, record),
      },
      {
        label: 'Permission',
        onClick: handlePerssion.bind(null, record),
      },
    ];
  }

  /**
   * Drop down the action bar
   */
  function getDropDownAction(record) {
    return [
      {
        label: 'Edit',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'Detail',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'Delete',
        popConfirm: {
          title: 'Whether to confirm the deletion',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'Home page configuration',
        onClick: handleIndexConfig.bind(null, record.roleCode),
      },
    ];
  }
</script>
