<template>
  <a-space>
    <a-button @click="onToggleLoading">切换加载</a-button>
    <a-button @click="onToggleDisabled">切换禁用</a-button>
  </a-space>
  <!--这种使用场景得用height，用maxHeight底层有问题-->
  <JVxeTable
    ref="tableRef"
    stripe
    toolbar
    rowNumber
    rowSelection
    rowExpand
    resizable
    asyncRemove
    clickSelectRow
    :height="480"
    :checkboxConfig="{ range: true }"
    :disabledRows="{ input: ['text--16', 'text--18'] }"
    :loading="loading"
    :disabled="disabled"
    :columns="columns"
    :dataSource="dataSource"
    @removed="onJVxeRemove"
    @valueChange="handleValueChange"
    @blur="handleBlur"
  >
    <template #toolbarSuffix>
      <a-button @click="handleTableCheck">表单验证</a-button>
      <a-tooltip placement="top" title="获取值，忽略表单验证" :autoAdjustOverflow="true">
        <a-button @click="onGetData">获取数据</a-button>
      </a-tooltip>
      <a-tooltip placement="top" title="模拟加载1000条数据" :autoAdjustOverflow="true">
        <a-button @click="handleTableSet">设置值</a-button>
      </a-tooltip>
      <a-button @click="onGetSelData">获取选中数据</a-button>
      <a-button @click="onClearSel">清空选中</a-button>
      <a-button @click="onDelFirst">删除第一行数据</a-button>
      <a-button @click="onDelSel">删除选中数据</a-button>
    </template>

    <template #expandContent="props">
      <div style="padding: 20px">
        <span>Hello! My name is: {{ props.row.input }}!</span>
      </div>
    </template>

    <template #myAction="props">
      <a @click="onLookRow(props)">查看</a>
      <a-divider type="vertical" />
      <Popconfirm title="确定删除吗？" @confirm="onDeleteRow(props)">
        <a>删除</a>
      </Popconfirm>
    </template>
  </JVxeTable>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // noinspection ES6UnusedImports
  import { Popconfirm } from 'ant-design-vue';
  import { JVxeTypes, JVxeColumn, JVxeTableInstance } from '/@/components/jeecg/JVxeTable/types';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { random } from 'lodash-es';
  import { buildUUID } from '/@/utils/uuid';
  import dayjs from 'dayjs';
  import { pushIfNotExist } from '/@/utils/common/compUtils';

  const { createMessage } = useMessage();
  const tableRef = ref<JVxeTableInstance>();
  const loading = ref(false);
  const disabled = ref(false);
  const columns = ref<JVxeColumn[]>([
    {
      title: 'ID',
      key: 'id',
      type: JVxeTypes.hidden,
    },
    {
      title: '不可编辑',
      key: 'noEdit',
      type: JVxeTypes.normal,
      width: 180,
      defaultValue: 'noEdit-new',
    },
    {
      title: '单行文本',
      key: 'input',
      type: JVxeTypes.input,
      width: 180,
      defaultValue: '',
      placeholder: '请输入${title}',
      validateRules: [
        {
          required: true, // 必填
          message: '请输入${title}', // 显示的文本
        },
        {
          pattern: /^[a-z|A-Z][a-z|A-Z\d_-]*$/, // 正则
          message: '必须以字母开头，可包含数字、下划线、横杠',
        },
        {
          unique: true,
          message: '${title}不能重复',
        },
        {
          handler({ cellValue, row, column }, callback, target) {
            // cellValue 当前校验的值
            // callback(flag, message) 方法必须执行且只能执行一次
            //          flag = 是否通过了校验，不填写或者填写 null 代表不进行任何操作
            //          message = 提示的类型，默认使用配置的 message
            // target 行编辑的实例对象
            if (cellValue === 'abc') {
              callback(false, '${title}不能是abc'); // false = 未通过校验
            } else {
              callback(true); // true = 通过验证
            }
          },
          message: '${title}默认提示',
        },
      ],
    },
    {
      title: '多行文本',
      key: 'textarea',
      type: JVxeTypes.textarea,
      width: 200,
    },
    {
      title: '数字',
      key: 'number',
      type: JVxeTypes.inputNumber,
      width: 80,
      defaultValue: 32,
      // 【统计列】sum = 求和、average = 平均值
      statistics: ['sum', 'average'],
    },
    {
      title: '下拉框',
      key: 'select',
      type: JVxeTypes.select,
      width: 180,
      // 下拉选项
      options: [
        { title: 'String', value: 'string' },
        { title: 'Integer', value: 'int' },
        { title: 'Double', value: 'double' },
        { title: 'Boolean', value: 'boolean' },
      ],
      // allowInput: true,
      allowSearch: true,
      placeholder: '请选择',
    },
    {
      title: '下拉框_字典',
      key: 'select_dict',
      type: JVxeTypes.select,
      width: 180,
      options: [],
      dictCode: 'sex',
      placeholder: '请选择',
    },
    {
      title: '下拉框_多选',
      key: 'select_multiple',
      type: JVxeTypes.selectMultiple,
      width: 205,
      options: [
        { title: 'String', value: 'string' },
        { title: 'Integer', value: 'int' },
        { title: 'Double', value: 'double' },
        { title: 'Boolean', value: 'boolean' },
      ],
      defaultValue: ['int', 'boolean'], // 多个默认项
      // defaultValue: 'string,double,int', // 也可使用这种方式
      placeholder: '多选',
    },
    {
      title: '下拉框_搜索',
      key: 'select_search',
      type: JVxeTypes.selectSearch,
      width: 180,
      options: [
        { title: 'String', value: 'string' },
        { title: 'Integer', value: 'int' },
        { title: 'Double', value: 'double' },
        { title: 'Boolean', value: 'boolean' },
      ],
    },
    {
      title: '日期时间',
      key: 'datetime',
      type: JVxeTypes.datetime,
      width: 200,
      defaultValue: '2019-04-30 14:52:22',
      placeholder: 'Please select',
    },
    {
      title: 'TIME',
      key: 'time',
      type: JVxeTypes.time,
      width: 200,
      defaultValue: '14:52:22',
      placeholder: 'Please select',
    },
    {
      title: 'CHECKBOX',
      key: 'checkbox',
      type: JVxeTypes.checkbox,
      width: 100,
      customValue: ['Y', 'N'], // true ,false
      defaultChecked: false,
    },
    {
      title: 'OPERATION',
      key: 'action',
      type: JVxeTypes.slot,
      fixed: 'right',
      minWidth: 100,
      align: 'center',
      slotName: 'myAction',
    },
  ]);
  const dataSource = ref<any[]>([]);

  /* 随机生成数据 */
  function randomPage(current, pageSize, isLoading = false) {
    if (isLoading) {
      loading.value = true;
    }

    let randomDatetime = () => {
      let time = random(1000, 9999999999999);
      return dayjs(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    };

    let limit = (current - 1) * pageSize;

    let options = ['string', 'int', 'double', 'boolean'];

    let begin = Date.now();
    let values: any[] = [];
    for (let i = 0; i < pageSize; i++) {
      values.push({
        id: buildUUID(),
        noEdit: `noEdit-${limit + i + 1}`,
        input: `text-${limit + i + 1}`,
        textarea: `textarea-${limit + i + 1}`,
        number: random(0, 233),
        select: options[random(0, 3)],
        select_dict: random(1, 2).toString(),
        select_multiple: (() => {
          let length = random(1, 4);
          let arr = [];
          for (let j = 0; j < length; j++) {
            pushIfNotExist(arr, options[random(0, 3)]);
          }
          return arr.join(',');
        })(),
        select_search: options[random(0, 3)],
        datetime: randomDatetime(),
        checkbox: ['Y', 'N'][random(0, 1)],
      });
    }

    dataSource.value = values;
    let end = Date.now();
    let diff = end - begin;

    if (isLoading && diff < pageSize) {
      setTimeout(() => (loading.value = false), pageSize - diff);
    }
  }

  randomPage(0, 20, true);

  function onLookRow(props) {
    createMessage.success('Please view the output in the console');
    // Parameters are introduced：
    // props.value          The value of the current cell
    // props.row            The current row of data
    // props.rowId          Current row ID
    // props.rowIndex       Subscript for the current line
    // props.column         The configuration of the current column
    // props.columnIndex    Subscript for the current column
    // props.$table         For a vxe instance, you can call the built-in methods of vxe
    // props.target         JVXE instance, you can call JVXE built-in methods
    // props.caseId         The unique ID of the JVXE instance
    // props.scrolling      Whether or not it is scrolling
    // props.triggerChange  The change event is triggered to change the value of the slot
    console.log('View: ', { props });
  }

  async function onDeleteRow(props) {
    // 调用删除方法
    const res = await tableRef.value?.removeRows(props.row);
    if (res && res.rows.length > 0) {
      createMessage.success('The deletion is successful');
    }
  }

  function handleValueChange(event) {
    console.log('handleValueChange.event: ', event);
  }

  // update-begin--author:liaozhiyang---date:20230817---for：【issues/636】JVxeTable加上blur事件
  function handleBlur(event){
    console.log("blur",event);
  }
  // update-end--author:liaozhiyang---date:20230817---for：【issues/636】JVxeTable加上blur事件
  /** 表单验证 */
  function handleTableCheck() {
    tableRef.value!.validateTable().then((errMap) => {
      if (errMap) {
        console.log('The form validation failed：', { errMap });
        createMessage.error('The verification failed, check the details in the console');
      } else {
        createMessage.success('Verified passed');
      }
    });
  }

  /** Get the value, ignore the form validation */
  function onGetData() {
    const values = tableRef.value!.getTableData();
    console.log('Get the value:', { values });
    createMessage.success('The value is successful, please see the console output');
  }

  /** 模拟加载1000条数据 */
  function handleTableSet() {
    randomPage(1, 1000, true);
  }

  function onDelFirst() {
    const xTable = tableRef.value!.getXTable();
    const record = xTable.getTableData().fullData[0];
    tableRef.value!.removeRows(record);
  }

  function onDelSel() {
    const xTable = tableRef.value!.getXTable();
    xTable.removeCheckboxRow();
  }

  function onGetSelData() {
    createMessage.info('Take a look at the console');
    console.log(tableRef.value!.getSelectionData());
  }

  function onClearSel() {
    tableRef.value!.clearSelection();
  }

  function onToggleLoading() {
    loading.value = !loading.value;
  }

  function onToggleDisabled() {
    disabled.value = !disabled.value;
  }

  function doDelete(deleteRows) {
    return new Promise((resolve) => {
      let rowId = deleteRows.filter((row) => row.id);
      console.log('Delete rowId.': ', rowId);
      setTimeout(() => resolve(true), 1500);
    });
  }

  /** Example of asynchronous deletion */
  async function onJVxeRemove(event) {
    const hideLoading = createMessage.loading('Deleting...', 0);
    try {
      // 1. 向后台传递 event.deleteRows 以删除
      let flag = await doDelete(event.deleteRows);
      if (flag) {
        // Note: If the loading state of the table is enabled, you must stop and then delete it, otherwise you will not be able to delete the data from the table
        // 2. Call the event.confirmRemove method to confirm that the deletion is successful
        // await tableRef.value!.removeSelection();
        await event.confirmRemove()
        createMessage.success('Deleted successfully!');
      } else {
        // 3. 若删除失败，不调用 event.confirmRemove() 方法就不会删除数据
        createMessage.warn('Delete failed!');
      }
    } finally {
      hideLoading();
    }
  }
</script>
