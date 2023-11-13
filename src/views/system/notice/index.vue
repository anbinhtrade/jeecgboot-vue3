<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd">NEW</a-button>
<!--        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> Export</a-button>-->
<!--        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="on Import Xls">导入</j-upload-button>-->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                DELETE
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >Bulk operations
            <Icon style="fontsize: 12px" icon="ant-design:down-outlined"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
    <NoticeModal @register="registerModal" @success="reload" />
    <DetailModal @register="register" :frameSrc="iframeUrl" />
  </div>
</template>
<script lang="ts" name="system-notice" setup>
  import { ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import NoticeModal from './NoticeModal.vue';
  import DetailModal from './DetailModal.vue';
  import { useMethods } from '/@/hooks/system/useMethods';
  import { useGlobSetting } from '/@/hooks/setting';
  import { getToken } from '/@/utils/auth';
  import { columns, searchFormSchema } from './notice.data';
  import { getList, deleteNotice, batchDeleteNotice, getExportUrl, getImportUrl, doReleaseData, doReovkeData } from './notice.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  const glob = useGlobSetting();
  const [registerModal, { openModal }] = useModal();
  const [register, { openModal: openDetail }] = useModal();
  const iframeUrl = ref('');

  // 列表页面公共参数、方法
  const { prefixCls, onExportXls, onImportXls, tableContext, doRequest } = useListPage({
    designScope: 'notice-template',
    tableProps: {
      title: 'Message notifications',
      api: getList,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
    },
    exportConfig: {
      name: 'A list of message notifications',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

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
  async function handleDelete(record) {
    await deleteNotice({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    doRequest(() => batchDeleteNotice({ ids: selectedRowKeys.value }));
  }
  /**
   * 发布
   */
  async function handleRelease(id) {
    await doReleaseData({ id });
    reload();
  }
  /**
   * 撤销
   */
  async function handleReovke(id) {
    await doReovkeData({ id });
    reload();
  }
  /**
   * 查看
   */
  function handleDetail(record) {
    iframeUrl.value = `${glob.uploadUrl}/sys/annountCement/show/${record.id}?token=${getToken()}`;
    openDetail(true);
  }
  /**
   * 操作列定义
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: 'EDIT',
        onClick: handleEdit.bind(null, record),
        ifShow: record.sendStatus == 0,
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: 'DELETE',
        ifShow: record.sendStatus != 1,
        popConfirm: {
          title: 'Whether to confirm the deletion',
          confirm: handleDelete.bind(null, record),
        },
      },
      {
        label: 'PUBLISH',
        ifShow: record.sendStatus == 0,
        onClick: handleRelease.bind(null, record.id),
      },
      {
        label: 'QUASH',
        ifShow: record.sendStatus == 1,
        popConfirm: {
          title: 'Are you sure you want to revoke?',
          confirm: handleReovke.bind(null, record.id),
        },
      },
      {
        label: 'VIEW',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }
</script>
