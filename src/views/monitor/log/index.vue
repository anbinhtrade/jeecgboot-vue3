<template>
  <BasicTable @register="registerTable" :searchInfo="searchInfo" :columns="logColumns">
    <template #tableTitle>
      <a-tabs defaultActiveKey="1" @change="tabChange" size="small">
        <a-tab-pane tab="Login logs" key="1"></a-tab-pane>
        <a-tab-pane tab="Operation logs" key="2"></a-tab-pane>
      </a-tabs>
    </template>
    <template #expandedRowRender="{ record }">
      <div v-if="searchInfo.logType == 2">
        <div style="margin-bottom: 5px">
          <a-badge status="success" style="vertical-align: middle" />
          <span style="vertical-align: middle">Request method:{{ record.method }}</span></div
        >
        <div>
          <a-badge status="processing" style="vertical-align: middle" />
          <span style="vertical-align: middle">Request parameters:{{ record.requestParam }}</span></div
        >
      </div>
    </template>
  </BasicTable>
</template>
<script lang="ts" name="monitor-log" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getLogList } from './log.api';
  import { columns, searchFormSchema, operationLogColumn } from './log.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useListPage } from '/@/hooks/system/useListPage';
  const { createMessage } = useMessage();
  const checkedKeys = ref<Array<string | number>>([]);

  const logColumns = ref<any>(columns);
  const searchInfo = { logType: '1' };
  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
    designScope: 'user-list',
    tableProps: {
      title: 'List of logs',
      api: getLogList,
      expandRowByClick: true,
      showActionColumn: false,
      rowSelection: {
        columnWidth: 20,
      },
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD']],
      },
    },
  });

  const [registerTable, { reload }] = tableContext;

  // 日志类型
  function tabChange(key) {
    searchInfo.logType = key;
    //update-begin---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对------------
    if (key == '1') {
      logColumns.value = columns;
    } else {
      logColumns.value = operationLogColumn;
    }
    //update-end---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对--------------
    reload();
  }

  /**
   * Select the event
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
</script>
