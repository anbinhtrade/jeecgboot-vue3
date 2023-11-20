<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px">New</a-button>
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
        <TableAction :actions="getActions(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <QuartzModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-quartz" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { getQuartzList, deleteQuartz, batchDeleteQuartz, executeImmediately, resumeJob, pauseJob, getExportUrl, getImportUrl } from './quartz.api';
  import { columns, searchFormSchema } from './quartz.data';
  import QuartzModal from './QuartzModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  // 列表页面公共参数、方法
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    designScope: 'quartz-template',
    tableProps: {
      title: 'Task list',
      api: getQuartzList,
      columns: columns,
      actionColumn: {
        width: 180,
      },
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
      },
    },
    exportConfig: {
      name: 'A list of scheduled tasks',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * Action column definition
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: 'INITIATE',
        popConfirm: {
          title: 'Whether to start the selected task?',
          confirm: handlerResume.bind(null, record),
        },
        ifShow: (_action) => {
          return record.status == -1;
        },
      },
      {
        label: 'Stop it',
        popConfirm: {
          title: 'Do you want to pause the selected task?',
          confirm: handlerPause.bind(null, record),
        },
        ifShow: (_action) => {
          return record.status == 0;
        },
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: 'Execute it now',
        popConfirm: {
          title: 'Whether the task is performed immediately?',
          confirm: handlerExecute.bind(null, record),
        },
      },
      {
        label: 'Edit',
        onClick: handleEdit.bind(null, record),
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

  /**
   * 新增事件
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
    await deleteQuartz({ id: record.id }, reload);
  }

  /**
   * 立即执行
   */
  async function handlerExecute(record) {
    await executeImmediately({ id: record.id }, reload);
  }

  /**
   * 暂停
   */
  async function handlerPause(record) {
    await pauseJob({ id: record.id }, reload);
  }

  /**
   * 启动
   */
  async function handlerResume(record) {
    await resumeJob({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteQuartz({ ids: selectedRowKeys.value }, reload);
  }
</script>
