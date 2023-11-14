<template>
  <a-dropdown v-if="syncToApp && syncToLocal">
    <a-button type="primary" preIcon="ant-design:sync-outlined">Synchronize{{ name }}</a-button>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-menu-item v-if="syncToApp" key="to-app">Sync to {{ name }}</a-menu-item>
        <a-menu-item v-if="getSyncToLocal" key="to-local">Sync to local</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <a-button v-else-if="syncToApp" type="primary" preIcon="ant-design:sync-outlined" @click="handleMenuClick({ key: 'to-app' })"
    >Synchronize{{ name }}</a-button
  >
  <a-button v-else type="primary" preIcon="ant-design:sync-outlined" @click="handleMenuClick({ key: 'to-local' })">Synchronize{{ name }} to local</a-button>
</template>

<script lang="ts" setup>
  /* JThirdAppButton A subcomponent of and cannot be used alone */
  import { computed } from 'vue';

  const props = defineProps({
    type: String,
    name: String,
    syncToApp: Boolean,
    syncToLocal: Boolean,
  });
  // Declare Emits
  const emit = defineEmits(['to-app', 'to-local']);

  const getSyncToLocal = computed(() => {
    // Due to the change of the enterprise WeChat interface, synchronization to local will no longer be supported.
    if (props.type === 'wechatEnterprise') {
      return false;
    }
    return props.syncToLocal;
  });

  function handleMenuClick(event) {
    emit(event.key, { type: props.type });
  }
</script>

<style scoped></style>
