<template>
  <IndexDef v-if="indexStyle === 0"></IndexDef>
  <IndexChart v-if="indexStyle === 1"></IndexChart>
  <IndexBdc v-if="indexStyle == 2"></IndexBdc>
  <IndexTask v-if="indexStyle == 3"></IndexTask>
  <div style="width: 100%; text-align: right; margin-top: 20px">
    Please select a homepage style:
    <a-radio-group v-model:value="indexStyle">
      <a-radio :value="0">DEFAULT</a-radio>
      <a-radio :value="1">Sales statistics</a-radio>
      <a-radio :value="2">Business statistics</a-radio>
      <a-radio :value="3">My task</a-radio>
    </a-radio-group>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import IndexDef from './homePage/IndexDef.vue';
  import IndexChart from './homePage/IndexChart.vue';
  import IndexBdc from './homePage/IndexBdc.vue';
  import IndexTask from './homePage/IndexTask.vue';

  const indexStyle = ref(0);
</script>
