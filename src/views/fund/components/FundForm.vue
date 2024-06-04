<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Mã CCQ" v-bind="validateInfos.fundCode">
            <a-input v-model:value="formData.fundCode" placeholder="Please enter Mã CCQ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tên Quỹ" v-bind="validateInfos.fundName">
            <a-input v-model:value="formData.fundName" placeholder="Please enter Tên Quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Loại hình quỹ" v-bind="validateInfos.fundType">
            <a-input v-model:value="formData.fundType" placeholder="Please enter Loại hình quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Chỉ số tham chiếu" v-bind="validateInfos.indexRef">
            <a-input v-model:value="formData.indexRef" placeholder="Please enter Chỉ số tham chiếu" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Ngân hàng giám sát" v-bind="validateInfos.observedBank">
            <a-input v-model:value="formData.observedBank" placeholder="Please enter Ngân hàng giám sát" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Đại lý chuyển nhượng" v-bind="validateInfos.transferAgent">
            <a-input v-model:value="formData.transferAgent" placeholder="Please enter Đại lý chuyển nhượng" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Lô chứng chỉ quỹ" v-bind="validateInfos.batchEtf">
            <a-input v-model:value="formData.batchEtf" placeholder="Please enter Lô chứng chỉ quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="NAV/CCQ" v-bind="validateInfos.navPerEtf">
	          <a-input-number v-model:value="formData.navPerEtf" placeholder="Please enter NAV/CCQ" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tổng tài sản quỹ" v-bind="validateInfos.navTotal">
	          <a-input-number v-model:value="formData.navTotal" placeholder="Please enter Tổng tài sản quỹ" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Số nhà đầu tư" v-bind="validateInfos.totalInvestor">
	          <a-input-number v-model:value="formData.totalInvestor" placeholder="Please enter Số nhà đầu tư" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Số nhà đầu tư nước ngoài" v-bind="validateInfos.totalForeignInvestor">
	          <a-input-number v-model:value="formData.totalForeignInvestor" placeholder="Please enter Số nhà đầu tư nước ngoài" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Giá trị đầu tư tối thiểu" v-bind="validateInfos.minInvestmentValue">
	          <a-input-number v-model:value="formData.minInvestmentValue" placeholder="Please enter Giá trị đầu tư tối thiểu" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Khối lượng bán tối thiểu" v-bind="validateInfos.minSellingVol">
	          <a-input-number v-model:value="formData.minSellingVol" placeholder="Please enter Khối lượng bán tối thiểu" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tỉ lệ tăng trưởng từ đầu năm VNDiamond" v-bind="validateInfos.growingRateYtd">
	          <a-input-number v-model:value="formData.growingRateYtd" placeholder="Please enter Tỉ lệ tăng trưởng từ đầu năm VNDiamond" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond" v-bind="validateInfos.growingRate3y">
	          <a-input-number v-model:value="formData.growingRate3y" placeholder="Please enter Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond" style="width: 100%" :disabled="disabled"/>
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
  import { saveOrUpdate } from '../Fund.api';
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
    fundCode: '',   
    fundName: '',   
    fundType: '',   
    indexRef: '',   
    observedBank: '',   
    transferAgent: '',   
    batchEtf: '',   
    navPerEtf: undefined,
    navTotal: undefined,
    totalInvestor: undefined,
    totalForeignInvestor: undefined,
    minInvestmentValue: undefined,
    minSellingVol: undefined,
    growingRateYtd: undefined,
    growingRate3y: undefined,
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //Form validation
  const validatorRules = {
    fundCode: [{ required: true, message: 'Please enter Mã CCQ!'},],
    fundName: [{ required: true, message: 'Please enter Tên Quỹ!'},],
    fundType: [{ required: true, message: 'Please enter Loại hình quỹ!'},],
    indexRef: [{ required: true, message: 'Please enter Chỉ số tham chiếu!'},],
    observedBank: [{ required: true, message: 'Please enter Ngân hàng giám sát!'},],
    transferAgent: [{ required: true, message: 'Please enter Đại lý chuyển nhượng!'},],
    batchEtf: [{ required: true, message: 'Please enter Lô chứng chỉ quỹ!'},],
    navPerEtf: [{ required: true, message: 'Please enter NAV/CCQ!'},],
    navTotal: [{ required: true, message: 'Please enter Tổng tài sản quỹ!'},],
    totalInvestor: [{ required: true, message: 'Please enter Số nhà đầu tư!'},],
    totalForeignInvestor: [{ required: true, message: 'Please enter Số nhà đầu tư nước ngoài!'},],
    minInvestmentValue: [{ required: true, message: 'Please enter Giá trị đầu tư tối thiểu!'},],
    minSellingVol: [{ required: true, message: 'Please enter Khối lượng bán tối thiểu!'},],
    growingRateYtd: [{ required: true, message: 'Please enter Tỉ lệ tăng trưởng từ đầu năm VNDiamond!'},],
    growingRate3y: [{ required: true, message: 'Please enter Tỉ lệ tăng trưởng 3 năm của chỉ số VNDiamond!'},],
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
