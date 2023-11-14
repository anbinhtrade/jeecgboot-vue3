<template>
  <div>
    <!--Cite the table-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--slot: table title-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined">
          New
        </a-button>
<!--        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">-->
<!--          EXPORT-->
<!--        </a-button>-->
<!--        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">-->
<!--          IMPORT-->
<!--        </j-upload-button>-->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                Delete
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            Bulk Operations
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--Action Bar-->
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>

    <!-- Form area -->
    <SysTableWhiteListModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>

<script lang="ts" name="ahh-sysTableWhiteList" setup>
import {BasicTable, TableAction} from '/@/components/Table';
import {useModal} from '/@/components/Modal';
import {useListPage} from '/@/hooks/system/useListPage'
import SysTableWhiteListModal from './modules/SysTableWhiteListModal.vue'
import {columns, searchFormSchema} from './SysTableWhiteList.data';
import {batchDelete, deleteOne, getExportUrl, getImportUrl, list} from './SysTableWhiteList.api';

//注册model
const [registerModal, {openModal}] = useModal();
//注册table数据
const {prefixCls, tableContext, onExportXls, onImportXls} = useListPage({
  tableProps: {
    title: 'The system whitelist',
    api: list,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
    },
    actionColumn: {
      width: 120,
    },
  },
  exportConfig: {
    name: "The system whitelist",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, {reload}, {rowSelection, selectedRowKeys}] = tableContext

/**
 * New events
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
  });
}

/**
 * Edit the event
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}

/**
 * DETAIL
 */
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: false,
  });
}

/**
 * Delete the event
 */
async function handleDelete(record) {
  await deleteOne({id: record.id}, reload);
}

/**
 * Delete events in bulk
 */
async function batchHandleDelete() {
  await batchDelete({ids: selectedRowKeys.value}, reload);
}

/**
 * Successful callback
 */
function handleSuccess({isUpdate, values}) {
  reload();
}

/**
 * Action bar
 */
function getTableAction(record) {
  return [
    {
      label: 'EDIT',
      onClick: handleEdit.bind(null, record),
    }
  ]
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
  return [
    {
      label: 'DETAIL',
      onClick: handleDetail.bind(null, record),
    }, {
      label: 'DELETE',
      popConfirm: {
        title: 'Whether to confirm the deletion',
        confirm: handleDelete.bind(null, record),
      }
    }
  ]
}
</script>
<style scoped>

</style>
