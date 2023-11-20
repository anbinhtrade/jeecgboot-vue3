<template>
  <BasicModal @register="registerModal" destroyOnClose :title="title" :width="1000" :footer="null">
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <template #departNames="{ text, record }">
        <template v-if="text && text.length > 0">
          {{ getName(text) }}
        </template>
      </template>
      <template #positionNames="{ text, record }">
        <template v-if="text && text.length > 0">
          {{ getName(text) }}
        </template>
      </template>
      <template #tableTitle>
        <a-button preIcon="ant-design:usergroup-add-outlined" type="primary" @click="addUser">Invite members</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <tenant-user-select-modal :multi="true" @register="registerUserModal" @on-select="onSelected" :tenantId="getTenantId"></tenant-user-select-modal>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref } from 'vue';
  import { BasicModal, useModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { tenantPackUserColumns } from '../tenant.data';
  import { queryTenantPackUserList, deleteTenantPackUser, addTenantPackUser } from '../tenant.api';
  import TenantUserSelectModal from '../components/TenantUserSelectModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'TenantPackUserModal',
    components: { BasicModal, BasicTable, TableAction, TenantUserSelectModal },
    setup() {
      //获取租户id
      const getTenantId = computed(()=>{
        return tenantPackData.tenantId;
      })
      
      //产品包信息
      const tenantPackData = reactive<any>({});
      //表单赋值
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: false });
        Object.assign(tenantPackData, data.record);
        await reload();
      });
      const { createMessage } = useMessage();
      //设置标题
      const title = ref<string>('User');
      //注册table数据
      const { tableContext } = useListPage({
        tableProps: {
          api: queryTenantPackUserList,
          immediate: false,
          columns: tenantPackUserColumns,
          canResize: false,
          useSearchForm: false,
          beforeFetch: (params) => {
            params.tenantId = tenantPackData.tenantId;
            params.packId = tenantPackData.id;
            params.status = 1;
            return params;
          },
          actionColumn: {
            width: 120,
            fixed: 'right',
          },
        },
      });
      const [registerUserModal, { openModal: openUserModal, closeModal: closeUserModal }] = useModal();
      const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

      /**
       * Get the department/job title
       * @param value
       */
      function getName(value) {
        return value.join(',');
      }

      /**
       * Table action columns
       * @param record
       */
      function getTableAction(record) {
        return [
          {
            label: 'REMOVE',
            popConfirm: {
              title: 'Whether or not to confirm the removal',
              confirm: handleDelete.bind(null, record),
            }
          },
        ];
      }

      /**
       * Delete
       */
      async function handleDelete(record) {
        let params = {
          packId: record.packId,
          packName: record.packName,
          tenantId: tenantPackData.tenantId,
          userId: record.id,
          realname: record.realname,
        };
        await deleteTenantPackUser(params);
        await reload();
      }

      /**
       * Add User pop-up window
       */
      function addUser() {
        openUserModal(true, {
          list: [],
        });
      }

      /**
       * The inviter callback event
       * @param arr
       */
      async function onSelected(arr) {
        if (arr && arr.length > 0) {
          let names: any[] = [];
          let ids: any[] = [];
          for (let u of arr) {
            names.push(u.realname);
            ids.push(u.id);
          }
          console.log(tenantPackData);
          let params = {
            packId: tenantPackData.id,
            packName: tenantPackData.packName,
            tenantId: tenantPackData.tenantId,
            userId: ids.join(','),
            realname: names.join(','),
          };
          await addTenantPackUser(params);
          await reload();
        }
        closeUserModal();
      }

      return {
        title,
        registerModal,
        registerTable,
        rowSelection,
        getName,
        getTableAction,
        registerUserModal,
        addUser,
        onSelected,
        getTenantId,
      };
    },
  });
</script>

<style lang="less" scoped></style>
