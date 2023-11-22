<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:user-add-outlined" type="primary" @click="handleAdd">New</a-button>
        <a-button
          v-if="selectedRowKeys.length > 0"
          preIcon="ant-design:delete-outlined"
          type="primary"
          @click="handlePackBatch"
          style="margin-right: 5px"
        >Delete in bulk
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <!--  Product Packages  -->
    <TenantPackMenuModal @register="registerPackMenuModal" @success="handleSuccess"/>
  </div>
</template>
<script lang="ts" name="tenant-default-pack" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { deletePackPermissions, packList } from '../tenant.api';
  import { packColumns, packFormSchema } from '../tenant.data';
  import TenantPackMenuModal from './TenantPackMenuModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useUserStore } from '/@/store/modules/user';
  import {Modal} from "ant-design-vue";

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerPackMenuModal, { openModal: packModal }] = useModal();
  const userStore = useUserStore();

  // Common parameters and methods on the list page
  const { prefixCls, tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      api: packList,
      columns: packColumns,
      formConfig: {
        schemas: packFormSchema,
      },
      beforeFetch: (params) => {
        return Object.assign(params, { packType: 'default' });
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
        label: 'Edit',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'Delete',
        popConfirm: {
          title: 'Whether to confirm the deletion of the tenant package',
          confirm: handleDelete.bind(null, record.id),
        },
      },
    ];
  }

  /**
   * Edit the package
   */ 
  function handleAdd() {
    packModal(true, {
      isUpdate: false,
      packType:'default',
      showFooter: true
    });
  }
  
  
  /**
   * Delete the default package
   */ 
  async function handleDelete(id) {
    await deletePackPermissions({ ids: id }, handleSuccess);
  }
  /**
   * Edit
   */
  function handleEdit(record) {
    packModal(true, {     
      isUpdate: true,
      record: record,
      packType:'default',
      showFooter: true
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
    });
  }

  /**
   * After the deletion is successful, the event is called
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * Delete packages in bulk
   */
  async function handlePackBatch() {
    Modal.confirm({
      title: 'Delete the tenant package',
      content: 'Are you sure you want to delete the tenant package?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await deletePackPermissions({ ids: selectedRowKeys.value.join(',')}, handleSuccess);
      }
    })
  }
</script>
