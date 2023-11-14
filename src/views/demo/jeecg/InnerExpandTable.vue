<template>
  <a-card :bordered="false">
    <BasicTable @register="registerTable" :expandedRowKeys="expandedRowKeys" :rowSelection="rowSelection" @expand="handleExpand">
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> NEW</a-button>
      </template>
      <template #expandedRowRender>
        <BasicTable bordered size="middle" rowKey="id" :canResize="false" :columns="innerColumns" :dataSource="innerData" :pagination="false">
        </BasicTable>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <JVxeTableModal @register="registerModal" @success="reload()"></JVxeTableModal>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import JVxeTableModal from '/@/views/demo/vextable/jvxetable/JVxeTableModal.vue';
  //接口url
  const url = {
    list: '/test/order/orderList',
    delete: '/test/order/delete',
    deleteBatch: '/test/order/deleteBatch',
    customerListByMainId: '/test/order/listOrderCustomerByMainId',
  };
  // Expand the key
  const expandedRowKeys = ref<any[]>([]);
  // Select Key
  const checkedKeys = ref<any[]>([]);
  // Child table data
  const innerData = ref<any[]>([]);
  // Master header
  const columns = [
    {
      title: 'Order number',
      align: 'center',
      dataIndex: 'orderCode',
      width: 100,
    },
    {
      title: 'The type of order',
      align: 'center',
      dataIndex: 'ctype',
      width: 100,
      customRender: ({ text }) => {
        let re = '';
        if (text === '1') {
          re = '国内订单';
        } else if (text === '2') {
          re = '国际订单';
        }
        return re;
      },
    },
    {
      title: 'The date of the order',
      align: 'center',
      width: 100,
      dataIndex: 'orderDate',
    },
    {
      title: 'The amount of the order',
      align: 'center',
      dataIndex: 'orderMoney',
      width: 100,
    },
    {
      title: 'Order notes',
      align: 'center',
      dataIndex: 'content',
      width: 100,
    },
  ];
  // 子表表头
  const innerColumns = [
    {
      title: 'Customer name',
      align: 'center',
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'GENDER',
      align: 'center',
      dataIndex: 'sex',
      customRender: function (text) {
        //console.log(typeof  text )
        //console.log(text)
        if (text.value == '1') {
          return 'MAN';
        } else if (text.value == '2') {
          return 'WOMAN';
        } else {
          return text;
        }
      },
    },
    {
      title: 'Identification number',
      align: 'center',
      dataIndex: 'idcard',
    },
    {
      title: 'PHONE',
      dataIndex: 'telphone',
      align: 'center',
    },
  ];
  const list = (params) => defHttp.get({ url: url.list, params });
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    columns,
    api: list,
    rowKey: 'id',
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    clickToRowSelect: false,
    bordered: true,
    actionColumn: {
      width: 110,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 30,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };

  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  /**
   * 展开事件
   * */
  function handleExpand(expanded, record) {
    expandedRowKeys.value = [];
    innerData.value = [];
    if (expanded === true) {
      expandedRowKeys.value.push(record.id);
      defHttp.get({ url: url.customerListByMainId, params: { orderId: record.id } }, { isTransformResponse: false }).then((res) => {
        if (res.success) {
          innerData.value = res.result.records;
        }
      });
    }
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
  function handleDelete(record) {
    defHttp.delete({ url: url.delete, data: { id: record.id } }, { joinParamsToUrl: true }).then(() => {
      reload();
    });
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
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
</script>
<style scoped>
  .ant-card-body .table-operator {
    margin-bottom: 18px;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .anty-row-operator button {
    margin: 0 5px;
  }

  .ant-btn-danger {
    background-color: #ffffff;
  }

  .ant-modal-cust-warp {
    height: 100%;
  }

  .ant-modal-cust-warp .ant-modal-body {
    height: calc(100% - 110px) !important;
    overflow-y: auto;
  }

  .ant-modal-cust-warp .ant-modal-content {
    height: 90% !important;
    overflow-y: hidden;
  }
</style>
