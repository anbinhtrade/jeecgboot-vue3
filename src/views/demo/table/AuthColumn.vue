<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: 'EDIT',
              onClick: handleEdit.bind(null, record),
              auth: 'other', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: 'DELETE',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
              auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
          :dropDownActions="[
            {
              label: 'ENABLE',
              popConfirm: {
                title: 'Is it enabled?',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: (_action) => {
                return record.status !== 'enable'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
            },
            {
              label: 'DISABLE',
              popConfirm: {
                title: 'Is it disabled?',
                confirm: handleOpen.bind(null, record),
              },
              ifShow: () => {
                return record.status === 'enable'; // 根据业务控制是否显示: enable状态的显示禁用按钮
              },
            },
            {
              label: 'Control at the same time',
              popConfirm: {
                title: 'Whether it is displayed dynamically？',
                confirm: handleOpen.bind(null, record),
              },
              auth: 'super', // 同时根据权限和业务控制是否显示
              ifShow: () => {
                return true;
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';

  import { demoListApi } from '/@/api/demo/table';
  const columns: BasicColumn[] = [
    {
      title: 'NUMBERING',
      dataIndex: 'no',
      width: 100,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      auth: 'test', // 根据权限控制是否显示: 无权限，不显示
    },
    {
      title: 'STATE',
      dataIndex: 'status',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      auth: 'super', // 同时根据权限和业务控制是否显示
      ifShow: (_column) => {
        return true;
      },
    },
    {
      title: 'Start time',
      dataIndex: 'beginTime',
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      width: 200,
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable] = useTable({
        title: 'Examples of Table Action components and fixed columns',
        api: demoListApi,
        columns: columns,
        bordered: true,
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      function handleEdit(record: Recordable) {
        console.log('Clicked Edit', record);
      }
      function handleDelete(record: Recordable) {
        console.log('Clicked Delete', record);
      }
      function handleOpen(record: Recordable) {
        console.log('Click Enable', record);
      }
      return {
        registerTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
