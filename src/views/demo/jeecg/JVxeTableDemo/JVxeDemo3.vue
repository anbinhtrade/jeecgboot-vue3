<template>
  <div>
    <ol style="border: 1px solid #cccccc; width: 600px; padding: 8px">
      <li>1. OPEN dragSort attributes, you can drag and drop them up and down.</li>
      <li>2. USE sortKey Properties can be saved in a custom sort key, which is default orderNum。</li>
      <li>3. USE sortBegin The starting value of the property can be customized for sorting, which defaults 0。</li>
      <li>4. sortKey The fields that are defined do not need to be defined in columns can also get the value normally. can also get the value normally.</li>
      <li>5. When present fixed When a column is selected, the dragging and dropping sort will not work, and you can only sort up and down.</li>
    </ol>

    <p> In the following example, drag-and-drop sorting is enabled, and the sorting value is saved as a field sort num, the starting value of the sort is 3<br /> </p>

    <JVxeTable
      ref="tableRef1"
      toolbar
      dragSort
      sortKey="sortNum"
      :sortBegin="3"
      rowSelection
      :maxHeight="580"
      :columns="table1.columns"
      :dataSource="table1.data"
    >
      <template #toolbarSuffix>
        <a-button @click="onGetData1">Get the data</a-button>
      </template>
    </JVxeTable>

    <br />
    <p>NOT EXCEEDING fixed The table does not support drag-and-drop sorting, only click-up and down-sorting</p>

    <JVxeTable ref="tableRef2" toolbar dragSort rowSelection :maxHeight="580" :columns="table2.columns" :dataSource="table2.data">
      <template #toolbarSuffix>
        <a-button @click="onGetData2">Get the data</a-button>
      </template>
    </JVxeTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { JVxeTypes, JVxeColumn, JVxeTableInstance } from '/@/components/jeecg/JVxeTable/types';
  import { useMessage } from '/@/hooks/web/useMessage';

  const tableRef1 = ref<JVxeTableInstance>();
  const tableRef2 = ref<JVxeTableInstance>();
  const table1 = reactive({
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 120,
        type: JVxeTypes.normal,
      },
      {
        title: 'Name',
        key: 'name',
        width: 240,
        type: JVxeTypes.input,
        defaultValue: 'new name',
      },
      {
        title: 'The length of the field',
        key: 'dbLength',
        width: 240,
        type: JVxeTypes.inputNumber,
        defaultValue: 32,
      },
      {
        title: 'sortNum',
        key: 'sortNum',
        width: 120,
        type: JVxeTypes.normal,
      },
    ] as JVxeColumn[],
    data: [
      { id: 'uuid-0001', name: 'TOM', dbLength: 123 },
      { id: 'uuid-0002', name: 'John doe', dbLength: 777 },
      { id: 'uuid-0003', name: 'HARRY', dbLength: 666 },
      { id: 'uuid-0004', name: 'Zhao Liu', dbLength: 233 },
    ],
  });

  const table2 = reactive({
    columns: [
      {
        title: 'ID',
        key: 'id',
        width: 320,
        fixed: 'left',
        type: JVxeTypes.normal,
      },
      {
        title: '姓名',
        key: 'name',
        width: 720,
        type: JVxeTypes.input,
        defaultValue: 'new name',
      },
      {
        title: 'The length of the field',
        key: 'dbLength',
        width: 720,
        type: JVxeTypes.inputNumber,
        defaultValue: 32,
      },
    ] as JVxeColumn[],
    data: [
      { id: 'uuid-0001', name: 'TOM', dbLength: 123 },
      { id: 'uuid-0002', name: 'John doe', dbLength: 777 },
      { id: 'uuid-0003', name: 'HARRY', dbLength: 666 },
      { id: 'uuid-0004', name: 'Zhao Liu', dbLength: 233 },
    ],
  });

  const { createMessage } = useMessage();

  function onGetData1() {
    createMessage.info('Take a look at the console');
    console.log(tableRef1.value!.getTableData());
  }

  function onGetData2() {
    createMessage.info('Take a look at the console');
    console.log(tableRef2.value!.getTableData());
  }
</script>
