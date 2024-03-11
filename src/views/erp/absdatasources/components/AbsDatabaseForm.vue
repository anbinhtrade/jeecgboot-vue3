<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="SQL Statement" v-bind="validateInfos.sqlStatement">
            <a-input v-model:value="formData.sqlStatement" placeholder="Please enter SQL Statement" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="SQL Excution Result" v-bind="validateInfos.sqlResult">
            <a-input v-model:value="formData.sqlResult" placeholder="Please enter SQL Excution Result" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Sql status" v-bind="validateInfos.sqlStatus">
            <a-input v-model:value="formData.sqlStatus" placeholder="Please enter Sql status" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Sql datasource" v-bind="validateInfos.sqlDatasource">
            <a-input v-model:value="formData.sqlDatasource" placeholder="Please enter Sql datasource" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Excution time" v-bind="validateInfos.excutionTime">
	          <a-input-number v-model:value="formData.excutionTime" placeholder="Please enter Excution time" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../AbsDatabase.api';
  import { Form } from 'ant-design-vue';
  
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    sqlStatement: '',   
    sqlResult: '',   
    sqlStatus: '',   
    sqlDatasource: '',   
    excutionTime: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //Form validation
  const validatorRules = {
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  // Form disabled
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
        return true;
      }
    }
    return props.formDisabled;
  });

  
  /**
   * New
   */
  function add() {
    edit({});
  }

  /**
   * Edit
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //Assignment
      Object.assign(formData, record);
    });
  }

  /**
   * Submit data
   */
  async function submitForm() {
    // Trigger form validation
    await validate();
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //Time formatting
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
    //Loop data
    for (let data in model) {
      //If the data is an array and is of type string
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //If it is a string type, it needs to be converted into a comma-separated string.
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    min-height: 500px !important;
    overflow-y: auto;
    padding: 24px 24px 24px 24px;
  }
</style>
