<template>
  <div :class="prefixCls">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--slot: table title-->
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd">NEW</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> EXPORT</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">IMPORT</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                <span>DELETE</span>
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
    <FillRuleModal @register="registerModal" @success="reload" />
  </div>
</template>

<script name="system-fillrule" lang="ts" setup>
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { getFillRuleList, exportUrl, importUrl, deleteFillRule, batchDeleteFillRule, handleTest } from '/@/views/system/fillRule/fill.rule.api';
  import { columns, searchFormSchema } from '/@/views/system/fillRule/fill.rule.data';
  import { useModal } from '/@/components/Modal';
  import { ActionItem } from '/@/components/Table';
  const [registerModal, { openModal }] = useModal();
  import FillRuleModal from '/@/views/system/fillRule/FillRuleModal.vue';

  // Common parameters and methods on the list page
  const { prefixCls, tableContext, createMessage, createSuccessModal, onExportXls, onImportXls } = useListPage({
    designScope: 'fill-rule',
    tableProps: {
      title: 'The page of filling rules is managed',
      api: getFillRuleList,
      columns: columns,
      showIndexColumn: true,
      formConfig: {
        schemas: searchFormSchema,
      },
    },
    exportConfig: {
      url: exportUrl,
      name: 'A list of filling rules',
    },
    importConfig: {
      url: importUrl,
      success: () => reload(),
    },
  });
  // 注册 ListTable
  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * New events
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * Edit the event
   */
  function handleEdit(record) {
    console.log('record....', record);
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * Delete the event
   */
  async function handleDelete(record) {
    console.log(12345, record);
    await deleteFillRule({ id: record.id }, reload);
  }

  /**
   * Delete events in bulk
   */
  async function batchHandleDelete() {
    await batchDeleteFillRule({ ids: selectedRowKeys.value }, () => {
      selectedRowKeys.value = [];
      reload();
    });
  }

  /**
   * Functional testing
   */
  function testRule(record) {
    let params = { ruleCode: record.ruleCode };
    handleTest(params).then((res) => {
      if (res.success) {
        createSuccessModal({
          title: 'Functional test of the value filling rule',
          content: 'Generate results：' + res.result,
        });
      } else {
        createMessage.warn(res.message);
      }
    });
  }

  /**
   * EDIT
   */
  function getTableAction(record): ActionItem[] {
    return [{ label: 'EDIT', onClick: handleEdit.bind(null, record) }];
  }

  /**
   * Drop down the action bar
   */
  function getDropDownAction(record): ActionItem[] {
    return [
      { label: 'Functional testing', onClick: testRule.bind(null, record) },
      {
        label: 'DELETE',
        color: 'error',
        popConfirm: {
          title: 'Are you sure you want to delete it?？',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
