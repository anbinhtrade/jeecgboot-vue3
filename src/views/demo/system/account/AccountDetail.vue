<template>
  <PageWrapper
    :title="`User ` + userId + ` Information`"
    content="This is the user profile details page. This page is only used to demonstrate how the same route can open multiple pages in a tab and display different data"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> Disable the account </a-button>
      <a-button type="primary"> Change your password </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="User Profile" />
        <a-tab-pane key="logs" tab="Operation logs" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey === 'detail'">
        <div v-for="i in 10" :key="i">This is the user {{ userId }} Data Tab</div>
      </template>
      <template v-if="currentKey === 'logs'">
        <div v-for="i in 10" :key="i">This is the user {{ userId }} Operation log tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  export default defineComponent({
    name: 'AccountDetail',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      // The user ID can be obtained here
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      // TODO
      // The code on this page is for demonstration only, and the relevant information of the user should be obtained from the interface through the user ID

      // 设置Tab的标题（不会影响页面标题）
      setTitle('Details: Users' + userId.value);

      // What to do when you click the back link on the left side of the page
      function goBack() {
        // In this example, clicking Back always jumps to the account list page, and you can return to the previous page when you actually apply it
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>

<style></style>
