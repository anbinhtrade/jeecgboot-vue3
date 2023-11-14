<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd" style="margin-right: 5px">NEW</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> EXPORT</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">IMPORT</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                DELETE
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
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <DataSourceModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-datasource" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDataSourceList, deleteDataSource, batchDeleteDataSource, getExportUrl, getImportUrl } from './datasource.api';
  import { columns, searchFormSchema } from './datasource.data';
  import DataSourceModal from './DataSourceModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onImportXls, onExportXls } = useListPage({
    designScope: 'quartz-template',
    tableProps: {
      title: 'Task list',
      api: getDataSourceList,
      columns: columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
      },
    },
    exportConfig: {
      name: 'List of data sources',
      url: getExportUrl,
    },
    importConifg: {
      url: getImportUrl,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * 操作列定义
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: 'EDIT',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: 'DELETE',
        popConfirm: {
          title: 'Whether to confirm the deletion',
          confirm: handleDelete.bind(null, record),
        },
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
   * 编辑事件
   */
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteDataSource({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteDataSource({ ids: selectedRowKeys.value }, reload);
  }
</script>
