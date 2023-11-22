<template>
  <div class="p-4">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> New Menu</a-button>
        <a-button type="primary" preIcon="ic:round-expand" @click="expandAll">Expand All</a-button>
        <a-button type="primary" preIcon="ic:round-compress" @click="collapseAll">Collapse all</a-button>

        <a-dropdown v-if="checkedKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                Delete
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >Bulk operations
            <Icon icon="ant-design:down-outlined" />
          </a-button>
        </a-dropdown>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" :showFooter="showFooter" />
    <DataRuleList @register="registerDrawer1" />
  </div>
</template>
<script lang="ts" name="system-menu" setup>
  import { nextTick, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import DataRuleList from './DataRuleList.vue';
  import { columns,searchFormSchema } from './menu.data';
  import { list, deleteMenu, batchDeleteMenu } from './menu.api';

  const checkedKeys = ref<Array<string | number>>([]);
  const showFooter = ref(true);
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerDrawer1, { openDrawer: openDataRule }] = useDrawer();
  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
    tableProps: {
      title: 'Menu list',
      api: list,
      columns: columns,
      size: 'small',
      pagination: false,
      isTreeTable: true,
      striped: true,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      tableSetting: { fullScreen: true },
      formConfig: {
        // update-begin--author:liaozhiyang---date:20230803---for：【QQYUN-5873】查询区域lablel默认居左
        labelWidth:60,
        owProps: { gutter: 24 },
        // update-end--author:liaozhiyang---date:20230803---for：【QQYUN-5873】查询区域lablel默认居左
        schemas: searchFormSchema,
        autoAdvancedCol: 4,
        baseColProps: { xs: 24, sm: 12, md: 6, lg: 6, xl: 6, xxl: 6 },
        actionColOptions: { xs: 24, sm: 12, md: 6, lg: 6, xl: 6, xxl: 6 },
      },
      actionColumn: {
        width: 120,
      },
    },
  });
  //Register table data
  const [registerTable, { reload, expandAll, collapseAll }] = tableContext;

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
   * Select the event
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }

  /**
   * New
   */
  function handleCreate() {
    showFooter.value = true;
    openDrawer(true, {
      isUpdate: false,
    });
  }

  /**
   * Edit
   */
  function handleEdit(record) {
    showFooter.value = true;
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * Detail
   */
  function handleDetail(record) {
    showFooter.value = false;
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * Add Sub
   */
  function handleAddSub(record) {
    openDrawer(true, {
      record: { parentId: record.id, menuType: 1 },
      isUpdate: false,
    });
  }
  /**
   * Data Permissions pop-up window
   */
  function handleDataRule(record) {
    openDataRule(true, { id: record.id });
  }

  /**
   * Delete
   */
  async function handleDelete(record) {
    await deleteMenu({ id: record.id }, reload);
  }
  /**
   * Delete events in bulk
   */
  async function batchHandleDelete() {
    await batchDeleteMenu({ ids: checkedKeys.value }, reload);
  }
  /**
   * Successful callback
   */
  function handleSuccess() {
    reload();
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }

  /**
   * Action bar
   */
  function getTableAction(record) {
    return [
      {
        label: 'Edit',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      // {
      //   label: 'Detail',
      //   onClick: handleDetail.bind(null, record),
      // },
      {
        label: 'Add Sub',
        onClick: handleAddSub.bind(null, record),
      },
      {
        label: 'Data Rules',
        onClick: handleDataRule.bind(null, record),
      },
      {
        label: 'Delete',
        color: 'error',
        popConfirm: {
          title: 'Whether to confirm the deletion',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
