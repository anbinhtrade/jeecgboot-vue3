<template>
  <a-card title="An example of an incognito refresh" :bordered="false">
    <div style="margin-bottom: 8px">
      <span>Enables the Data Change effect：</span>
      <a-switch v-model:checked="reloadEffect" />
    </div>

    <!--
      【Leave no trace to refresh the general idea】：
      1. This function depends on the [Instant Save] function, please look at the instant save example first
      2. The socket-reload property must be set to true
      3. There must be a socket-key attribute, which is the unique identifier of the current table，
         The system will automatically update all tables with the same socket-key
      4. In the edit-closed event, which is saved locally，
         After saving successfully, call the socketSendUpdateRow method and pass the current row past (see line 102)
    -->
    <JVxeTable
      ref="tableRef"
      rowNumber
      rowSelection
      keepSource
      socketReload
      socketKey="demo-socket-reload"
      :reloadEffect="reloadEffect"
      :height="340"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      @valueChange="onValueChange"
      @edit-closed="handleEditClosed"
    />
  </a-card>
</template>

<script lang="ts" setup>
  // 无痕刷新示例
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { JVxeColumn, JVxeTableInstance, JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const tableRef = ref<JVxeTableInstance>();
  // Whether to enable the calendar refresh effect
  const reloadEffect = ref(true);
  const loading = ref(false);
  const dataSource = ref<Recordable[]>([]);
  const columns = ref<JVxeColumn[]>([
    { key: 'num', title: 'Serial Number', width: 80 },
    { key: 'enabled', title: 'Enable', width: 80, type: JVxeTypes.checkbox },
    { key: 'ship_name', title: 'Ship Name', width: 180, type: JVxeTypes.input },
    { key: 'call', title: 'CALL', width: 80, type: JVxeTypes.input },
    { key: 'len', title: 'LONG', width: 80, type: JVxeTypes.input },
    { key: 'ton', title: 'TON', width: 120, type: JVxeTypes.input },
    { key: 'payer', title: 'Payer', width: 120, type: JVxeTypes.input },
    { key: 'count', title: 'Count', width: 40 },
    { key: 'company', title: 'Company', minWidth: 180, type: JVxeTypes.input },
    { key: 'trend', title: 'Trend', width: 120, type: JVxeTypes.input },
  ]);

  // Query the URL address
  enum Api {
    getData = '/mock/vxe/getData',
  }

  loadData();

  // Load the data
  function loadData() {
    loading.value = true;
    defHttp
      .get({
        url: Api.getData,
        params: { pageNo: 1, pageSize: 200 },
      })
      .then((result) => {
        dataSource.value = result.records;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  /** An event that is triggered when a cell value changes */
  function onValueChange(event) {
    switch (event.type) {
      // All components that can't trigger the editClosed event need to be defined here, and you can install your own business requirements to complete the case here
      case JVxeTypes.radio:
      case JVxeTypes.checkbox:
        doSendUpdateRow(event);
        break;
    }
  }

  // An event that is triggered after the cell is edited
  function handleEditClosed(event) {
    doSendUpdateRow(event);
  }

  // Send a changeline request
  function doSendUpdateRow(event) {
    let { $table, row, column } = event;
    let field = column.property;
    // Determine whether the cell value has been modified
    if ($table.isUpdateByRow(row, field)) {
      // Verify the current line
      $table.validate(row).then((errMap) => {
        // The verification passes
        if (!errMap) {
          // [Mock Save] (here you need to replace it with a real request)
          let hideLoading = createMessage.loading(`SAVING"${column.title}"`, 0);
          setTimeout(() => {
            hideLoading();
            createMessage.success(`"${column.title}"The save was successful！`);
            // Partially update the cell to a saved state
            $table.reloadRow(row, null, field);
            // Send an update message
            tableRef.value?.socketSendUpdateRow(row);
          }, 555);
        }
      });
    }
  }
</script>

<style scoped></style>
