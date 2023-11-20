<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
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
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <TenantInviteUserModal @register="registerSelUserModal" @inviteOk="handleInviteUserOk" />
    <TenantUserModal @register="registerTenUserModal" />
    <!--  Product Packages  -->
    <TenantPackList @register="registerPackModal" />
  </div>
</template>
<script lang="ts" name="my-tenant-list" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { invitationUserJoin, getTenantPageListByUserId } from '../tenant.api';
  import { columns, searchFormSchema } from '../tenant.data';
  import TenantModal from '../components/TenantModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TenantInviteUserModal from '../components/TenantInviteUserModal.vue';
  import TenantUserModal from '../components/TenantUserList.vue';
  import TenantPackList from '../pack/TenantPackList.vue';
  import { getTenantId } from '/@/utils/auth';
  import { useUserStore } from '/@/store/modules/user';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerSelUserModal, { openModal: userOpenModal }] = useModal();
  const [registerTenUserModal, { openModal: tenUserOpenModal }] = useModal();
  const [registerPackModal, { openModal: packModal }] = useModal();
  const userStore = useUserStore();

  // Common parameters and methods on the list page
  const { prefixCls, tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      title: 'List of tenants',
      api: getTenantPageListByUserId,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 150,
        fixed: 'right',
      },
      rowSelection:{
        type: "radio"
      },
      beforeFetch: (params) => {
        return Object.assign(params, { userTenantStatus: '1,3,4' });
      },
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
        label: 'User',
        onClick: handleSeeUser.bind(null, record.id),
      },
    ];
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
    if (value) {
      await invitationUserJoin({ ids: selectedRowKeys.value.join(','), phone: value });
    }
  }

  /**
   * View users
   * @param id
   */
  async function handleSeeUser(id) {
    tenUserOpenModal(true, {
      id: id,
    });
  }

  /**
   * A new product package has been added
   */
  async function handlePack() {
    if (unref(selectedRowKeys).length > 1) {
      createMessage.warn('Please select one');
      return;
    }
    packModal(true, {
      tenantId: unref(selectedRowKeys.value.join(',')),
      //My tenant doesn't show new and edit packages
      showPackAddAndEdit: false
    });
  }

  /**
   * After the deletion is successful, the event is called
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
</script>
