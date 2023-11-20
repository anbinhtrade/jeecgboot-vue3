<template>
  <PageWrapper title="With parameter menu (routing)" content="Multi-level parameters are supported">
    当前参数：{{ params }}
    <br />
    输入参数切换路由：
    <Input v-model:value="value" placeholder="It is recommended to use the URL standard character, enter it and click Switch" />
    <a-button type="primary" @click="handleClickGo">切换路由</a-button>
    <br />
    After switching routes
    <ul>
      <li>You can refresh the page to test whether the routing parameters are normal.</li>
      <li>You can expand the submenu in the left menu and click whether the test parameters are carried properly.</li>
    </ul>
  </PageWrapper>
</template>
<script lang="ts">
  import { Input } from 'ant-design-vue';
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'TestMenu',
    components: { PageWrapper, Input },
    setup() {
      const { currentRoute, replace } = useRouter();
      const value = ref<string>('');

      const handleClickGo = () => {
        const { name } = unref(currentRoute);
        replace({ name: name!, params: { id: unref(value) } });
      };
      return {
        value,
        handleClickGo,
        params: computed(() => {
          return unref(currentRoute).params;
        }),
      };
    },
  });
</script>
