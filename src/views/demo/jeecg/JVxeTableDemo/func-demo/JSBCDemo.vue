<template>
  <a-card title="Instant save samples" :bordered="false">
    <!--
      【即时保存大体思路】：
      1. JVxeTable 上必须加 keep-source 属性
      2. 监听 edit-closed事件，这个事件是在编辑完成后触发
      3. 在这个事件里面判断数据是否更改，如果更改了就调用接口进行保存操作
    -->
    <JVxeTable
      toolbar
      :toolbarConfig="toolbarConfig"
      rowNumber
      rowSelection
      keepSource
      asyncRemove
      :height="340"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      @save="handleTableSave"
      @removed="handleTableRemove"
      @edit-closed="handleEditClosed"
      @pageChange="handlePageChange"
      @selectRowChange="handleSelectRowChange"
    />
  </a-card>
</template>

<script lang="ts" setup>
  // 即时保存示例
  import { reactive, ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { JVxeColumn, JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  // Button configuration for the toolbar
  const toolbarConfig = reactive({
    // add Added buttons；remove 删除按钮；clearSelection Clear the selection button
    btn: ['add', 'save', 'remove', 'clearSelection'],
  });
  // Whether it is loading
  const loading = ref(false);
  // Paginer parameters
  const pagination = reactive({
    // The current page number
    current: 1,
    // Number of entries per page
    pageSize: 200,
    // The number of records that can be switched
    pageSizeOptions: ['10', '20', '30', '100', '200'],
    // The total number of data (the real total is not known at present, so fill in 0 first, and then assign the value after checking it in the background)
    total: 0,
  });
  // Selected rows
  const selectedRows = ref<Recordable[]>([]);
  // Data source, which controls the data in the table
  const dataSource = ref<Recordable[]>([]);
  // Column configuration to control the columns displayed in the table
  const columns = ref<JVxeColumn[]>([
    { key: 'num', title: 'Serial Number', width: 80, type: JVxeTypes.normal },
    {
      // The field key matches the field name of the background data
      key: 'ship_name',
      // The title of the column
      title: 'Ship Name',
      // The width of the column
      width: 180,
      // If this attribute is added, it means that the current cell is editable, type is the type of form, and input is a simple input box
      type: JVxeTypes.input,
    },
    { key: 'call', title: 'Call', width: 80, type: JVxeTypes.input },
    { key: 'len', title: 'Long', width: 80, type: JVxeTypes.input },
    { key: 'ton', title: 'Ton', width: 120, defaultValue: 233, type: JVxeTypes.input },
    { key: 'payer', title: 'Payer', width: 120, defaultValue: 'TOM', type: JVxeTypes.input },
    { key: 'count', title: 'Number', width: 40, type: JVxeTypes.normal },
    {
      key: 'company',
      title: 'Company',
      // The minimum width, unlike the width, is not a fixed width, and if there is extra space in the table, it is evenly distributed to the columns with minWidth set
      // If you want to fill the table with columns, you can write it like this
      minWidth: 180,
      type: JVxeTypes.input,
    },
    { key: 'trend', title: 'Trend', width: 120, type: JVxeTypes.input },
  ]);

  // Query the URL address
  enum Api {
    getData = '/mock/vxe/getData',
    // 模拟保存单行数据（即时保存）
    saveRow = '/mock/vxe/immediateSaveRow',
    // 模拟保存整个表格的数据
    saveAll = '/mock/vxe/immediateSaveAll',
  }

  loadData();

  // Load the data
  async function loadData() {
    loading.value = true;
    // 调用查询数据接口
    await defHttp
      .get({
        // 请求地址
        url: Api.getData,
        // 封装查询条件
        params: {
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
        },
      })
      .then((result) => {
        // The total amount of data queried back in the background
        pagination.total = result.total;
        // 将查询的数据赋值给 dataSource
        dataSource.value = result.records;
        // Reset the selection
        selectedRows.value = [];
      })
      .finally(() => {
        // Here's how it will be executed regardless of success or failure, and here it's off loading
        loading.value = false;
      });
  }

  // 【整体保存】点击保存按钮时触发的事件
  function handleTableSave({ $table, target }) {
    // 校验整个表格
    $table.validate().then((errMap) => {
      // 校验通过
      if (!errMap) {
        // 获取所有数据
        let tableData = target.getTableData();
        console.log('The currently saved data is:', tableData);
        // 获取新增的数据
        let newData = target.getNewData();
        console.log('-- New data:', newData);
        // 获取删除的数据
        let deleteData = target.getDeleteData();
        console.log('-- Deleted data:', deleteData);
        // 【模拟保存】
        loading.value = true;
        defHttp
          .post({
            url: Api.saveAll,
            params: tableData,
          })
          .then(() => {
            createMessage.success(`Save successfully!`);
          })
          .finally(() => {
            loading.value = false;
          });
      }
    });
  }

  // 触发单元格删除事件
  function handleTableRemove(event) {
    // 把 event.deleteRows 传给后台进行删除（注意：这里不会传递前端逻辑新增的数据，因为不需要请求后台删除）
    console.log('Data to be deleted: ', event.deleteRows);
    // 也可以只传ID，因为可以根据ID删除
    let deleteIds = event.deleteRows.map((row) => row.id);
    console.log('Data IDs to be deleted: ', deleteIds);

    // 模拟请求后台删除
    loading.value = true;
    window.setTimeout(() => {
      loading.value = false;
      createMessage.success('The deletion is successful');
      // 假设后台返回删除成功，必须要调用 confirmRemove() 方法，才会真正在表格里移除（会同时删除选中的逻辑新增的数据）
      event.confirmRemove();
    }, 1000);
  }

  // An event that is triggered after the cell is edited
  function handleEditClosed(event) {
    let { $table, row, column } = event;
    let field = column.property;
    // Determine whether the cell value has been modified
    if ($table.isUpdateByRow(row, field)) {
      // Verify the current line
      $table.validate(row).then((errMap) => {
        // The verification passes
        if (!errMap) {
          // 【Simulation Save】
          let hideLoading = createMessage.loading(`Saving "${column.title}"`, 0);
          console.log('Save data instantly：', row);
          defHttp
            .put({
              url: Api.saveRow,
              params: row,
            })
            .then((res) => {
              createMessage.success(`"${column.title}"The save was successful！`);
              // 局部更新单元格为已保存状态
              $table.reloadRow(row, null, field);
            })
            .finally(() => {
              hideLoading();
            });
        }
      });
    }
  }

  // An event that is triggered when a pagination parameter changes
  function handlePageChange(event) {
    // Re-assignment
    pagination.current = event.current;
    pagination.pageSize = event.pageSize;
    // Query the data
    loadData();
  }

  // An event that is triggered when the selected row changes
  function handleSelectRowChange(event) {
    selectedRows.value = event.selectedRows;
  }
</script>

<style scoped></style>
