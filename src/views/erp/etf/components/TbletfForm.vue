<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="12">
          <a-form-item label="Mã CCQ" v-bind="validateInfos.etfCode">
            <a-input v-model:value="formData.etfCode" placeholder="Please enter Mã CCQ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Tên Quỹ" v-bind="validateInfos.etfName">
            <a-input v-model:value="formData.etfName" placeholder="Please enter Tên Quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Loại hình quỹ" v-bind="validateInfos.etfType">
            <a-input v-model:value="formData.etfType" placeholder="Please enter Loại hình quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Chỉ số tham chiếu" v-bind="validateInfos.indexRef">
            <a-input v-model:value="formData.indexRef" placeholder="Please enter Chỉ số tham chiếu" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Công ty quản lý" v-bind="validateInfos.orgManage">
            <a-input v-model:value="formData.orgManage" placeholder="Please enter Công ty quản lý" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Ngân hàng giám sát" v-bind="validateInfos.bankObserve">
            <a-input v-model:value="formData.bankObserve" placeholder="Please enter Ngân hàng giám sát" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Đại lý chuyển nhượng" v-bind="validateInfos.transAgent">
            <a-input v-model:value="formData.transAgent" placeholder="Please enter Đại lý chuyển nhượng" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Lô chứng chỉ quỹ" v-bind="validateInfos.etfBatch">
            <a-input v-model:value="formData.etfBatch" placeholder="Please enter Lô chứng chỉ quỹ" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="NAV/CCQ" v-bind="validateInfos.etfNav">
	          <a-input-number v-model:value="formData.etfNav" placeholder="Please enter NAV/CCQ" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Tổng tài sản" v-bind="validateInfos.totalAsset">
	          <a-input-number v-model:value="formData.totalAsset" placeholder="Please enter Tổng tài sản" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Số nhà đầu tư" v-bind="validateInfos.numInvestors">
	          <a-input-number v-model:value="formData.numInvestors" placeholder="Please enter Số nhà đầu tư" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Số nhà đầu tư nước ngoài" v-bind="validateInfos.numForeginInvestors">
	          <a-input-number v-model:value="formData.numForeginInvestors" placeholder="Please enter Số nhà đầu tư nước ngoài" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Giá trị đầu tư tối thiểu" v-bind="validateInfos.minimumInvestAmount">
	          <a-input-number v-model:value="formData.minimumInvestAmount" placeholder="Please enter Giá trị đầu tư tối thiểu" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Khối lượng bán tối thiểu" v-bind="validateInfos.minimumSellNum">
	          <a-input-number v-model:value="formData.minimumSellNum" placeholder="Please enter Khối lượng bán tối thiểu" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Tỷ lệ tăng trưởng từ đầu năm của chỉ số VN Diamond" v-bind="validateInfos.indexGrowRateYtd">
	          <a-input-number v-model:value="formData.indexGrowRateYtd" placeholder="Please enter Tỷ lệ tăng trưởng từ đầu năm của chỉ số VN Diamond" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Tạo bởi" v-bind="validateInfos.createBy">
            <a-input v-model:value="formData.createBy" placeholder="Please enter Tạo bởi" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Cập nhật bởi" v-bind="validateInfos.updateBy">
            <a-input v-model:value="formData.updateBy" placeholder="Please enter Cập nhật bởi" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Thời gian cập nhật" v-bind="validateInfos.updateTime">
		        <a-date-picker placeholder="Please select Thời gian cập nhật"  v-model:value="formData.updateTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Thời gian tạo" v-bind="validateInfos.createTime">
		        <a-date-picker placeholder="Please select Thời gian tạo"  v-model:value="formData.createTime" showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" :disabled="disabled"/>
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
  import { saveOrUpdate } from '../Tbletf.api';
  import { Form } from 'ant-design-vue';
  import { duplicateValidate } from '/@/utils/helper/validator'
  
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
    etfCode: '',   
    etfName: '',   
    etfType: '',   
    indexRef: '',   
    orgManage: '',   
    bankObserve: '',   
    transAgent: '',   
    etfBatch: '',   
    etfNav: undefined,
    totalAsset: undefined,
    numInvestors: undefined,
    numForeginInvestors: undefined,
    minimumInvestAmount: undefined,
    minimumSellNum: undefined,
    indexGrowRateYtd: undefined,
    createBy: '',   
    updateBy: '',   
    updateTime: '',   
    createTime: '',   
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //Form validation
  const validatorRules = {
    etfCode: [{ required: true, message: 'Please enter Mã CCQ!'}, { validator: etfCodeDuplicatevalidate }],
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


  async function etfCodeDuplicatevalidate(_r, value) {
    return duplicateValidate('tbletf', 'etf_code', value, formData.id || '')
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
