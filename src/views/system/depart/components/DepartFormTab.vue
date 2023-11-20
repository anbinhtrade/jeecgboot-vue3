<template>
  <a-spin :spinning="loading">
    <BasicForm @register="registerForm" />
    <div class="j-box-bottom-button offset-20" style="margin-top: 30px">
      <div class="j-box-bottom-button-float" :class="[`${prefixCls}`]">
        <a-button preIcon="ant-design:sync-outlined" @click="onReset">RESET</a-button>
        <a-button type="primary" preIcon="ant-design:save-filled" @click="onSubmit">SAVE</a-button>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { watch, computed, inject, ref, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { saveOrUpdateDepart } from '../depart.api';
  import { useBasicFormSchema, orgCategoryOptions } from '../depart.data';
  import { useDesign } from '/@/hooks/web/useDesign';

  const { prefixCls } = useDesign('j-depart-form-content');

  const emit = defineEmits(['success']);
  const props = defineProps({
    data: { type: Object, default: () => ({}) },
    rootTreeData: { type: Array, default: () => [] },
  });
  const loading = ref<boolean>(false);
  // Whether it is currently in update mode
  const isUpdate = ref<boolean>(true);
  // The current pop-up data
  const model = ref<object>({});

  //Sign-up forms
  const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
    schemas: useBasicFormSchema().basicFormSchema,
    showActionButtonGroup: false,
  });

  const categoryOptions = computed(() => {
    if (!!props?.data?.parentId) {
      return orgCategoryOptions.child;
    } else {
      return orgCategoryOptions.root;
    }
  });

  onMounted(() => {
    // Disable the field
    updateSchema([
      { field: 'parentId', componentProps: { disabled: true } },
      { field: 'orgCode', componentProps: { disabled: true } },
    ]);
    // data Change, refill the form
    watch(
      () => props.data,
      async () => {
        let record = unref(props.data);
        if (typeof record !== 'object') {
          record = {};
        }
        model.value = record;
        await resetFields();
        await setFieldsValue({ ...record });
      },
      { deep: true, immediate: true }
    );
    // Update the Parent Department option
    watch(
      () => props.rootTreeData,
      async () => {
        updateSchema([
          {
            field: 'parentId',
            componentProps: { treeData: props.rootTreeData },
          },
        ]);
      },
      { deep: true, immediate: true }
    );
    // Listen and change orgCategory options
    watch(
      categoryOptions,
      async () => {
        updateSchema([
          {
            field: 'orgCategory',
            componentProps: { options: categoryOptions.value },
          },
        ]);
      },
      { immediate: true }
    );
  });

  // Reset the form
  async function onReset() {
    await resetFields();
    await setFieldsValue({ ...model.value });
  }

  // Submit an event
  async function onSubmit() {
    try {
      loading.value = true;
      let values = await validate();
      values = Object.assign({}, model.value, values);
      //Submit the form
      await saveOrUpdateDepart(values, isUpdate.value);
      //Refresh the list
      emit('success');
      Object.assign(model.value, values);
    } finally {
      loading.value = false;
    }
  }
</script>
<style lang="less">
  // update-begin-author:liusq date:20230625 for: [issues/563]暗色主题部分失效

  @prefix-cls: ~'@{namespace}-j-depart-form-content';
  /*begin Compatible with dark night mode*/
  .@{prefix-cls} {
    background: @component-background;
    border-top: 1px solid @border-color-base;
  }
  /*end Compatible with dark night mode*/
  // update-end-author:liusq date:20230625 for: [issues/563]暗色主题部分失效
</style>
