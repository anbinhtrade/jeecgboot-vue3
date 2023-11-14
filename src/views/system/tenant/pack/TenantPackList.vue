<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="800px" :showCancelBtn="false" :showOkBtn="false">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="handleAdd" style="margin-right: 5px" v-if="showPackAddAndEdit">NEW </a-button>
        <a-button
          v-if="selectedRowKeys.length > 0"
          preIcon="ant-design:delete-outlined"
          type="primary"
          @click="handlePackBatch"
          style="margin-right: 5px"
          >Delete in bulk
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>
  </BasicModal>
  <TenantPackMenuModal @register="registerPackMenu" @success="success" />
  <TenantPackUserModal @register="registerPackUser" @success="success" />
</template>
<script lang="ts" setup name="tenant-pack-modal">
  import { reactive, ref, unref } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { packColumns, userColumns, packFormSchema } from '../tenant.data';
  import { getTenantUserList, leaveTenant, packList, deletePackPermissions } from '../tenant.api';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { BasicTable, TableAction } from '/@/components/Table';
  import TenantPackMenuModal from './TenantPackMenuModal.vue';
  import {Modal} from "ant-design-vue";
  import TenantPackUserModal from './TenantPackUserModal.vue';
  import {useMessage} from "/@/hooks/web/useMessage";

  const [registerPackMenu, { openModal }] = useModal();
  const [registerPackUser, { openModal: packUserOpenModal }] = useModal();
  const tenantId = ref<number>(0);
  // 列表页面公共参数、方法
  const { prefixCls, tableContext } = useListPage({
    designScope: 'tenant-template',
    tableProps: {
      api: packList,
      columns: packColumns,
      immediate: false,
      formConfig: {
        schemas: packFormSchema,
        labelCol: {
          xxl: 8,
        },
        actionColOptions: {
          xs: 24,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 8,
          xxl: 8,
        },
      },
      beforeFetch: (params) => {
        return Object.assign(params, { tenantId: unref(tenantId), packType:'custom' });
      },
    },
  });
  const [registerTable, { reload }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext;
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  //是否显示新增和编辑产品包
  const showPackAddAndEdit = ref<boolean>(false);
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    tenantId.value = data.tenantId;
    showPackAddAndEdit.value = data.showPackAddAndEdit;
    success();
  });
  //设置标题
  const title = 'A list of tenant packages';

  //表单提交事件
  async function handleSubmit(v) {
    closeModal();
  }

  function getActions(record) {
    return [
      {
        label: 'USER',
        onClick: seeTenantPackUser.bind(null, record),
      },
      {
        label: 'EDIT',
        onClick: handleEdit.bind(null, record),
        ifShow: ()=>{ return showPackAddAndEdit.value }
      },
    ];
  }

  /**
   * 成功
   */
  function success() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * EDIT
   * @param record
   */
  async function handleEdit(record) {
    openModal(true, {
      isUpdate: true,
      record: record,
      tenantId: unref(tenantId),
      packType:'custom',
      showFooter: true
    });
  }

  //The default system package cannot be deleted, including super administrators, organization account administrators, and organization application administrators)
  const packCode = reactive<any>(['superAdmin','accountAdmin','appAdmin']);
  const { createMessage } = useMessage();
  
  /**
   * Delete the package the package
   * @param DELETE
   */
  async function handleDelete(record) {
    //update-begin---author:wangshuai ---date:20230222  for: The default package cannot be deleted------------
    if(packCode.indexOf(record.packCode) != -1){
        createMessage.warning("The default system package cannot be deleted");
       return;
    }
    //update-end---author:wangshuai ---date:20230222  for: The default package cannot be deleted------------
    await deletePackPermissions({ ids: record.id }, success);
  }

  /**
   * Delete packages in bulk
   */
  async function handlePackBatch() {
    let value = selectedRows.value;
    if(value && value.length>0){
      for (let i = 0; i < value.length; i++) {
        if(packCode.indexOf(value[i].packCode) != -1){
          createMessage.warning("The default system package cannot be deleted");
          return;
        }
      }
    }
    Modal.confirm({
      title: 'Delete the tenant package',
      content: 'Whether to delete the tenant package',
      okText: 'CONFIRM',
      cancelText: 'CANCEL',
      onOk: async () => {
        await deletePackPermissions({ ids: selectedRowKeys.value.join(',')}, success);
      }
    })
  }

  /**
   *
   * Add a new form
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      tenantId: unref(tenantId),
      packType:'custom',
      showFooter: true
    });
  }

  /**
   * Users below the package
   * @param record
   */
  function seeTenantPackUser(record) {
    packUserOpenModal(true,{
      record:record
    })
  }

  /**
   * MORE
   * @param record
   */
  function getDropDownAction(record) {
    return [
      {
        label: 'DETAIL',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: 'DELETE',
        popConfirm: {
          title: 'Whether to confirm the deletion of the tenant package',
          confirm: handleDelete.bind(null, record),
        },
      },
    ]
  }

  /**
   * DETAIL
   * @param record
   */
  function handleDetail(record) {
    openModal(true, {
      isUpdate: true,
      record: record,
      tenantId: unref(tenantId),
      packType:'custom',
      showFooter: false
    });
  }
</script>
