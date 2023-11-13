<template>
  <PageWrapper title="NUMBER：234231029431" contentBackground>
    <template #extra>
      <a-button> Operation 1 </a-button>
      <a-button> Operation two </a-button>
      <a-button type="primary"> Main operation </a-button>
    </template>

    <template #footer>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="DETAIL" />
        <a-tab-pane key="2" tab="RULES" />
      </a-tabs>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="Created by"> Qu Lili </a-descriptions-item>
        <a-descriptions-item label="Order the product"> XX SERVE </a-descriptions-item>
        <a-descriptions-item label="Creation time"> 2017-01-10 </a-descriptions-item>
        <a-descriptions-item label="Associated documents">
          <a>12421</a>
        </a-descriptions-item>
        <a-descriptions-item label="生效日期"> 2017-07-07 ~ 2017-08-08 </a-descriptions-item>
        <a-descriptions-item label="备注"> 请于两个工作日内确认 </a-descriptions-item>
      </a-descriptions>
      <a-card title="Process progress" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="Create a project">
            <template #description> <div>Jeecg</div> <p>2016-12-12 12:32</p> </template>
          </a-step>
          <a-step title="Preliminary examination of the department">
            <template #description>
              <p>Chad</p>
            </template>
          </a-step>
          <a-step title="Financial review" />
          <a-step title="FINISH" />
        </a-steps>
      </a-card>

      <a-card title="User Information" :bordered="false" class="mt-5">
        <a-descriptions :column="3">
          <a-descriptions-item label="User name"> ATTACHEDSMALL </a-descriptions-item>
          <a-descriptions-item label="Membership card number"> XX 32943898021309809423 </a-descriptions-item>
          <a-descriptions-item label="IDENTITY CARD"> 3321944288191034921 </a-descriptions-item>
          <a-descriptions-item label="CONTACT"> 18100000000 </a-descriptions-item>
          <a-descriptions-item label="Contact address" :span="2"> 曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口 </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="FIELD" :column="3">
          <a-descriptions-item label="so-and-so data"> 111 </a-descriptions-item>
          <a-descriptions-item label="The time when the data was updated"> 2017-08-08 </a-descriptions-item>
          <a-descriptions-item label="so-and-so data"> 725 </a-descriptions-item>
          <a-descriptions-item label="The time when the data was updated"> 2017-08-08 </a-descriptions-item>
        </a-descriptions>

        <h4>信息组</h4>
        <a-card title="Multi-level groups of information">
          <a-descriptions title="The name of the group" :column="3">
            <a-descriptions-item label="HEAD"> Lin Dongdong </a-descriptions-item>
            <a-descriptions-item label="Character code"> 1234567 </a-descriptions-item>
            <a-descriptions-item label="AFFILIATION"> XX公司 - YY部 </a-descriptions-item>
            <a-descriptions-item label="Expiration time"> 2017-08-08 </a-descriptions-item>
            <a-descriptions-item label="DESCRIPTION" :span="2"> This description is long, long </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-descriptions title="The name of the group" :column="1">
            <a-descriptions-item label="SCIENTIFIC">
              Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-descriptions title="The name of the group" :column="1">
            <a-descriptions-item label="HEAD"> ATTACHEDSMALL </a-descriptions-item>
            <a-descriptions-item label="Character code"> 1234568 </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-card>
      <a-card title="The user's call record in the past six months" class="my-5">
        <Empty />
      </a-card>
      <BasicTable @register="registerTimeTable" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Empty, Descriptions, Steps, Tabs } from 'ant-design-vue';

  import { refundTimeTableSchema, refundTimeTableData } from './data';
  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      Empty,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const [registerTimeTable] = useTable({
        title: 'Return Progress',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      return {
        registerTimeTable,
      };
    },
  });
</script>
