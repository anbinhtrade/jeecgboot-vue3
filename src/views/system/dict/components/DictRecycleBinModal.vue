<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="Dictionary Recycle Bin" :showOkBtn="false" width="1000px" destroyOnClose>
    <BasicTable @register="registerTable">
      <!--Action bar-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, toRaw } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { recycleBincolumns } from '../dict.data';
  import { getRecycleBinList, putRecycleBin, deleteRecycleBin } from '../dict.api';
  // 声明Emits
  const emit = defineEmits(['success', 'register']);
  const checkedKeys = ref<Array<string | number>>([]);
  const [registerModal, { setModalProps, closeModal }] = useModalInner();
  //注册table数据
  const [registerTable, { reload }] = useTable({
    api: getRecycleBinList,
    columns: recycleBincolumns,
    striped: true,
    useSearchForm: false,
    showTableSetting: false,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    tableSetting: { fullScreen: true },
    canResize: false,
    actionColumn: {
      width: 100,
      title: 'Action',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * Restore the event
   */
  async function handleRevert(record) {
    await putRecycleBin(record.id, reload);
    emit('success');
  }
  /**
   * Delete the event
   */
  async function handleDelete(record) {
    await deleteRecycleBin(record.id, reload);
  }
  /**
   * Bulk restore events
   */
  function batchHandleRevert() {
    handleRevert({ id: toRaw(checkedKeys.value).join(',') });
  }
  /**
   * Delete events in bulk
   */
  function batchHandleDelete() {
    handleDelete({ id: toRaw(checkedKeys.value).join(',') });
  }
  //获取操作栏事件
  function getTableAction(record) {
    return [
      {
        label: 'Round-up',
        icon: 'ant-design:redo-outlined',
        popConfirm: {
          title: 'Whether to confirm the retrieval',
          confirm: handleRevert.bind(null, record),
        },
      },
      {
        label: 'Delete completely',
        icon: 'ant-design:scissor-outlined',
        color: 'error',
        popConfirm: {
          title: 'Whether to confirm the deletion',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
