<template>
  <JVxeTable
    ref="tableRef"
    toolbar
    row-number
    row-selection
    keep-source
    :height="492"
    :loading="loading"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="pagination"
    style="margin-top: 8px"
    @pageChange="handlePageChange"
  >
    <template #toolbarSuffix>
      <a-button @click="handleTableGet">获取数据</a-button>
    </template>
  </JVxeTable>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  // noinspection ES6UnusedImports
  import { Popconfirm } from 'ant-design-vue';
  import { JVxeColumn, JVxeTableInstance, JVxeTypes } from '/@/components/jeecg/JVxeTable/types';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { random } from 'lodash-es';
  import { buildUUID } from '/@/utils/uuid';
  import { uploadUrl } from '/@/api/common/api';

  const tableRef = ref<JVxeTableInstance>();
  const { createMessage } = useMessage();
  const loading = ref(false);
  const columns = ref<JVxeColumn[]>([
    {
      title: 'Drop-down box_Dictionary table search',
      key: 'select_dict_search',
      type: JVxeTypes.selectDictSearch,
      width: 200,
      async: true, // 异步搜索，默认为 true
      // 字典表配置信息：数据库表名,显示字段名,存储字段名
      dict: 'sys_user,realname,username',
      tipsContent: 'Please enter your search criteria',
    },
    {
      title: 'JPopup',
      key: 'popup',
      type: JVxeTypes.popup,
      width: 180,
      popupCode: 'demo',
      // field: 'name,sex,age',
      // orgFields: 'name,sex,age',
      // destFields: 'popup,popup_sex,popup_age',
      fieldConfig: [
        { source: 'name', target: 'popup' },
        { source: 'sex', target: 'popup_sex' },
        { source: 'age', target: 'popup_age' },
      ],
    },
    {
      title: 'JP-GENDER',
      key: 'popup_sex',
      type: JVxeTypes.select,
      dictCode: 'sex',
      disabled: true,
      width: 100,
    },
    {
      title: 'JP-AGE',
      key: 'popup_age',
      type: JVxeTypes.normal,
      width: 80,
    },
    {
      title: 'User Choice',
      key: 'userSelect',
      type: JVxeTypes.userSelect,
      width: 240,
    },
    {
      title: 'Department selection',
      key: 'departSelect',
      type: JVxeTypes.departSelect,
      width: 240,
    },
    {
      title: 'RADIO',
      key: 'radio',
      type: JVxeTypes.radio,
      width: 130,
      options: [
        { text: 'MAN', value: '1' },
        { text: 'WOMAN', value: '2' },
      ],
      // 允许清除选择（再点一次取消选择）
      allowClear: false,
    },
    {
      title: 'UPLOAD',
      key: 'upload',
      type: JVxeTypes.upload,
      width: 180,
      btnText: 'Click Upload',
      token: true,
      responseName: 'message',
      action: uploadUrl,
    },
    {
      title: 'Image upload',
      key: 'image',
      type: JVxeTypes.image,
      width: 180,
      maxCount: 6,
    },
    {
      title: 'File upload',
      key: 'file',
      type: JVxeTypes.file,
      width: 180,
      maxCount: 2,
    },
    {
      title: 'Progress bar',
      key: 'progress',
      type: JVxeTypes.progress,
      minWidth: 320,
    },
  ]);
  const dataSource = ref<any[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '100', '200'],
    total: 1000,
  });

  randomPage(pagination.current, pagination.pageSize, true);

  // 当分页参数变化时触发的事件
  function handlePageChange(event) {
    // 重新赋值
    pagination.current = event.current;
    pagination.pageSize = event.pageSize;
    // 查询数据
    randomPage(event.current, event.pageSize, true);
  }

  /** 获取值，忽略表单验证 */
  function handleTableGet() {
    const values = tableRef.value!.getTableData();
    console.log('Get the value:', { values });
    createMessage.success('The value was obtained successfully，Take a look at the console output');
  }

  /* 随机生成分页数据 */
  function randomPage(current, pageSize, $loading = false) {
    if ($loading) {
      loading.value = true;
    }
    let begin = Date.now();
    let values: any[] = [];
    for (let i = 0; i < pageSize; i++) {
      let radio = random(0, 2);
      values.push({
        id: buildUUID(),
        select_dict_search: ['admin', '', 'jeecg'][random(0, 2)],
        progress: random(0, 100),
        radio: radio ? radio.toString() : null,
      });
    }
    dataSource.value = values;
    let end = Date.now();
    let diff = end - begin;
    if ($loading && diff < pageSize) {
      setTimeout(() => (loading.value = false), pageSize - diff);
    }
  }
</script>
