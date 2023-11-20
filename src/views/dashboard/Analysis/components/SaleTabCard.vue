<template>
  <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
    <div class="salesCard">
      <a-tabs default-active-key="1" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">
        <template #rightExtra>
          <div class="extra-wrapper">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{ width: '256px' }" />
          </div>
        </template>
        <a-tab-pane loading="true" tab="SALES" key="1">
          <a-row>
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <Bar :chartData="barData" :option="{ title: { text: 'Top sales', textStyle: { fontWeight: 'lighter' } } }" height="40vh" />
            </a-col>
            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
              <RankList title="Store sales leaderboard" :list="rankList" />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Sales trends" key="2">
          <a-row>
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <Bar :chartData="barData.reverse()" :option="{ title: { text: 'Top sales', textStyle: { fontWeight: 'lighter' } } }" height="40vh" />
            </a-col>
            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
              <RankList title="Store sales leaderboard" :list="rankList" />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import Bar from '/@/components/chart/Bar.vue';
  import RankList from '/@/components/chart/RankList.vue';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
  const rankList = [];
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: 'Egret Island ' + (i + 1) + ' No. Store',
      total: 1234.56 - i * 100,
    });
  }

  const barData = [];
  for (let i = 0; i < 12; i += 1) {
    barData.push({
      name: `Month ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 200,
    });
  }
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }
</style>
