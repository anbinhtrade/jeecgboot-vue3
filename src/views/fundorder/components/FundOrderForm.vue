<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Số hiệu lệnh" v-bind="validateInfos.orderCode">
            <a-input v-model:value="formData.orderCode" placeholder="Please enter Số hiệu lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Lệnh" v-bind="validateInfos.orderType">
            <a-input v-model:value="formData.orderType" placeholder="Please enter Lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Chứng chỉ quỹ" v-bind="validateInfos.fundCode">
            <a-input v-model:value="formData.fundCode" placeholder="Please enter Chứng chỉ quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tài khoản lưu ký" v-bind="validateInfos.custodyAccount">
            <a-input v-model:value="formData.custodyAccount" placeholder="Please enter Tài khoản lưu ký" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Họ và Tên" v-bind="validateInfos.fullName">
            <a-input v-model:value="formData.fullName" placeholder="Please enter Họ và Tên" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Gía trị đầu tư" v-bind="validateInfos.investmentValue">
            <a-input v-model:value="formData.investmentValue" placeholder="Please enter Gía trị đầu tư" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Người đặt lệnh" v-bind="validateInfos.orderBy">
            <a-input v-model:value="formData.orderBy" placeholder="Please enter Người đặt lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Ngày giao dịch" v-bind="validateInfos.tradingDate">
		        <a-date-picker placeholder="Please select Ngày giao dịch"  v-model:value="formData.tradingDate" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Trạng thái lệnh" v-bind="validateInfos.orderStatus">
            <a-input v-model:value="formData.orderStatus" placeholder="Please enter Trạng thái lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Giá trị lệnh" v-bind="validateInfos.orderValue">
            <a-input v-model:value="formData.orderValue" placeholder="Please enter Giá trị lệnh" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Khối lượng giao dịch" v-bind="validateInfos.tradingVolume">
            <a-input v-model:value="formData.tradingVolume" placeholder="Please enter Khối lượng giao dịch" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Giá trị giao dịch/CCQ" v-bind="validateInfos.tradingValuePerEtf">
            <a-input v-model:value="formData.tradingValuePerEtf" placeholder="Please enter Giá trị giao dịch/CCQ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="% Phí giao dịch" v-bind="validateInfos.tradingFeePct">
	          <a-input-number v-model:value="formData.tradingFeePct" placeholder="Please enter % Phí giao dịch" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Phí giao dịch (VND)" v-bind="validateInfos.tradingFee">
	          <a-input-number v-model:value="formData.tradingFee" placeholder="Please enter Phí giao dịch (VND)" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Số tiền còn lại" v-bind="validateInfos.remainingAmount">
	          <a-input-number v-model:value="formData.remainingAmount" placeholder="Please enter Số tiền còn lại" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Mã người chăm sóc" v-bind="validateInfos.advisorCode">
            <a-input v-model:value="formData.advisorCode" placeholder="Please enter Mã người chăm sóc" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Người chăm sóc" v-bind="validateInfos.advisorName">
            <a-input v-model:value="formData.advisorName" placeholder="Please enter Người chăm sóc" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Chi nhánh chăm sóc" v-bind="validateInfos.advisorAgent">
            <a-input v-model:value="formData.advisorAgent" placeholder="Please enter Chi nhánh chăm sóc" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Mã người giới thiệu" v-bind="validateInfos.referrerCode">
            <a-input v-model:value="formData.referrerCode" placeholder="Please enter Mã người giới thiệu" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Người giới thiệu" v-bind="validateInfos.referrerName">
            <a-input v-model:value="formData.referrerName" placeholder="Please enter Người giới thiệu" :disabled="disabled"></a-input>
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
  import { saveOrUpdate } from '../FundOrder.api';
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
    orderCode: '',   
    orderType: '',   
    fundCode: '',   
    custodyAccount: '',   
    fullName: '',   
    investmentValue: '',   
    orderBy: '',   
    tradingDate: '',   
    orderStatus: '',   
    orderValue: '',   
    tradingVolume: '',   
    tradingValuePerEtf: '',   
    tradingFeePct: undefined,
    tradingFee: undefined,
    remainingAmount: undefined,
    advisorCode: '',   
    advisorName: '',   
    advisorAgent: '',   
    referrerCode: '',   
    referrerName: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //Form validation
  const validatorRules = {
    orderCode: [{ required: true, message: 'Please enter Số hiệu lệnh!'},],
    fundCode: [{ required: true, message: 'Please enter Chứng chỉ quỹ!'},],
    custodyAccount: [{ required: true, message: 'Please enter Tài khoản lưu ký!'},],
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
