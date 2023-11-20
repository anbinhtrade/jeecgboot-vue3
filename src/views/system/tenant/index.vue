<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px">New</a-button>
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
        <a-button
          preIcon="ant-design:user-add-outlined"
          type="primary"
          @click="handleInvitation"
          style="margin-right: 5px"
          :disabled="selectedRowKeys.length === 0"
          >Invite users to join</a-button
        >
        <a-button
          preIcon="ant-design:plus-outlined"
          type="primary"
          @click="handlePack"
          style="margin-right: 5px"
          :disabled="selectedRowKeys.length === 0"
          >PACKAGE</a-button
        >
        <a-button type="primary" @click="recycleBinClick" preIcon="ant-design:hdd-outlined">Recycle Bin</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <TenantModal @register="registerModal" @success="reload" />
    <TenantInviteUserModal @register="registerSelUserModal" @inviteOk="handleInviteUserOk"/>
    <TenantUserModal @register="registerTenUserModal" />
    <!--  Product Packages  -->
    <TenantPackList @register="registerPackModal" />
    <!--  Tenant Recycle Bin  -->
    <TenantRecycleBinModal @register="registerRecycleBinModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="system-tenant" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getTenantList, deleteTenant, batchDeleteTenant, invitationUserJoin } from './tenant.api';
  import { columns, searchFormSchema } from './tenant.data';
  import TenantModal from './components/TenantModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TenantInviteUserModal from './components/TenantInviteUserModal.vue';
  import TenantUserModal from './components/TenantUserList.vue';
  import TenantPackList from './pack/TenantPackList.vue';
  import TenantRecycleBinModal from './components/TenantRecycleBinModal.vue';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerSelUserModal, { openModal: userOpenModal }] = useModal();
  const [registerTenUserModal, { openModal: tenUserOpenModal }] = useModal();
  const [registerPackModal, { openModal: packModal }] = useModal();
  const [registerRecycleBinModal, { openModal: recycleBinModal }] = useModal();

  // Common parameters and methods on the list page
  const { prefixCls, tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      title: 'List of tenants',
      api: getTenantList,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
      },
      actionColumn:{
        width: 150,
        fixed:'right'
      }
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;

  /**
   * Action column definition
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: 'Edit',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'Delete',
        popConfirm: {
          title: 'Whether to confirm the deletion',
          placement: 'left',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'User',
        onClick: handleSeeUser.bind(null, record.id),
      },
    ];
  }

  /**
   * New events
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * Edit the event
   */
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * Delete the event
   */
  async function handleDelete(record) {
    await deleteTenant({ id: record.id }, handleSuccess);
  }

  /**
   * Delete events in bulk
   */
  async function batchHandleDelete() {
    await batchDeleteTenant({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * Invite users to join the tenant
   */
  function handleInvitation() {
    userOpenModal(true, {});
  }

  /**
   * The user selects the callback event
   * @param options
   * @param value
   */
  async function handleInviteUserOk(value) {
    //update-begin---author:wangshuai ---date:20230314  for：【QQYUN-4605】后台的邀请谁加入租户，没办法选不是租户下的用户------------
    if (value) {
      await invitationUserJoin({ ids: selectedRowKeys.value.join(','), phone: value });
    }
    //update-end---author:wangshuai ---date:20230314  for：【QQYUN-4605】后台的邀请谁加入租户，没办法选不是租户下的用户------------
  }

  /**
   * View users
   * @param id
   */
  function handleSeeUser(id) {
    tenUserOpenModal(true, {
      id: id,
    });
  }

  /**
   * A new product package has been added
   */
  function handlePack() {
    if (unref(selectedRowKeys).length > 1) {
      createMessage.warn('Please select one');
      return;
    }
    packModal(true, {
      tenantId: unref(selectedRowKeys.value.join(',')),
      //My Tenant shows New and Edit Packages
      showPackAddAndEdit: true
    });
  }

  /**
   * Recycle Bin
   */
  function recycleBinClick() {
    recycleBinModal(true, {});
  }

  /**
   * After the deletion is successful, the event is called
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
</script>
