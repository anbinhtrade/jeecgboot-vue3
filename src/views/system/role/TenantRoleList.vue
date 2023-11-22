<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> New</a-button>
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
      <div style="margin-left: 10px;margin-top: 5px">The currently logged-in tenant: <span class="tenant-name">{{loginTenantName}}</span> </div>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <!--Role User Table-->
  <RoleUserTable @register="roleUserDrawer" :disableUserEdit="true"/>
  <!--Character editing drawer-->
  <RoleDrawer @register="registerDrawer" @success="reload" :showFooter="showFooter" />
  <!--Role details-->
  <RoleDesc @register="registerDesc"></RoleDesc>
</template>
<script lang="ts" name="system-role" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import RoleDesc from './components/RoleDesc.vue';
  import RoleDrawer from './components/RoleDrawer.vue';
  import RoleUserTable from './components/RoleUserTable.vue';
  import { columns, searchFormSchema } from './role.data';
  import { listByTenant, deleteRole, batchDeleteRole, getExportUrl, getImportUrl } from './role.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { getLoginTenantName } from "/@/views/system/tenant/tenant.api";
  const showFooter = ref(true);
  const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const [registerDesc, { openDrawer: openRoleDesc }] = useDrawer();
  
  // Common parameters and methods on the list page
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    designScope: 'role-template',
    tableProps: {
      title: 'List of tenant roles',
      api: listByTenant,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 120,
      },
      rowSelection: null,
      //Customize the default sorting
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
    ];
  }

  /**
   * 下拉操作栏
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
    ];
  }

  const loginTenantName = ref<string>('');
  
  getTenantName();
  
  async function getTenantName(){
    loginTenantName.value = await getLoginTenantName();
  }
</script>

<style scoped lang="less">
  .tenant-name{
    text-decoration:underline;
    margin: 5px;
    font-size: 15px;
  }
</style>
