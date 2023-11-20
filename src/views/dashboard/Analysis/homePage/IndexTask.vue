<template>
  <div class="index-container-ty">
    <a-row type="flex" justify="start" :gutter="3">
      <a-col :sm="24" :lg="12">
        <a-card>
          <template #title>
            <div class="index-md-title">
              <img src="../../../../assets/images/daiban.png" />
              My to-do [{{ dataSource1.length }}】
            </div>
          </template>

          <template v-if="dataSource1 && dataSource1.length > 0" #extra>
            <a @click="goPage">More
              <Icon icon="ant-design:double-right-outlined" />
            </a>
          </template>

          <a-table
            :class="'my-index-table tytable1'"
            ref="table1"
            size="small"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource1"
            :pagination="false"
          >
            <template #ellipsisText="{ text }">
              <JEllipsis :value="text" :length="textMaxLength"></JEllipsis>
            </template>

            <template #dayWarnning="{ text, record }">
              <BellTwoTone style="font-size: 22px" :twoToneColor="getTipColor(record)" />
            </template>

            <template #action="{ text, record }">
              <a @click="handleData">TRANSACT</a>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <a-col :sm="24" :lg="12">
        <a-card>
          <template #title>
            <div class="index-md-title">
              <img src="../../../../assets/images/zaiban.png" />
              Mine is in the works【{{ dataSource2.length }}】
            </div>
          </template>

          <template v-if="dataSource2 && dataSource2.length > 0" #extra>
            <a @click="goPage">More
              <Icon icon="ant-design:double-right-outlined" />
            </a>
          </template>

          <a-table
            :class="'my-index-table tytable2'"
            ref="table1"
            size="small"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource2"
            :pagination="false"
          >
            <template #ellipsisText="{ text }">
              <JEllipsis :value="text" :length="textMaxLength"></JEllipsis>
            </template>

            <template #dayWarnning="{ text, record }">
              <BellTwoTone style="font-size: 22px" :twoToneColor="getTipColor(record)" />
            </template>

            <template #action="{ text, record }">
              <a @click="handleData">TRANSACT</a>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <a-col :span="24">
        <div style="height: 5px"></div>
      </a-col>

      <a-col :sm="24" :lg="12">
        <a-card>
          <template #title>
            <div class="index-md-title">
              <img src="../../../../assets/images/guaz.png" />
              My account【{{ dataSource4.length }}】
            </div>
          </template>

          <a-table
            :class="'my-index-table tytable4'"
            ref="table1"
            size="small"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource4"
            :pagination="false"
          >
            <template #ellipsisText="{ text }">
              <JEllipsis :value="text" :length="textMaxLength"></JEllipsis>
            </template>

            <template #dayWarnning="{ text, record }">
              <BellTwoTone style="font-size: 22px" :twoToneColor="getTipColor(record)" />
            </template>

            <template #action="{ text, record }">
              <a @click="handleData">TRANSACT</a>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <a-col :sm="24" :lg="12">
        <a-card>
          <template #title>
            <div class="index-md-title">
              <img src="../../../../assets/images/duban.png" />
              My superintendent【{{ dataSource3.length }}】
            </div>
          </template>

          <a-table
            :class="'my-index-table tytable3'"
            ref="table1"
            size="small"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource3"
            :pagination="false"
          >
            <template #ellipsisText="{ text }">
              <JEllipsis :value="text" :length="textMaxLength"></JEllipsis>
            </template>

            <template #dayWarnning="{ text, record }">
              <BellTwoTone style="font-size: 22px" :twoToneColor="getTipColor(record)" />
            </template>

            <template #action="{ text, record }">
              <a @click="handleData">TRANSACT</a>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import noDataPng from '/@/assets/images/nodata.png';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JEllipsis from '/@/components/Form/src/jeecg/components/JEllipsis.vue';
  import { BulbTwoTone, BellTwoTone } from '@ant-design/icons-vue';

  const tempSs1 = [
    {
      id: '001',
      orderNo: '电[1]1267102',
      orderTitle: 'Something went wrong with the medicine',
      restDay: 1,
    },
    {
      id: '002',
      orderNo: '电[4]5967102',
      orderTitle: 'After taking the medicine from xxx hospital, my condition is getting worse and worse',
      restDay: 0,
    },
    {
      id: '003',
      orderNo: '电[3]5988987',
      orderTitle: 'I went to the supermarket today to buy eggs, and the eggs are all bad',
      restDay: 7,
    },
    {
      id: '004',
      orderNo: '电[2]5213491',
      orderTitle: 'XX treasure physical store sells XX at a high price',
      restDay: 5,
    },
    {
      id: '005',
      orderNo: '电[1]1603491',
      orderTitle: 'Offering dividends and promising to deduct one-year fees after surrendering the policy',
      restDay: 0,
    },
  ];

  const tempSs2 = [
    {
      id: '001',
      orderTitle: 'I\'m going to complain about this big supermarket',
      orderNo: '电[1]10299456',
      restDay: 6,
    },
    {
      id: '002',
      orderTitle: 'xxx hospital prescribes drugs indiscriminately and sells counterfeit medicines',
      orderNo: '电[2]20235691',
      restDay: 0,
    },
    {
      id: '003',
      orderTitle: 'I\'d like to ask what this shop is all about',
      orderNo: '电[3]495867322',
      restDay: 7,
    },
    {
      id: '004',
      orderTitle: 'I would like to report Aosen Park Hotel in Chaoyang District',
      orderNo: '电[2]1193849',
      restDay: 3,
    },
    {
      id: '005',
      orderTitle: 'I ate a stone at dinner today',
      orderNo: '电[4]56782344',
      restDay: 9,
    },
  ];

  //4-7天
  const tip_green = 'rgba(0, 255, 0, 1)';
  //1-3天
  const tip_yellow = 'rgba(255, 255, 0, 1)';
  //超期
  const tip_red = 'rgba(255, 0, 0, 1)';

  const textMaxLength = 8;
  const $message = useMessage();

  const dataSource1 = ref([]);
  const dataSource2 = ref([]);
  const dataSource3 = ref([]);
  const dataSource4 = ref([]);
  const columns = [
    {
      title: '',
      dataIndex: '',
      key: 'rowIndex',
      width: 50,
      fixed: 'left',
      align: 'center',
      slots: { customRender: 'dayWarnning' },
    },
    {
      title: 'Number of days remaining',
      align: 'center',
      dataIndex: 'restDay',
      width: 80,
    },
    {
      title: 'Ticket title',
      align: 'center',
      dataIndex: 'orderTitle',
      slots: { customRender: 'ellipsisText' },
    },
    {
      title: 'The ticket number',
      align: 'center',
      dataIndex: 'orderNo',
    },
    {
      title: 'OPERATION',
      dataIndex: 'action',
      align: 'center',
      slots: { customRender: 'action' },
    },
  ];

  function getTipColor(rd) {
    let num = rd.restDay;
    if (num <= 0) {
      return tip_red;
    } else if (num >= 1 && num < 4) {
      return tip_yellow;
    } else if (num >= 4) {
      return tip_green;
    }
  }

  function mock() {
    dataSource1.value = tempSs1;
    dataSource2.value = tempSs2;
    dataSource3.value = tempSs1;
    dataSource4.value = tempSs2;
    ifNullDataSource(dataSource4, '.tytable4');
  }

  function ifNullDataSource(ds, tb) {
    if (!ds || ds.length == 0) {
      var tmp = document.createElement('img');
      tmp.src = noDataPng;
      tmp.width = 300;
      let tbclass = `${tb} .ant-table-placeholder`;
      document.querySelector(tbclass).innerHTML = '';
      document.querySelector(tbclass).appendChild(tmp);
    }
  }

  function handleData() {
    $message.createMessage.success('The process is complete');
  }

  function goPage() {
    $message.createMessage.success('Please redirect to the page according to your specific business');
  }

  mock();
</script>

<style scoped lang="less">
  .my-index-table {
    height: 270px;

    table {
      font-size: 14px !important;
    }
  }

  .index-container-ty {
    margin: 12px 12px 0;

    :deep(.ant-card-body) {
      padding: 10px 12px 0 12px;
    }

    :deep(.ant-card-head) {
      line-height: 24px;
      min-height: 24px;
      background: #7196fb !important;

      .ant-card-head-title {
        padding-top: 6px;
        padding-bottom: 6px;
      }

      .ant-card-extra {
        padding: 0;

        a {
          color: #fff;
        }

        a:hover {
          color: #152ede;
        }
      }
    }

    :deep(.ant-table-footer) {
      text-align: right;
      padding: 6px 12px 6px 6px;
      background: #fff;
      border-top: 2px solid #f7f1f1;
    }

    .index-md-title {
      position: relative;
      width: 100%;
      color: #fff;
      font-size: 21px;
      font-family: cursive;
      padding-left: 25px;

      img {
        position: absolute;
        height: 25px;
        left: 0;
      }
    }

    :deep(.ant-table-thead > tr > th),
    :deep(.ant-table-tbody > tr > td) {
      border-bottom: 1px solid #90aeff;
    }

    :deep(
      .ant-table-small
      > .ant-table-content
      > .ant-table-fixed-left
      > .ant-table-body-outer
      > .ant-table-body-inner
      > table
      > .ant-table-thead
      > tr
      > th),
    :deep(
      .ant-table-small
      > .ant-table-content
      > .ant-table-fixed-right
      > .ant-table-body-outer
      > .ant-table-body-inner
      > table
      > .ant-table-thead
      > tr
      > th) {
      border-bottom: 1px solid #90aeff;
    }

    :deep(.ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-thead > tr > th) {
      border-bottom: 1px solid #90aeff;
    }

    :deep(.ant-table-small) {
      border: 1px solid #90aeff;
    }

    :deep(.ant-table-placeholder) {
      padding: 0;
      height: 215px;
    }
  }
</style>
