<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Hẹn giờ" v-bind="validateInfos.msgPlan">
            <a-date-picker placeholder="Please select Hẹn giờ" v-model:value="formData.msgPlan"
                           showTime value-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"
                           :disabled="disabled"/>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="Người nhận" v-bind="validateInfos.msgUserIds">
            <!-- a-input v-model:value="formData.msgUserIds" placeholder="Please enter Người nhận" :disabled="disabled"></a-input -->
            <AbwUserSelectSearch v-model:value="formData.msgUserIds" placeholder="Please enter Người nhận" :disabled="disabled"></AbwUserSelectSearch>
        </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Loại thông báo" v-bind="validateInfos.msgCategory">
            <a-select v-model:value="formData.msgCategory" placeholder="Please enter Loại thông báo"
                      :disabled="disabled">
              <a-select-option v-for="category in categoryListData" :key="category.msgCatCode"
                               :value="category.msgCatCode">
                {{ category.msgCatText }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tiêu đề" v-bind="validateInfos.msgTitle">
            <a-input v-model:value="formData.msgTitle" placeholder="Please enter Tiêu đề"
                     :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Nội dung rút gọn" v-bind="validateInfos.msgContent">
            <a-input v-model:value="formData.msgContent" placeholder="Please enter Nội dung rút gọn"
                     :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Nội dung" v-bind="validateInfos.msgBody">
            <j-editor :row="10" v-model:value="formData.msgBody" placeholder="Please enter Nội dung"
                      :disabled="disabled"></j-editor>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="Thumbnail" v-bind="validateInfos.msgThumbnailImage">
            <a-input v-model:value="formData.msgThumbnailImage" placeholder="Please enter Thumbnail"
                     :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Banner" v-bind="validateInfos.msgBannerImage">
            <a-input v-model:value="formData.msgBannerImage" placeholder="Please enter Banner"
                     :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
import {ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted} from 'vue';
import {useMessage} from '/@/hooks/web/useMessage';
import {getValueType} from '/@/utils';
import {saveOrUpdate, searchUser} from '../AbwNotification.api';
import {Form} from 'ant-design-vue';
import JEditor from "@/components/Form/src/jeecg/components/JEditor.vue";
import {list as categoryList} from "@/views/erp/msg/category/AbwMsgCategory.api";
import {debounce} from "lodash-es";
import AbwUserSelectSearch from "@/views/erp/notification/components/AbwUserSelectSearch.vue";

const props = defineProps({
  formDisabled: {type: Boolean, default: false},
  formData: {
    type: Object, default: () => {
    }
  },
  formBpm: {type: Boolean, default: true}
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const formData = reactive<Record<string, any>>({
  id: '',
  msgUserIds: '',
  msgCategory: '',
  msgTitle: '',
  msgContent: '',
  msgBody: '',
  msgThumbnailImage: '',
  msgBannerImage: '',
  msgPlan: '',
});
const {createMessage} = useMessage();
const labelCol = ref<any>({xs: {span: 24}, sm: {span: 5}});
const wrapperCol = ref<any>({xs: {span: 24}, sm: {span: 16}});
const confirmLoading = ref<boolean>(false);
//Form validation
const validatorRules = {};
const {resetFields, validate, validateInfos} = useForm(formData, validatorRules, {immediate: true});

// Form disabled
const disabled = computed(() => {
  if (props.formBpm === true) {
    if (props.formData.disabled === false) {
      return false;
    } else {
      return true;
    }
  }
  return props.formDisabled;
});
// load category data via api categoryList
const categoryListData = ref();
const categoryListLoading = ref(false);
const categoryListParams = reactive({
  current: 1,
  pageSize: 1000,
  sort: 'id',
  order: 'desc',
});


const filteredUsers = ref([]);
const debouncedSearchUser = debounce(handleSearchUser, 500);

async function handleSearchUser(searchTerm: string) {
  try {
    // Show loading indicator
    categoryListLoading.value = true;

    const userList = await searchUser({ 'searchTerm': searchTerm });
    console.log('userList:', userList);
    filteredUsers.value = userList || [];
    // Hide loading indicator
    categoryListLoading.value = false;
  } catch (error) {
    console.error('Error fetching user list:', error);

    // Hide loading indicator in case of an error
    categoryListLoading.value = false;
  }
}



onMounted(async () => {
  try {
    // Fetch category list data
    categoryListLoading.value = true;
    const response = await categoryList(categoryListParams);
    categoryListLoading.value = false;
    categoryListData.value = response.records || [];
  } catch (error) {
    console.error('Error fetching category list:', error);
  }
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
  submitForm
});
</script>

<style lang="less" scoped>
.antd-modal-form {
  min-height: 500px !important;
  overflow-y: auto;
  padding: 24px 24px 24px 24px;
}
</style>
