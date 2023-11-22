<template>
  <div :class="prefixCls">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="onAdd">New</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> Export</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">Import</j-upload-button>
        <a-dropdown v-if="showBatchBtn">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="onDeleteBatch">
                <Icon icon="ant-design:delete-outlined"></Icon>
                <span>Delete</span>
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            <span>Bulk operations</span>
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <TemplateModal @register="registerModal" @success="reload" />
    <TemplateTestModal @register="registerTestModal" />
  </div>
</template>

<script lang="ts" setup name="message-template">
  import { unref, computed, toRaw } from 'vue';
  import { ActionItem, BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import TemplateModal from './TemplateModal.vue';
  import TemplateTestModal from './TemplateTestModal.vue';
  import { Api, saveOrUpdate, list, deleteBatch } from './template.api';
  import { columns, searchFormSchema } from './template.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  // Common parameters and methods on the list page
  const { prefixCls, onExportXls, onImportXls, tableContext } = useListPage({
    designScope: 'message-template',
    tableProps: {
      title: 'Message Center template list data',
      api: list,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
    },
    exportConfig: {
      url: Api.exportXls,
      name: 'A list of Message Center templates',
    },
    importConfig: {
      url: Api.importXls,
      success: () => reload(),
    },
  });

  // 注册 ListTable
  const [registerTable, { reload, setLoading }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;
  const [registerModal, { openModal }] = useModal();
  const [registerTestModal, testModal] = useModal();
  const showBatchBtn = computed(() => selectedRowKeys.value.length > 0);

  function onAdd() {
    openModal(true, {
      title: 'Message templates are added',
      isUpdate: false,
      showFooter: true,
      record: {},
    });
  }

  function onEdit(record) {
    if (record.useStatus === '1') {
      createMessage.warning('This template has been applied and editing is prohibited!');
      return;
    }
    openModal(true, {
      title: 'Modify the message template',
      isUpdate: true,
      record: record,
      showFooter: true,
    });
  }

  function onDelete(record) {
    if (record) {
      //update-begin-author:taoyan date:2022-7-14 for: VUEN-1652【bug】应用状态下不允许删除
      if(record.useStatus == '1'){
        createMessage.warning('The template has been removed by the app ban!');
        return;
      }
      //update-end-author:taoyan date:2022-7-14 for: VUEN-1652【bug】应用状态下不允许删除
      doDeleteDepart([record.id], false);
    }
  }

  /**
   * Bulk deletion based on IDS
   * @param idListRef array
   * @param confirm Whether to display a confirmation prompt
   */
  async function doDeleteDepart(idListRef, confirm = true) {
    const idList = unref(idListRef);
    if (idList.length > 0) {
      try {
        setLoading(true);
        await deleteBatch({ ids: idList.join(',') }, confirm);
        await reload();
      } finally {
        setLoading(false);
      }
    }
  }

  async function onDeleteBatch() {
    try {
      //update-begin-author:taoyan date:2022-7-14 for: VUEN-1652【bug】应用状态下不允许删除
      let arr = toRaw(selectedRows.value);
      let temp = arr.filter(item=>item.useStatus=='1')
      if(temp.length>0){
        createMessage.warning('The selected template has been removed by an app ban!');
        return;
      }
      //update-end-author:taoyan date:2022-7-14 for: VUEN-1652【bug】应用状态下不允许删除
      await doDeleteDepart(selectedRowKeys);
      selectedRowKeys.value = [];
    } finally {
    }
  }

  // 发送消息测试
  function onSendTest(record) {
    testModal.openModal(true, { record });
  }

  /**
   * Action bar
   */
  function getTableAction(record): ActionItem[] {
    //update-begin---author:wangshuai ---date:20221123  for：[VUEN-2807]消息模板加一个查看功能------------
    return [{ label: 'View', onClick: handleDetail.bind(null, record)}, { label: 'Edit', onClick: onEdit.bind(null, record) }];
    //update-end---author:wangshuai ---date:20221123  for：[VUEN-2807]消息模板加一个查看功能------------
  }

  /**
   * Drop down the action bar
   */
  function getDropDownAction(record): ActionItem[] {
    return [
      { label: 'Apply', onClick: handleUse.bind(null, record) },
      { label: 'Deactivated', onClick: handleNotUse.bind(null, record) },
      { label: 'Send a test', onClick: onSendTest.bind(null, record) },
      {
        label: 'Delete',
        color: 'error',
        popConfirm: {
          title: 'Are you sure you want to delete it?？',
          confirm: onDelete.bind(null, record),
        },
      },
    ];
  }

  /**
   * APPLY
   */
  async function handleUse(record) {
    let param = { id: record.id, useStatus: '1' };
    await saveOrUpdate(param, true);
    await reload();
  }

  /**
   * DEACTIVATED
   */
  async function handleNotUse(record) {
    let param = { id: record.id, useStatus: '0' };
    await saveOrUpdate(param, true);
    await reload();
  }

  /**
   * VIEW
   * @param record
   */
  function handleDetail(record) {
    openModal(true,{
      isUpdate: true,
      showFooter: false,
      record:record
    })
  }
</script>

<style lang="less">
  @import 'index';
</style>
