<template>
  <BasicDrawer @register="registerBaseDrawer" title="ROLE USER" width="800" destroyOnClose>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate" v-if="!disableUserEdit"> New users</a-button>
        <a-button type="primary" @click="handleSelect"> Already have users</a-button>

        <a-dropdown v-if="checkedKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="bx:bx-unlink"></Icon>
                DISASSOCIATE
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >Batch operations
            <Icon icon="ant-design:down-outlined"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!--User action drawer-->
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
    <!--User selection popup-->
    <UseSelectModal @register="registerModal" @select="selectOk" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, watch, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { BasicDrawer, useDrawer, useDrawerInner } from '/src/components/Drawer';
  import { useModal } from '/src/components/Modal';
  import UserDrawer from '../../user/UserDrawer.vue';
  import UseSelectModal from './UseSelectModal.vue';
  import { userList, deleteUserRole, batchDeleteUserRole, addUserRole } from '../role.api';
  import { userColumns, searchUserFormSchema } from '../role.data';
  import { getUserRoles } from '../../user/user.api';

  const emit = defineEmits(['register', 'hideUserList']);
  const props = defineProps({
    disableUserEdit: {type:Boolean,default:false}
  })
  
  const checkedKeys = ref<Array<string | number>>([]);
  const roleId = ref('');
  const [registerBaseDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    roleId.value = data.id;
    setProps({ searchInfo: { roleId: data.id } });
    reload();
  });
  //Register drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //Register drawer
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, updateTableDataRecord, setProps }] = useTable({
    title: 'USER LIST',
    api: userList,
    columns: userColumns,
    formConfig: {
      //update-begin---author:wangshuai ---date:20230703  for：【QQYUN-5685】3、租户角色下,查询居左显示
      labelWidth: 60,
      //update-end---author:wangshuai ---date:20230703  for：【QQYUN-5685】3、租户角色下,查询居左显示
      schemas: searchUserFormSchema,
      autoSubmitOnEnter: true,
    },
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    tableSetting: { fullScreen: true },
    canResize: false,
    rowKey: 'id',
    actionColumn: {
      width: 180,
      title: 'MANIPULATE',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * Select column configuration
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 50,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };

  /**
   * Select event
   */
  function onSelectChange(selectedRowKeys: (string | number)[], selectionRows) {
    checkedKeys.value = selectedRowKeys;
  }

  /**
   * NEW
   */
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
      selectedroles: [roleId.value],
      isRole: true,
    });
  }
  /**
   * COMPILER
   */
  async function handleEdit(record: Recordable) {
    try {
      const userRoles = await getUserRoles({ userid: record.id });
      if (userRoles && userRoles.length > 0) {
        record.selectedroles = userRoles;
      }
    } catch (e) {
      console.log(e);
    }
    openDrawer(true, {
      record,
      isUpdate: true,
      isRole: true,
    });
  }

  /**
   * DELETE EVENT
   */
  async function handleDelete(record) {
    await deleteUserRole({ userId: record.id, roleId: roleId.value }, reload);
  }

  /**
   * Delete events in batches
   */
  async function batchHandleDelete() {
    await batchDeleteUserRole({ userIds: checkedKeys.value.join(','), roleId: roleId.value }, reload);
  }

  /**
   * SUCCESSFUL CALLBACK
   */
  function handleSuccess({ isUpdate, values }) {
    isUpdate ? updateTableDataRecord(values.id, values) : reload();
  }
  /**
   * Select an existing user
   */
  function handleSelect() {
    openModal(true);
  }
  /**
   * Add existing user
   */
  async function selectOk(val) {
    await addUserRole({ roleId: roleId.value, userIdList: val }, reload);
  }
  /**
   * Action bar
   */
  function getTableAction(record) {
    return [
      {
        label: 'COMPILER',
        onClick: handleEdit.bind(null, record),
        ifShow: () => !props.disableUserEdit,
      },
      {
        label: 'DISASSOCIATE',
        popConfirm: {
          title: 'Confirm to cancel the association?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>

<style scoped>
  /*update-begin---author:wangshuai ---date:20230703  for：【QQYUN-5685】3、租户角色下,查询居左显示*/
  :deep(.ant-form-item-control-input-content){
    text-align: left;
  }
  /*update-end---author:wangshuai ---date:20230703  for：【QQYUN-5685】3、租户角色下,查询居左显示*/
</style>
