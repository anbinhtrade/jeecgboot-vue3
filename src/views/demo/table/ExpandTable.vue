<template>
  <PageWrapper
    title="EXPANDABLE TABLE"
    content="Cannot be used in conjunction with scrolls。The Table Action component can be configured with stop button propagation to prevent the click event of the action button from bubbling up, so as to cooperate with the expand Row By Click of the Table component"
  >
    <BasicTable @register="registerTable">
      <template #expandedRowRender="{ record }">
        <span>No: {{ record.no }} </span>
      </template>
      <template #action="{ record }">
        <TableAction
          stopButtonPropagation
          :actions="[
            {
              label: 'DELETE',
              icon: 'ic:outline-delete-outline',
              onClick: handleDelete.bind(null, record),
            },
          ]"
          :dropDownActions="[
            {
              label: 'ENABLE',
              popConfirm: {
                title: 'Whether it is enabled？',
                confirm: handleOpen.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { getBasicColumns } from './tableData';

  import { demoListApi } from '/@/api/demo/table';

  export default defineComponent({
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const [registerTable] = useTable({
        api: demoListApi,
        title: 'TO EXPAND THE TABLE PRESENTATION',
        titleHelpMessage: ['ENABLEDexpandRowByClick', 'ENABLEDstopButtonPropagation'],
        columns: getBasicColumns(),
        rowKey: 'id',
        canResize: false,
        expandRowByClick: true,
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      function handleDelete(record: Recordable) {
        console.log('Clicked Delete', record);
      }
      function handleOpen(record: Recordable) {
        console.log('Click Enable', record);
      }

      return {
        registerTable,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
