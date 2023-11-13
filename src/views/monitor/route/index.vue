<template>
  <div class="p-4">
    <BasicTable @register="registerTable" :indexColumnProps="indexColumnProps">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px">NEW</a-button>
      </template>
      <template #status="{ record, text }">
        <a-tag color="pink" v-if="text == 0">DISABLE</a-tag>
        <a-tag color="#87d068" v-if="text == 1">NORMAL</a-tag>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <RouteModal @register="registerDrawer" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-route" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getRouteList, deleteRoute } from './route.api';
  import { columns } from './route.data';
  import RouteModal from './RouteModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  const { createMessage } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const checkedKeys = ref<Array<string | number>>([]);

  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
    designScope: 'router-template',
    tableProps: {
      title: 'Route list',
      api: getRouteList,
      useSearchForm: false,
      columns: columns,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
  /**
   * 序号列配置
   */
  const indexColumnProps = {
    dataIndex: 'index',
    width: '15px',
  };

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
   * Select the event
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }

  /**
   * New events
   */
  function handleAdd() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  /**
   * Edit the event
   */
  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * Delete the event
   */
  async function handleDelete(record) {
    await deleteRoute({ id: record.id }, reload);
  }
</script>
