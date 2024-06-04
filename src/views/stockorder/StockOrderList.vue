<template>
  <div class="p-2">
    <!--Query area-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!--Reference table-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--Slot: table title-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> Thêm lệnh mua/bán chứng khoán</a-button>
        <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> Xuất ra file</a-button>
        <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">Nhập từ file</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                Delete
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>Delete
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--Action bar-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- Form area -->
    <StockOrderModal ref="registerModal" @success="handleSuccess"></StockOrderModal>
  </div>
</template>

<script lang="ts" name="stockorder-stockOrder" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns } from './StockOrder.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './StockOrder.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import StockOrderModal from './components/StockOrderModal.vue'
  import { useUserStore } from '/@/store/modules/user';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //Register table data
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: 'Danh sách lệnh mua/bán chứng khoán',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "Danh sách lệnh mua/bán chứng khoán",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  /**
   * New event
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }
  
  /**
   * Edit event
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
   
  /**
   * Details
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }
   
  /**
   * Delete event
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
   
  /**
   * Batch delete events
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
   
  /**
   * Successful callback
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
   
  /**
   * Action bar
   */
  function getTableAction(record) {
    return [
      {
        label: 'Sửa',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
   
  /**
   * Drop-down action bar
   */
  function getDropDownAction(record) {
    return [
      {
        label: 'Chi tiết',
        onClick: handleDetail.bind(null, record),
      }, {
        label: 'Xóa',
        popConfirm: {
          title: 'Xác nhận xóa',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        }
      }
    ]
  }

  /**
   * Search
   */
  function searchQuery() {
    reload();
  }
  
  /**
   * Reset
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //Refresh data
    reload();
  }
  



</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      width: calc(50% - 15px);
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
  }
</style>
