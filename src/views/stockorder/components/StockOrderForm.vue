<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Số tài khoản" v-bind="validateInfos.custodyCd">
            <a-input v-model:value="formData.custodyCd" placeholder="Hãy nhập số tài khoản" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tiểu khoản" v-bind="validateInfos.accountNo">
            <a-input v-model:value="formData.accountNo" placeholder="Hãy nhập tiểu khoản" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Mã chứng khoán" v-bind="validateInfos.symbol">
            <a-input v-model:value="formData.symbol" placeholder="Hãy nhập mã chứng khoán" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Loại lệnh" v-bind="validateInfos.orderType">
            <a-input v-model:value="formData.orderType" placeholder="Hãy nhập loại lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Khối lượng" v-bind="validateInfos.volume">
	          <a-input-number v-model:value="formData.volume" placeholder="Hãy nhập khối lượng" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Loại giá" v-bind="validateInfos.priceType">
            <a-input v-model:value="formData.priceType" placeholder="Hãy nhập loại giá" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Gía" v-bind="validateInfos.price">
	          <a-input-number v-model:value="formData.price" placeholder="Hãy nhập gía" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Ngày gửi" v-bind="validateInfos.sentAt">
		        <a-date-picker placeholder="Hãy chọn ngày gửi"  v-model:value="formData.sentAt" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Ngày duyệt" v-bind="validateInfos.approvedAt">
		        <a-date-picker placeholder="Hãy chọn ngày duyệt"  v-model:value="formData.approvedAt" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Người duyệt" v-bind="validateInfos.approvedBy">
            <a-input v-model:value="formData.approvedBy" placeholder="Hãy nhập người duyệt" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Trạng thái" v-bind="validateInfos.status">
            <a-input v-model:value="formData.status" placeholder="Hãy nhập trạng thái" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../StockOrder.api';
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
    custodyCd: '',   
    accountNo: '',   
    symbol: '',   
    orderType: '',   
    volume: undefined,
    priceType: '',   
    price: undefined,
    sentAt: '',   
    approvedAt: '',   
    approvedBy: '',   
    status: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //Form validation
  const validatorRules = {
    custodyCd: [{ required: true, message: 'Hãy nhập Số tài khoản!'},],
    accountNo: [{ required: true, message: 'Hãy nhập Tiểu khoản!'},],
    symbol: [{ required: true, message: 'Hãy nhập Mã chứng khoán!'},],
    orderType: [{ required: true, message: 'Hãy nhập Loại lệnh!'},],
    volume: [{ required: true, message: 'Hãy nhập Khối lượng!'},],
    priceType: [{ required: true, message: 'Hãy nhập Loại giá!'},],
    price: [{ required: true, message: 'Hãy nhập Gía!'},],
    sentAt: [{ required: true, message: 'Hãy nhập Ngày gửi!'},],
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
